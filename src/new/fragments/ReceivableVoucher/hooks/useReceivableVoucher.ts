import {
    ApproveReceivableVoucherRequest,
    DocumentType,
    ExportReceivableVoucherRequest,
    PaginationResponseOfReceivableVoucherSearchDto,
    ReceivableVoucherApi,
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

export const getReceivablesApi = () => {
    return new ReceivableVoucherApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const getVoucherStatus = () => {
    const receivableStatus = [VoucherStatus.Received, VoucherStatus.WaitingForConfirmation, VoucherStatus.Confirmed];
    return Object.values(receivableStatus).map((item: string) => ({
        value: item,
        label: i18n.t(`voucher.status.${item}`),
    }));
};

export const useGetReceivables = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        [QueriesKey.GetList, JSON.stringify(customKey)],
        async (): Promise<PaginationResponseOfReceivableVoucherSearchDto> => {
            const response = await getReceivablesApi().receivableVoucherSearch('root', mapSearchRequest(request));
            return response.data;
        },
        { refetchOnWindowFocus: false },
    );
};

export const useSendForConfirmation = () => {
    return useMutation([QueriesKey.Request_Approve], async (id: string) => {
        const dataFetch = await getReceivablesApi().receivableVoucherSendForConfirmation(id, 'root', {
            receivableVoucherId: id,
        });
        return dataFetch.data ?? [];
    });
};

export const useConfirmReceivaleVoucher = () => {
    const requestFn = async (request: ApproveReceivableVoucherRequest) => {
        const dataFetch = await getReceivablesApi().receivableVoucherApprove('root', request);
        return dataFetch.data;
    };
    return useMutation([QueriesKey.Confirm_Approve], requestFn);
};

export const useDownloadFile = () => {
    return useMutation([QueriesKey.DownloadFile], async (request: { id: string; type: DocumentType }) => {
        const response = await getReceivablesApi().receivableVoucherDownload('root', request.id, request.type);

        return response.data;
    });
};

export const useExportDataReceivableVoucher = () => {
    const fetchData = async (request: ExportReceivableVoucherRequest) => {
        const response = await getReceivablesApi().receivableVoucherExport('root', request);
        return response.data;
    };

    return useMutation([QueriesKey.ExportExcel], fetchData);
};
