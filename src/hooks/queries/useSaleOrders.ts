import {
    ApproveSaleOrderGuaranteeRequest,
    ConfirmSaleOrderOverloadRequest,
    ConfirmSaleOrderRequest,
    CreateSaleOrderRequest,
    DocumentType,
    ExportSaleOrderRequest,
    OrderStatus,
    PaginationResponseOfPaymentMethodDto,
    PaymentMethodApi,
    SaleOrderApi,
    SaleOrderDto,
    SaleOrderViewPaginationDto,
    SaleOrdersOfTourDto,
    SearchPaymentMethodsRequest,
    SearchSaleOrdersViewRequest,
    SendGuaranteeApprovalRequest,
    UpdateSaleOrderRequest,
} from '@sdk/tour-operations';
import { useMutation, useQuery } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { AxiosResponse } from 'axios';
import Format from '@utils/format';
import { ITableParamsType } from '@src/new/shared/types/Search';
import { SorterResult } from 'antd/es/table/interface';
import _ from 'lodash';
import dayjs from 'dayjs';
import { getAxiosInstance } from '@services/auth';

export const useGetSaleOrders = (request: AnyObject) => {
    const fetchData = async (): Promise<SaleOrderViewPaginationDto> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderSearch(
            'root',
            mapSearchRequest(request),
        );
        return response.data;
    };
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(['fetchSaleOrderList', JSON.stringify(customKey)], fetchData, { refetchOnWindowFocus: false });
};

export const useGetSaleOrder = (id: string) => {
    const fetchData = async () => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderGet(
            id,
            'root',
        );
        return response.data;
    };

    return useQuery(['getSaleOrder', id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: !!id,
        cacheTime: 0,
    });
};

export const useGetListSOBookedTourFit = () => {
    return useMutation(['getListSOBookedTourFit'], async (id: string): Promise<SaleOrdersOfTourDto> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderGetBooked(
            'root',
            id,
        );
        return response.data;
    });
};

export const useGetListSOReservedTourFit = () => {
    return useMutation(['getListSOReservedTourFit'], async (id: string): Promise<SaleOrdersOfTourDto> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderGetReserved(
            'root',
            id,
        );
        return response.data;
    });
};

export const useCreateSaleOrder = () => {
    return useMutation(['createSaleOrder'], async (request: CreateSaleOrderRequest): Promise<AxiosResponse<string>> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderCreate(
            'root',
            request,
        );
        return response;
    });
};

export const useUpdateSaleOrder = () => {
    return useMutation(['updateSaleOrder'], async (request: UpdateSaleOrderRequest): Promise<AxiosResponse<string>> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderUpdate(
            request.id ?? '',
            'root',
            request,
        );
        return response;
    });
};

export const useDeleteSaleOrder = () => {
    return useMutation(['deleteSaleOrder'], async (id: string): Promise<string> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderDelete(
            id,
            'root',
        );
        return response.data;
    });
};

export const mapSearchRequest = (params: ITableParamsType<SaleOrderDto>) => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().add(-1, 'months').startOf('day').utc().toDate(),
        dayjs().endOf('day').utc().toDate(),
    );

    const request: SearchSaleOrdersViewRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        status: params.statuses ? (params.statuses as OrderStatus[]) : [],
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        tourScheduleId: params.tourId,
    };

    const sorter = params.sorter as SorterResult<SaleOrderDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }

    return request;
};

export const useGenerateSaleOrderCode = () => {
    return useMutation(['generateSaleOrderCode'], async (): Promise<string> => {
        const response = await new SaleOrderApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).saleOrderGetSaleOrderNo('root');
        return response.data;
    });
};

export const useGetSaleOrderTotal = () => {
    return;
};

export const useGetPaymentMethods = () => {
    return useMutation(
        ['getPaymentMethods'],
        async (request: SearchPaymentMethodsRequest): Promise<PaginationResponseOfPaymentMethodDto> => {
            const response = await new PaymentMethodApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).paymentMethodSearch('root', request);
            return response.data;
        },
    );
};

export const useApproveSaleOrder = () => {
    return useMutation(
        ['approveSaleOrder'],
        async (request: ConfirmSaleOrderRequest): Promise<string[] | undefined> => {
            const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderConfirm(
                'root',
                request,
            );
            return response.data.successIds;
        },
    );
};

export const useRequestApproveSaleOrderGuarantee = () => {
    return useMutation(
        ['requestApproveSaleOrderGuarantee'],
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

export const useApproveSaleOrderGuarantee = () => {
    return useMutation(
        ['approveSaleOrderGuarantee'],
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

export const useApproveSaleOrderOverload = () => {
    return useMutation(
        ['approveSaleOrderOverload'],
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

export const useSODownload = () => {
    return useMutation(['SODownloadFile'], async (request: { id: string; type: DocumentType }) => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderDownload(
            'root',
            request.id,
            request.type,
        );

        return response.data;
    });
};

export const useExportSaleOrder = () => {
    const fetchData = async (request: ExportSaleOrderRequest) => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderExport(
            'root',
            request,
        );

        return response.data;
    };

    return useMutation(['exportSaleOrder'], fetchData);
};
