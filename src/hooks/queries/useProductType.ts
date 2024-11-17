import { useMutation } from 'react-query';
import { PaginationResponseOfProductTypeDto, ProductTypeApi } from '../../../sdk/tour-operations';
import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';

export const getProductTypeApi = () => {
    return new ProductTypeApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetProductTypes = () => {
    return useMutation(['getProductTypes'], async (): Promise<PaginationResponseOfProductTypeDto> => {
        const response = await getProductTypeApi().productTypeSearch('root', {
            pageSize: 10,
        });
        return response.data;
    });
};
