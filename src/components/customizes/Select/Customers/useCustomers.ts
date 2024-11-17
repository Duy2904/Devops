import {
    CustomerApi,
    PaginationResponseOfCustomerDto,
    SearchCustomersRequest,
} from '../../../../../sdk/tour-operations';
import { useMutation, useQuery } from 'react-query';

import { AppConfig } from '../../../../utils/config';
import { getAxiosInstance } from '../../../../services/auth';

export const getCustomersApi = () => {
    return new CustomerApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetCustomers = () => {
    return useMutation(
        ['getCustomers'],
        async (request: SearchCustomersRequest): Promise<PaginationResponseOfCustomerDto> => {
            const response = await new CustomerApi(undefined, AppConfig.ApiHost, getAxiosInstance()).customerSearch(
                'root',
                request,
            );
            return response.data;
        },
    );
};

export const useFetchCustomers = () => {
    return useQuery(
        ['fetchCustomers'],
        async (): Promise<PaginationResponseOfCustomerDto> => {
            const dataFetch = await getCustomersApi().customerSearch('root', { pageSize: 100 });
            return dataFetch.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
