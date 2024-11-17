import {
    CancellationTypeApi,
    CreateCancellationTypeRequest,
    PaginationResponseOfCancellationTypeDto,
    UpdateCancellationTypeRequest,
} from '../../../sdk/tour-operations';
import { useMutation, useQuery } from 'react-query';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { getAxiosInstance } from '../../services/auth';

export const getCancellationTypeApi = () => {
    return new CancellationTypeApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetCancellationType = () => {
    const response = async (): Promise<PaginationResponseOfCancellationTypeDto> => {
        const res = await getCancellationTypeApi().cancellationTypeSearch('root', {
            pageSize: 300,
        });
        return res.data;
    };
    return useQuery(['fetchCancellationType'], response, { refetchOnWindowFocus: false, staleTime: Infinity });
};

export const useCreateCancellationType = () => {
    return useMutation(
        ['createCancellationType'],
        async (request: CreateCancellationTypeRequest): Promise<AxiosResponse<string>> => {
            const response = await getCancellationTypeApi().cancellationTypeCreate('root', request);
            return response;
        },
    );
};

export const useUpdateCancellationType = () => {
    return useMutation(
        ['updateCancellationType'],
        async (request: UpdateCancellationTypeRequest): Promise<AxiosResponse<string>> => {
            const response = await getCancellationTypeApi().cancellationTypeUpdate(request.id ?? '', 'root', request);
            return response;
        },
    );
};
