import { useMutation } from 'react-query';

import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import {
    CancellationConditionApi,
    CreateCancellationConditionCollectionRequest,
    CreateCancellationConditionRequest,
    PaymentOption,
    UpdateCancellationConditionRequest,
} from '../../../sdk/tour-operations';
import i18n from '../../i18n';

export const getCancellationConditionApi = () => {
    return new CancellationConditionApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useCreateCancellationCondition = () => {
    return useMutation(
        ['createCancellationCondition'],
        async (request: CreateCancellationConditionRequest): Promise<AxiosResponse<string>> => {
            const response = await getCancellationConditionApi().cancellationConditionCreate('root', request);
            return response;
        },
    );
};

export const useCreateCancellationConditionCollection = () => {
    return useMutation(
        ['createCancellationConditionCollection'],
        async (request: CreateCancellationConditionCollectionRequest): Promise<AxiosResponse<number>> => {
            const response = await getCancellationConditionApi().cancellationConditionCreateCollection('root', request);
            return response;
        },
    );
};

export const useUpdateCancellationCondition = () => {
    return useMutation(
        ['updateCancellationCondition'],
        async (request: UpdateCancellationConditionRequest): Promise<AxiosResponse<string>> => {
            const response = await getCancellationConditionApi().cancellationConditionUpdate(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useDeleteCancellationCondition = () => {
    return useMutation(['deleteCancellationCondition'], async (id: string): Promise<string> => {
        const response = await getCancellationConditionApi().cancellationConditionDelete(id, 'root');
        return response.data;
    });
};

export const getPaymentOption = () =>
    Object.values(PaymentOption).map((key: string) => ({
        value: key,
        label: i18n.t(`PaymentOption.${key}`),
    }));
