import { AnyObject } from 'antd/es/_util/type';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { AccountInfo, InteractionRequiredAuthError } from '@azure/msal-browser';
import { STATUS_ERROR } from '@src/types/statusErrors.ts';
import { ThrowErrorAPI } from '@src/types/TypeEnum.ts';

import { toastWarning } from '../components/ui/Toast/Toast.tsx';
import { msalInstance } from '../main.tsx';
import { silentRefreshTokenRequest } from './authConfig.ts';

declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

interface APIException {
    exception: string;
    messages: string;
    title: string;
    errors: AnyObject;
    Errors: AnyObject; // identity
}

const acquireToken = async (instance: AxiosInstance, config: AxiosRequestConfig, account: AccountInfo) => {
    try {
        const response = await msalInstance.acquireTokenSilent({
            scopes: silentRefreshTokenRequest.scopes,
            account: account,
        });
        instance.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
        if (config.headers) {
            config.headers.Authorization = `Bearer ${response.accessToken}`;
            config.headers['Locale'] = 'vi-VN';
            config.headers['Accept-Language'] = 'vi-VN';
        }
    } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
            const response = await msalInstance.acquireTokenSilent({
                scopes: silentRefreshTokenRequest.scopes,
            });
            instance.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;
            if (config.headers) {
                config.headers.Authorization = `Bearer ${response.accessToken}`;
            }
        } else {
            throw error;
        }
    }
};

let lastToastTimestamp = 0;
const toastCooldownPeriod = 2000;

const showToastError = (message: string, description: string) => {
    const currentTime = Date.now();
    if (currentTime - lastToastTimestamp > toastCooldownPeriod && description) {
        toastWarning(message, description);
        lastToastTimestamp = currentTime;
    }
};

const handleCase400 = (apiEx: APIException) => {
    if (apiEx.messages?.length > 0) {
        const firstMessage = apiEx.messages[0];
        if (
            firstMessage.startsWith(STATUS_ERROR.OVERLOAD.toString()) ||
            firstMessage.startsWith(STATUS_ERROR.DISCOUNT_OUT_OF_STOCK.toString()) ||
            firstMessage.startsWith(STATUS_ERROR.EXISTED_QUOTE_CONFIRMED.toString())
        ) {
            return false;
        }
    }
    // identity
    else if (apiEx?.Errors?.length > 0) {
        const firstError = apiEx.Errors[0];
        if (
            firstError?.ErrorCode?.Id === STATUS_ERROR.EXISTED_EMAIL_CREATE_AGENT ||
            firstError?.ErrorCode?.Id === STATUS_ERROR.EXISTED_ACCOUNT_PASSWORD_NOT_CORRECT ||
            firstError?.ErrorCode?.Id === STATUS_ERROR.EXISTED_EMAIL_USED
        ) {
            return false;
        }
    }
    return true;
};

const handleAxiosError = (error: AxiosError) => {
    let message = '';
    let description = '';
    const apiEx: APIException = error.response?.data as APIException;
    const resultHandle400 = handleCase400(apiEx);

    switch (error.response?.status) {
        case 401:
            return Promise.reject(error);
        case 403:
            description = ThrowErrorAPI.UnAuthorized;
            break;
        case 400:
            if (resultHandle400) {
                message = apiEx.exception ?? apiEx.title ?? 'Lỗi';
                description =
                    apiEx.messages ?? apiEx.exception ?? apiEx?.Errors?.[0]?.Description ?? apiEx?.errors['']?.[0];
            } else {
                return Promise.reject(error);
            }
            break;
        case 404:
            description = ThrowErrorAPI.PageNotFound;
            break;
        case 500:
            message = 'Lỗi không xác định';
            description = apiEx.exception ?? apiEx.messages;
            break;
        default:
            break;
    }
    showToastError(message, description);
    return Promise.reject(error);
};

const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({});
    instance.interceptors.request.use(
        async config => {
            const account = msalInstance.getActiveAccount();
            await acquireToken(instance, config, account!);
            return config;
        },
        error => Promise.reject(error),
    );

    instance.interceptors.response.use(
        async response => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig<boolean>;
            const account = msalInstance.getActiveAccount();
            if (error?.response?.status === 401 && !originalRequest?._retry) {
                await acquireToken(instance, originalRequest, account!);
                return instance({
                    ...originalRequest,
                    _retry: true,
                });
            }
            return handleAxiosError(error);
        },
    );

    return instance;
};

export const getAxiosInstance = (): AxiosInstance => createAxiosInstance();
