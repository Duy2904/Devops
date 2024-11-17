import { useMutation } from 'react-query';

import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import {
    CommissionConditionApi,
    CreateCommissionConditionCollectionRequest,
    CreateCommissionConditionRequest,
    DeleteCommissionConditionByTypeRequest,
    UpdateCommissionConditionRequest,
} from '../../../sdk/tour-operations';

export const getCommissionConditionApi = () => {
    return new CommissionConditionApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useCreateCommissionConditionAgent = () => {
    return useMutation(
        ['createCommissionConditionAgent'],
        async (request: CreateCommissionConditionRequest): Promise<AxiosResponse<string>> => {
            const response = await getCommissionConditionApi().commissionConditionCreateForAgent('root', request);
            return response;
        },
    );
};

export const useCreateCommissionConditionReferrer = () => {
    return useMutation(
        ['createCommissionConditionReferrer'],
        async (request: CreateCommissionConditionRequest): Promise<AxiosResponse<string>> => {
            const response = await getCommissionConditionApi().commissionConditionCreateForReferrer('root', request);
            return response;
        },
    );
};

export const useCreateCommissionConditionCollectionAgent = () => {
    return useMutation(
        ['createCommissionConditionCollectionAgent'],
        async (request: CreateCommissionConditionCollectionRequest): Promise<AxiosResponse<number>> => {
            const response = await getCommissionConditionApi().commissionConditionCreateCollectionForAgent(
                'root',
                request,
            );
            return response;
        },
    );
};

export const useCreateCommissionConditionCollectionReferrer = () => {
    return useMutation(
        ['createCommissionConditionCollectionAgentReferrer'],
        async (request: CreateCommissionConditionCollectionRequest): Promise<AxiosResponse<number>> => {
            const response = await getCommissionConditionApi().commissionConditionCreateCollectionForReferrer(
                'root',
                request,
            );
            return response;
        },
    );
};

export const useUpdateCommissionConditionAgent = () => {
    return useMutation(
        ['updateCommissionConditionAgent'],
        async (request: UpdateCommissionConditionRequest): Promise<AxiosResponse<string>> => {
            const response = await getCommissionConditionApi().commissionConditionUpdateForAgent(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useUpdateCommissionConditionReferrer = () => {
    return useMutation(
        ['updateCommissionConditionReferrer'],
        async (request: UpdateCommissionConditionRequest): Promise<AxiosResponse<string>> => {
            const response = await getCommissionConditionApi().commissionConditionUpdateForReferrer(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useDeleteCommissionConditionAgent = () => {
    return useMutation(['deleteCommissionConditionAgent'], async (id: string): Promise<string> => {
        const response = await getCommissionConditionApi().commissionConditionDeleteForAgent(id, 'root');
        return response.data;
    });
};

export const useDeleteCommissionConditionAgentByType = () => {
    return useMutation(
        ['deleteCommissionConditionAgentByType'],
        async (request: DeleteCommissionConditionByTypeRequest): Promise<number> => {
            const response = await getCommissionConditionApi().commissionConditionDeleteByTypeForAgent('root', request);
            return response.data;
        },
    );
};

export const useDeleteCommissionConditionReferrer = () => {
    return useMutation(['deleteCommissionConditionReferrer'], async (id: string): Promise<string> => {
        const response = await getCommissionConditionApi().commissionConditionDeleteForReferrer(id, 'root');
        return response.data;
    });
};

export const useDeleteCommissionConditionReferrerByType = () => {
    return useMutation(
        ['deleteCommissionConditionReferrerByType'],
        async (request: DeleteCommissionConditionByTypeRequest): Promise<number> => {
            const response = await getCommissionConditionApi().commissionConditionDeleteByTypeForReferrer(
                'root',
                request,
            );
            return response.data;
        },
    );
};
