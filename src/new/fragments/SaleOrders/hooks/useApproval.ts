import {
    ApproveSaleOrderGuaranteeRequest,
    ConfirmSaleOrderOverloadRequest,
    ConfirmSaleOrderRequest,
    RefundRequest,
    SaleOrderApi,
    SendGuaranteeApprovalRequest,
} from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { QueriesKey } from '../pages/SaleOrderFormDetail/hooks/QueriesKey';
import { getAxiosInstance } from '@services/auth';
import { useMutation } from 'react-query';

export const useApproveSaleOrder = () => {
    return useMutation(
        [QueriesKey.Approval],
        async (request: ConfirmSaleOrderRequest): Promise<string[] | undefined> => {
            const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderConfirm(
                'root',
                request,
            );
            return response.data.successIds;
        },
    );
};

export const useApproveSaleOrderGuarantee = () => {
    return useMutation(
        [QueriesKey.ApprovalGuarantee],
        async (request: ApproveSaleOrderGuaranteeRequest): Promise<string[]> => {
            const response = await new SaleOrderApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).saleOrderApproveSaleOrderGuarantee('root', request);
            return response.data;
        },
    );
};

export const useRequestApproveSaleOrderGuarantee = () => {
    return useMutation(
        [QueriesKey.RequestApprovalGuarantee],
        async (request: SendGuaranteeApprovalRequest): Promise<string[]> => {
            const response = await new SaleOrderApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).saleOrderSendGuaranteeApproval('root', request);
            return response.data;
        },
    );
};

export const useApproveSaleOrderOverload = () => {
    return useMutation(
        [QueriesKey.ApprovalOverload],
        async (request: ConfirmSaleOrderOverloadRequest): Promise<string[]> => {
            const response = await new SaleOrderApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).saleOrderConfirmSaleOrderOverload('root', request);
            return response.data;
        },
    );
};

export const useRequestRefund = () => {
    return useMutation([QueriesKey.RequestRefund], async (request: RefundRequest) => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderSendRefund(
            'root',
            request,
        );
        return response.data;
    });
};
