import { useMutation } from 'react-query';

import { PaginationResponseOfProductTypeDto, ProductCategoryApi } from '../../../sdk/tour-operations';
import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';

export const getProductCategoryApi = () => {
    return new ProductCategoryApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetProductCategory = () => {
    return useMutation(['getProductCategory'], async (): Promise<PaginationResponseOfProductTypeDto> => {
        const response = await getProductCategoryApi().productCategorySearch('root', {});
        return response.data;
    });
};
