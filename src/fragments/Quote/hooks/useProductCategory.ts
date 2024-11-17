import { useQuery } from 'react-query';

import { ProductCategoryApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

export const useGetProductCategory = () => {
    const fetchData = async () => {
        const response = await new ProductCategoryApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).productCategorySearch('root', {});
        return response.data;
    };

    return useQuery(['getProductCategory'], fetchData, {
        refetchOnWindowFocus: false,
    });
};
