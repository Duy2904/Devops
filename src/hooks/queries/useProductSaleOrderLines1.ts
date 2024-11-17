import {
    PaginationResponseOfSaleOrderLineDto,
    SaleOrderLineApi,
    SearchSaleOrderLinesRequest,
} from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useMutation } from 'react-query';

export const useGetProductSaleOrderLines = () => {
    return useMutation(
        ['getProductSaleOrderLines'],
        async (request: SearchSaleOrderLinesRequest): Promise<PaginationResponseOfSaleOrderLineDto> => {
            const response = await new SaleOrderLineApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).saleOrderLineSearch('root', request);
            return response.data;
        },
    );
};

export const useDeleteProductSaleOrderLine = () => {
    return useMutation(['deleteProductSaleOrderLine'], async (id: string): Promise<string> => {
        const response = await new SaleOrderLineApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).saleOrderLineDelete(id, 'root');
        return response.data;
    });
};
