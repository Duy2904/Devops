import { RefundRequest, SaleOrderApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';
import { useMutation } from 'react-query';

export const useRequestRefund = () => {
    return useMutation(['requestRefund'], async (request: RefundRequest) => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderSendRefund(
            'root',
            request,
        );
        return response.data;
    });
};
