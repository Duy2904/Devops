import {
    ApprovalTourStatus,
    ApproveReceivableVoucherRequest,
    ApproveRefundVoucherByManagerRequest,
    CreateReceivableVoucherRequest,
    DocumentType,
    ExportReceivableVoucherRequest,
    PaginationResponseOfReceivableVoucherSearchDto,
    PaginationResponseOfTourSearchFitDto,
    ReceivableVoucherDto,
    RefundVoucherApi,
    SaleOrderApi,
    SaleOrderViewPaginationDto,
    SearchReceivableVouchersRequest,
    SearchTourSchedulesRequestOfTourSearchFitDto,
    TourFitApi,
    UpdateReceivableVoucherRequest,
    VoucherStatus,
} from '@sdk/tour-operations';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../Feature';
import _ from 'lodash';
import dayjs from 'dayjs';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';

export const getRefundVoucherApi = () => {
    return new RefundVoucherApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetRefundList = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        ['fetchRefundList', JSON.stringify(customKey)],
        async (): Promise<PaginationResponseOfReceivableVoucherSearchDto> => {
            const response = await getRefundVoucherApi().refundVoucherSearch('root', mapSearchRequest(request));
            return response.data;
        },
        { refetchOnWindowFocus: false },
    );
};

export const useGenCodeRefund = () => {
    return useMutation(['genCodeRefund'], async () => {
        const dataFetch = await getRefundVoucherApi().refundVoucherGetRefundVoucherNo('root');
        return dataFetch.data;
    });
};

export const useGetRefund = (id: string) => {
    return useQuery(
        ['fetchRefundVoucher', id],
        async (): Promise<ReceivableVoucherDto> => {
            const response = await getRefundVoucherApi().refundVoucherGet(id, 'root');
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!id, cacheTime: 0 },
    );
};

export const useCreateRefund = () => {
    return useMutation(['createRefundDetail'], async (request: CreateReceivableVoucherRequest) => {
        const dataFetch = await getRefundVoucherApi().refundVoucherCreate('root', request);
        return dataFetch.data;
    });
};

export const useUpdateRefund = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        ['updateRefundDetail'],
        async (request: UpdateReceivableVoucherRequest) => {
            const dataFetch = await getRefundVoucherApi().refundVoucherUpdate(request.id ?? '', 'root', request);
            return dataFetch.data ?? [];
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchRefundVoucher', id ?? '']);
            },
        },
    );
};

export const useDeleteRefund = () => {
    return useMutation(['deleteRefund'], async (id: string): Promise<string> => {
        const response = await getRefundVoucherApi().refundVoucherDelete(id, 'root');
        return response.data;
    });
};

export const useDownloadFile = () => {
    return useMutation(['downloadFile'], async (request: { id: string; type: DocumentType }) => {
        const response = await getRefundVoucherApi().refundVoucherDownload('root', request.id, request.type);

        return response.data;
    });
};

export const useExportExcel = () => {
    const fetchData = async (request: ExportReceivableVoucherRequest) => {
        const response = await getRefundVoucherApi().refundVoucherExport('root', request);

        return response.data;
    };

    return useMutation(['exportDataReceivableVoucher'], fetchData);
};

export const useSearchTour = (request: SearchTourSchedulesRequestOfTourSearchFitDto) => {
    return useQuery(
        ['fetchSearchTour', request],
        async (): Promise<PaginationResponseOfTourSearchFitDto> => {
            const response = await new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourFitSearch(
                'root',
                request,
            );
            return response.data;
        },
        { refetchOnWindowFocus: false, cacheTime: 1000000 },
    );
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
        const dataFetch = await getRefundVoucherApi().refundVoucherSendForConfirmation(id, 'root', {
            receivableVoucherId: id,
        });
        return dataFetch.data ?? [];
    });
};

export const useSendForApprove = () => {
    return useMutation(['sendForApprove'], async (id: string) => {
        const dataFetch = await getRefundVoucherApi().refundVoucherSendForApproval(id, 'root', {
            receivableVoucherId: id,
        });
        return dataFetch.data ?? [];
    });
};

export const useConfirmRefund = () => {
    return useMutation(['confirmRefund'], async (request: ApproveReceivableVoucherRequest) => {
        const dataFetch = await getRefundVoucherApi().refundVoucherConfirm('root', request);
        return dataFetch.data;
    });
};

export const useApproveRefund = () => {
    return useMutation(['approveRefund'], async (request: ApproveRefundVoucherByManagerRequest) => {
        const dataFetch = await getRefundVoucherApi().refundVoucherApprove('root', request);
        return dataFetch.data;
    });
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

export const mapSearchRequest = (params: TableParams<ReceivableVoucherDto>): SearchReceivableVouchersRequest => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().subtract(1, 'month').startOf('day').utc().toDate(),
        dayjs().endOf('day').utc().toDate(),
    );

    const advancedSearchKeyword = {
        logic: 'or',
        filters: [
            {
                field: 'voucherNo',
                operator: 'contains',
                value: params.keyword ?? '',
            },
            {
                field: 'description',
                operator: 'contains',
                value: params.keyword ?? '',
            },
        ],
    };

    const request: SearchReceivableVouchersRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        status: (params.status as VoucherStatus[]) ?? [],
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        saleOrderIds: params.saleOrderIds,
        advancedFilter: advancedSearchKeyword,
    };

    const sorter = params.sorter as SorterResult<ReceivableVoucherDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};
