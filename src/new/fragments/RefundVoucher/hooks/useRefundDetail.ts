import {
    CreateReceivableVoucherRequest,
    ReceivableVoucherDto,
    RefundVoucherApi,
    UpdateReceivableVoucherRequest,
} from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { QueriesKey } from '../features/QueriesKey';
import { getAxiosInstance } from '@services/auth';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const getRefundsApi = () => {
    return new RefundVoucherApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchRFDetail = (id: string) => {
    const requestFn = async (): Promise<ReceivableVoucherDto> => {
        const response = await getRefundsApi().refundVoucherGet(id, 'root');
        return response.data;
    };
    return useQuery([QueriesKey.GetDetail, id], requestFn, { refetchOnWindowFocus: false, enabled: !!id });
};

export const useGenCodeRefund = () => {
    const requestFn = async () => {
        const dataFetch = await getRefundsApi().refundVoucherGetRefundVoucherNo('root');
        return dataFetch.data;
    };
    return useMutation([QueriesKey.GenCode], requestFn);
};

export const useCreateRefund = () => {
    return useMutation([QueriesKey.Create], async (request: CreateReceivableVoucherRequest) => {
        const dataFetch = await getRefundsApi().refundVoucherCreate('root', request);
        return dataFetch.data;
    });
};

export const useUpdateRefund = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        [QueriesKey.Update],
        async (request: UpdateReceivableVoucherRequest) => {
            const dataFetch = await getRefundsApi().refundVoucherUpdate(request.id ?? '', 'root', request);
            return dataFetch.data ?? [];
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueriesKey.GetDetail, id]);
            },
        },
    );
};
