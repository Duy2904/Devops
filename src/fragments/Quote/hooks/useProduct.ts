import { useQuery } from 'react-query';

import { ProductApi, SearchProductsRequest } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

export const getProductApi = () => {
    return new ProductApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetProducts = (productCategoryId: string) => {
    const request: SearchProductsRequest = {
        advancedFilter: {
            logic: 'and',
            filters: [
                {
                    field: 'productCategory.id',
                    value: productCategoryId,
                    operator: 'eq',
                },
            ],
        },
    };
    const fetchData = async () => {
        const response = await getProductApi().productSearch('root', request);
        return response.data;
    };

    return useQuery(['getProducts', productCategoryId], fetchData, {
        refetchOnWindowFocus: false,
        enabled: !!productCategoryId,
    });
};
