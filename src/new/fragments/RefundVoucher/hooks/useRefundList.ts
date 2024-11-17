import {
    ApprovalTourStatus,
    ApproveReceivableVoucherRequest,
    ApproveRefundVoucherByManagerRequest,
    DocumentType,
    ExportReceivableVoucherRequest,
    PaginationResponseOfReceivableVoucherSearchDto,
    RefundVoucherApi,
    VoucherStatus,
} from '@sdk/tour-operations';
import { useMutation, useQuery } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { QueriesKey } from '../features/QueriesKey';
import _ from 'lodash';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';
import { mapSearchRequest } from '../features';

export const getRefundApi = () => {
    return new RefundVoucherApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const getVoucherStatus = () => {
    const refundStatus = [
        VoucherStatus.Draft,
        VoucherStatus.WaitingForApproval,
        VoucherStatus.Refunded,
        VoucherStatus.WaitingForConfirmation,
        VoucherStatus.Confirmed,
        VoucherStatus.Rejected,
    ];
    return Object.values(refundStatus).map((item: string) => ({
        value: item,
        label: i18n.t(`voucher.status.${item}`),
    }));
};

export const getApproveStatus = () =>
    Object.values(ApprovalTourStatus).map((key: string | ApprovalTourStatus) => ({
        value: key,
        label: i18n.t(`tour.approveStatus.${key}`),
    }));

export const useGetRefundList = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');

    const requestFn = async (): Promise<PaginationResponseOfReceivableVoucherSearchDto> => {
        const response = await getRefundApi().refundVoucherSearch('root', mapSearchRequest(request));
        return response.data;
    };
    return useQuery([QueriesKey.GetList, JSON.stringify(customKey)], requestFn, { refetchOnWindowFocus: false });
};

export const useSendForApprove = () => {
    return useMutation([QueriesKey.Request_Approve], async (id: string) => {
        const dataFetch = await getRefundApi().refundVoucherSendForApproval(id, 'root', {
            receivableVoucherId: id,
        });
        return dataFetch.data ?? [];
    });
};

export const useApproveRefund = () => {
    return useMutation([QueriesKey.Confirm_Approve], async (request: ApproveRefundVoucherByManagerRequest) => {
        const dataFetch = await getRefundApi().refundVoucherApprove('root', request);
        return dataFetch.data;
    });
};

export const useSendForConfirmation = () => {
    return useMutation([QueriesKey.Request_Confirm], async (id: string) => {
        const dataFetch = await getRefundApi().refundVoucherSendForConfirmation(id, 'root', {
            receivableVoucherId: id,
        });
        return dataFetch.data ?? [];
    });
};

export const useConfirmRefund = () => {
    return useMutation([QueriesKey.Confirm_Approve_Accoutant], async (request: ApproveReceivableVoucherRequest) => {
        const dataFetch = await getRefundApi().refundVoucherConfirm('root', request);
        return dataFetch.data;
    });
};

export const useDeleteRefund = () => {
    return useMutation([QueriesKey.Delete], async (id: string): Promise<string> => {
        const response = await getRefundApi().refundVoucherDelete(id, 'root');
        return response.data;
    });
};

export const useDownloadFile = () => {
    return useMutation([QueriesKey.DownloadFile], async (request: { id: string; type: DocumentType }) => {
        const response = await getRefundApi().refundVoucherDownload('root', request.id, request.type);

        return response.data;
    });
};

export const useExportExcel = () => {
    const fetchData = async (request: ExportReceivableVoucherRequest) => {
        const response = await getRefundApi().refundVoucherExport('root', request);

        return response.data;
    };

    return useMutation([QueriesKey.ExportExcel], fetchData);
};
