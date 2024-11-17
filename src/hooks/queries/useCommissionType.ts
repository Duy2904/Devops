import { useMutation } from 'react-query';
import {
    CommissionTypeApi,
    CreateCommissionTypeRequest,
    UpdateCommissionTypeRequest,
} from '../../../sdk/tour-operations';
import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';

export const getCommissionTypeApi = () => {
    return new CommissionTypeApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetCommissionTypeAgent = () => {
    return useMutation(['getCommissionTypeAgent'], async () => {
        const response = await getCommissionTypeApi().commissionTypeGetAgentTypes('root');
        return response.data;
    });
};

export const useGetCommissionTypeReferrer = () => {
    return useMutation(['getCommissionTypeReferrer'], async () => {
        const response = await getCommissionTypeApi().commissionTypeGetReferrerTypes('root');
        return response.data;
    });
};

export const useCreateCommissionType = () => {
    return useMutation(
        ['createCommissionType'],
        async (request: CreateCommissionTypeRequest): Promise<AxiosResponse<string>> => {
            const response = await getCommissionTypeApi().commissionTypeCreate('root', request);
            return response;
        },
    );
};

export const useUpdateCommissionType = () => {
    return useMutation(
        ['updateCommissionType'],
        async (request: UpdateCommissionTypeRequest): Promise<AxiosResponse<string>> => {
            const response = await getCommissionTypeApi().commissionTypeUpdate(request.id ?? '', 'root', request);
            return response;
        },
    );
};
