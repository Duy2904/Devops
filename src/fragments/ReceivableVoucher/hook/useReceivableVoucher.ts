import {
    ApproveReceivableVoucherRequest,
    CreateReceivableVoucherRequest,
    DocumentType,
    ExportReceivableVoucherRequest,
    PaginationResponseOfReceivableVoucherSearchDto,
    ReceivableVoucherApi,
    ReceivableVoucherDto,
    SaleOrderApi,
    SaleOrderViewPaginationDto,
    SearchReceivableVouchersRequest,
    UpdateReceivableVoucherRequest,
    VoucherStatus,
} from '@sdk/tour-operations';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';
import { ITableParamsType } from '@src/new/shared/types/Search';
import { SorterResult } from 'antd/es/table/interface';
import _ from 'lodash';
import dayjs from 'dayjs';
import { getAxiosInstance } from '@services/auth';
import { getRefundVoucherApi } from '@fragments/RefundVoucher/hook/useRefundVoucher';
import i18n from '@src/i18n';

export const getReceivablesApi = () => {
    return new ReceivableVoucherApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetReceivables = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        ['fetchListReceivables', JSON.stringify(customKey)],
        async (): Promise<PaginationResponseOfReceivableVoucherSearchDto> => {
            const response = await getReceivablesApi().receivableVoucherSearch('root', mapSearchRequest(request));
            return response.data;
        },
        { refetchOnWindowFocus: false },
    );
};

export const useGetReceivablesNotEnableQuery = () => {
    return useMutation(
        ['fetchListReceivables'],
        async (request: SearchReceivableVouchersRequest): Promise<PaginationResponseOfReceivableVoucherSearchDto> => {
            const response = await getReceivablesApi().receivableVoucherSearch('root', request);
            return response.data;
        },
    );
};

export const useGetRefundNotEnableQuery = () => {
    return useMutation(
        ['fetchListRefund'],
        async (request: SearchReceivableVouchersRequest): Promise<PaginationResponseOfReceivableVoucherSearchDto> => {
            const response = await getRefundVoucherApi().refundVoucherSearch('root', request);
            return response.data;
        },
    );
};

export const useGetReceivable = (id: string) => {
    return useQuery(
        ['fetchReceivableVoucher', id],
        async (): Promise<ReceivableVoucherDto> => {
            const response = await getReceivablesApi().receivableVoucherGet(id, 'root');
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!id },
    );
};

export const useCreateReceivable = () => {
    return useMutation(['createReceivableVoucherDetail'], async (request: CreateReceivableVoucherRequest) => {
        const dataFetch = await getReceivablesApi().receivableVoucherCreate('root', request);
        return dataFetch.data;
    });
};

export const useGenCodeReceivable = () => {
    return useMutation(['genCodeReceivable'], async () => {
        const dataFetch = await getReceivablesApi().receivableVoucherGetReceiveVoucherNo('root');
        return dataFetch.data;
    });
};

export const useUpdateReceivable = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        ['updateReceivableVoucherDetail'],
        async (request: UpdateReceivableVoucherRequest) => {
            const dataFetch = await getReceivablesApi().receivableVoucherUpdate(request.id ?? '', 'root', request);
            return dataFetch.data ?? [];
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchReceivableVoucher', id ?? '']);
            },
        },
    );
};

export const useDeleteReceivable = () => {
    return useMutation(['deleteReceivable'], async (id: string): Promise<string> => {
        const response = await getReceivablesApi().receivableVoucherDelete(id, 'root');
        return response.data;
    });
};

export const useSearchSaleOrderFromTour = (tourId: string | undefined) => {
    return useQuery(
        ['fetchSearchListSO', tourId],
        async (): Promise<SaleOrderViewPaginationDto> => {
            const response = await new SaleOrderApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).saleOrderVoucherSearch('root', { tourScheduleId: tourId });
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!tourId },
    );
};

export const useFetchSaleOrder = (id: string | undefined) => {
    return useQuery(
        ['fetchSaleOrder', id],
        async () => {
            const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderGet(
                id ?? '',
                'root',
            );
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!id },
    );
};

export const useSendForConfirmation = () => {
    return useMutation(['sendForConfirmation'], async (id: string) => {
        const dataFetch = await getReceivablesApi().receivableVoucherSendForConfirmation(id, 'root', {
            receivableVoucherId: id,
        });
        return dataFetch.data ?? [];
    });
};

export const useConfirmReceivaleVoucher = () => {
    return useMutation(['confirmReceivaleVoucher'], async (request: ApproveReceivableVoucherRequest) => {
        const dataFetch = await getReceivablesApi().receivableVoucherApprove('root', request);
        return dataFetch.data;
    });
};

export const useExportDataReceivableVoucher = () => {
    const fetchData = async (request: ExportReceivableVoucherRequest) => {
        const response = await getReceivablesApi().receivableVoucherExport('root', request);
        return response.data;
    };

    return useMutation(['exportDataReceivableVoucher'], fetchData, {});
};

export const useDownloadFile = () => {
    return useMutation(['downloadFile'], async (request: { id: string; type: DocumentType }) => {
        const response = await getReceivablesApi().receivableVoucherDownload('root', request.id, request.type);

        return response.data;
    });
};

export const getVoucherStatus = () => {
    const receivableStatus = [VoucherStatus.Received, VoucherStatus.WaitingForConfirmation, VoucherStatus.Confirmed];
    return Object.values(receivableStatus).map((item: string) => ({
        value: item,
        label: i18n.t(`voucher.status.${item}`),
    }));
};

export const mapSearchRequest = (params: ITableParamsType<ReceivableVoucherDto>): SearchReceivableVouchersRequest => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().subtract(1, 'month').startOf('day').utc().toDate(),
        dayjs().endOf('day').utc().toDate(),
    );

    const request: SearchReceivableVouchersRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        status: params.statuses ? (params.statuses as VoucherStatus[]) : [],
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
    };

    const sorter = params.sorter as SorterResult<ReceivableVoucherDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};
