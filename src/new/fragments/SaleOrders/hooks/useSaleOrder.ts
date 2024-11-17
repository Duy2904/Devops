import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { CreateSaleOrderTransferRequest, SaleOrderApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

export const useGetSaleOrderTransfer = (id: string) => {
    const fetchData = async () => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderGetTransfer(
            id,
            'root',
        );
        return response.data;
    };

    return useQuery(['getSaleOrder', id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const useCreateSaleOrderChangeTour = () => {
    return useMutation(
        ['createSaleOrderChangeTour'],
        async (request: CreateSaleOrderTransferRequest): Promise<AxiosResponse<string>> => {
            const response = await new SaleOrderApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).saleOrderCreateTransfer('root', request);
            return response;
        },
    );
};

export const useCancelSaleOrder = () => {
    return useMutation(['cancelSaleOrder'], async (id: string) => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderCancelSingle(
            id,
            'root',
        );
        return response;
    });
};
