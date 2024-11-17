import {
    CreateReceivableVoucherRequest,
    ReceivableVoucherApi,
    ReceivableVoucherDto,
    UpdateReceivableVoucherRequest,
} from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { QueriesKey } from '../features/QueriesKey';
import { getAxiosInstance } from '@services/auth';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const getReceivablesApi = () => {
    return new ReceivableVoucherApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchRCDetail = (id: string) => {
    const requestFn = async (): Promise<ReceivableVoucherDto> => {
        const response = await getReceivablesApi().receivableVoucherGet(id, 'root');
        return response.data;
    };
    return useQuery([QueriesKey.GetDetail, id], requestFn, { refetchOnWindowFocus: false, enabled: !!id });
};

export const useGenCodeReceivable = () => {
    const requestFn = async () => {
        const dataFetch = await getReceivablesApi().receivableVoucherGetReceiveVoucherNo('root');
        return dataFetch.data;
    };
    return useMutation([QueriesKey.GenCode], requestFn);
};

export const useCreateReceivable = () => {
    return useMutation([QueriesKey.Create], async (request: CreateReceivableVoucherRequest) => {
        const dataFetch = await getReceivablesApi().receivableVoucherCreate('root', request);
        return dataFetch.data;
    });
};

export const useUpdateReceivable = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        [QueriesKey.Update],
        async (request: UpdateReceivableVoucherRequest) => {
            const dataFetch = await getReceivablesApi().receivableVoucherUpdate(request.id ?? '', 'root', request);
            return dataFetch.data ?? [];
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueriesKey.GetDetail, id]);
            },
        },
    );
};

export const useDeleteReceivable = () => {
    return useMutation([QueriesKey.Delete], async (id: string): Promise<string> => {
        const response = await getReceivablesApi().receivableVoucherDelete(id, 'root');
        return response.data;
    });
};
