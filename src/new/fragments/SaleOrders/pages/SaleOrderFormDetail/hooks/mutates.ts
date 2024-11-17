import {
    CreateSaleOrderRequest,
    DiscountApi,
    EstimateDiscountRequest,
    EstimateDiscountResponse,
    PaginationResponseOfDiscountDto,
    PaginationResponseOfProductDto,
    ProductApi,
    SaleOrderApi,
    SaleOrderLineApi,
    SearchDiscountRequest,
    SearchProductsRequest,
    UpdateSaleOrderRequest,
} from '@sdk/tour-operations';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';

import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

import { QueriesKey } from './QueriesKey';

export const getProductApi = () => {
    return new ProductApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGenerateSaleOrderCode = () => {
    const requestFn = async (): Promise<string> => {
        const response = await new SaleOrderApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).saleOrderGetSaleOrderNo('root');
        return response.data;
    };

    return useMutation({
        mutationKey: [QueriesKey.GenerateSaleOrderCode],
        mutationFn: requestFn,
    });
};

export const useGetProducts = () => {
    const requestFn = async (request: SearchProductsRequest): Promise<PaginationResponseOfProductDto> => {
        const response = await getProductApi().productSearch('root', request);
        return response.data;
    };

    return useMutation({
        mutationKey: [QueriesKey.GetProducts],
        mutationFn: requestFn,
    });
};

export const useDeleteSurcharge = () => {
    const queryClient = useQueryClient();

    const requestFn = async (id: string): Promise<string> => {
        const response = await new SaleOrderLineApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).saleOrderLineDelete(id, 'root');
        return response.data;
    };

    return useMutation({
        mutationKey: [QueriesKey.DeleteSurcharge],
        mutationFn: requestFn,
        onSuccess: () => {
            queryClient.invalidateQueries([QueriesKey.GetSaleOrderDetail]);
        },
    });
};

export const useCreateSaleOrder = () => {
    const requestFn = async (request: CreateSaleOrderRequest): Promise<AxiosResponse<string>> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderCreate(
            'root',
            request,
        );
        return response;
    };

    return useMutation({
        mutationKey: [QueriesKey.CreateSaleOrder],
        mutationFn: requestFn,
    });
};

export const useUpdateSaleOrder = () => {
    const queryClient = useQueryClient();

    const requestFn = async (request: UpdateSaleOrderRequest): Promise<AxiosResponse<string>> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderUpdate(
            request.id ?? '',
            'root',
            request,
        );
        return response;
    };

    return useMutation({
        mutationKey: [QueriesKey.UpdateSaleOrder],
        mutationFn: requestFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QueriesKey.GetSaleOrderDetail });
            queryClient.invalidateQueries({ queryKey: QueriesKey.GetTourScheduleId });
        },
    });
};

export const useGetDiscountList = (tourId: string | undefined) => {
    return useMutation(['getListDiscount'], async (type: string): Promise<PaginationResponseOfDiscountDto> => {
        const request: SearchDiscountRequest = {};
        request.activeDate = dayjs().startOf('day').utc().toDate();

        const response = await new DiscountApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).discountGetWithSaleOrder('root', {
            ...request,
            tourScheduleId: tourId,
            advancedFilter: {
                logic: 'and',
                filters: [
                    {
                        field: 'isActive',
                        operator: 'eq',
                        value: 'true',
                    },

                    {
                        field: 'type',
                        operator: 'eq',
                        value: type,
                    },
                ],
            },
        });

        return response.data;
    });
};

export const useGetEstimateDiscount = () => {
    return useMutation(
        ['getEstimateDiscount'],
        async (request: EstimateDiscountRequest): Promise<EstimateDiscountResponse> => {
            const response = await new SaleOrderApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).saleOrderEstimateDiscount('root', request);
            return response.data;
        },
    );
};
