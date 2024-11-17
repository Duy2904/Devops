import { useMutation } from 'react-query';
import { PaginationResponseOfProductDto, ProductApi, SearchProductsRequest } from '../../../sdk/tour-operations';
import { AppConfig } from '../../utils/config';
import { getAxiosInstance } from '../../services/auth';

export const getProductApi = () => {
    return new ProductApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetProducts = () => {
    return useMutation(
        ['getProducts'],
        async (request: SearchProductsRequest): Promise<PaginationResponseOfProductDto> => {
            const response = await getProductApi().productSearch('root', request);
            return response.data;
        },
    );
};
