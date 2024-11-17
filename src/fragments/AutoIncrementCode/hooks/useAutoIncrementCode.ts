import {
    CreateVoucherParameterRequest,
    PaginationResponseOfVoucherParameterDto,
    UpdateVoucherParameterRequest,
    VoucherParameterApi,
} from '@sdk/tour-operations';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';

export const getAutoIncrementCodeApi = () => {
    return new VoucherParameterApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useSearchVoucherDetail = (tableName: string) => {
    return useQuery(
        ['fetchVoucherSearch', tableName],
        async (): Promise<PaginationResponseOfVoucherParameterDto> => {
            const dataFetch = await getAutoIncrementCodeApi().voucherParameterSearch('root', {
                tableName: tableName,
                pageSize: 1,
            });
            return dataFetch.data;
        },
        { refetchOnWindowFocus: false, enabled: !!tableName, staleTime: Infinity },
    );
};

export const useGetVoucherDetail = (id: string) => {
    return useQuery(
        ['fetchVoucherDetail', id],
        async () => {
            const dataFetch = await getAutoIncrementCodeApi().voucherParameterGet(id, 'root');
            return dataFetch.data;
        },
        { refetchOnWindowFocus: false, enabled: !!id },
    );
};

export const useCreateVoucherDetail = (tableName: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        ['createVoucherDetail'],
        async (request: CreateVoucherParameterRequest) => {
            const dataFetch = await getAutoIncrementCodeApi().voucherParameterCreate('root', request);
            return dataFetch.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchVoucherDetail', tableName]);
            },
        },
    );
};

export const useUpdateVoucherDetail = (tableName: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        ['updateVoucherDetail'],
        async (request: UpdateVoucherParameterRequest) => {
            const dataFetch = await getAutoIncrementCodeApi().voucherParameterUpdate(
                request?.id ?? '',
                'root',
                request,
            );
            return dataFetch.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchVoucherDetail', tableName]);
            },
        },
    );
};
