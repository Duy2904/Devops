import { PaginationResponseOfPaymentMethodDto, PaymentMethodApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getPaymentMethodApi = () => {
    return new PaymentMethodApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetPaymentMethods = () => {
    return useQuery(
        ['fetchPaymentMethods'],
        async (): Promise<PaginationResponseOfPaymentMethodDto> => {
            const response = await getPaymentMethodApi().paymentMethodSearch('root', {
                pageSize: 100,
            });
            return response.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
