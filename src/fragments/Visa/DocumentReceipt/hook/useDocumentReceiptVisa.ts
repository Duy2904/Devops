import {
    CountryApi,
    CreateTourVisaRequest,
    DocumentType,
    ExportTourVisaRequest,
    LocationApi,
    PaginationResponseOfCountryDto,
    PaginationResponseOfLocationDto,
    PaginationResponseOfSearchTourVisaDto,
    SearchTourVisaRequest,
    TourVisaApi,
    TourVisaDto,
    TourVisaLineStatus,
    TourVisaStatus,
    UpdateTourVisaRequest,
    UpdateVisaStatusRequest,
} from '@sdk/tour-operations';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '@src/types/SearchResponse';
import _ from 'lodash';
import dayjs from 'dayjs';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';
import { pageSize } from '@utils/filterSearch';
import { toastSuccess } from '@components/ui/Toast/Toast';

export const getDocumentReceitVisaApi = () => {
    return new TourVisaApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGenCodeDocumentReceipt = () => {
    return useMutation(['genCodeDocumentReceipt'], async () => {
        const dataFetch = await getDocumentReceitVisaApi().tourVisaGetCode('root');
        return dataFetch.data;
    });
};

export const useFetchDocumentReceiptVisa = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        ['fetchDocumentReceiptVisa', JSON.stringify(customKey)],
        async (): Promise<PaginationResponseOfSearchTourVisaDto> => {
            const response = await getDocumentReceitVisaApi().tourVisaSearch('root', mapSearchRequest(request));
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!request },
    );
};

export const useFetchDocumentReceiptVisaDetail = (id: string) => {
    return useQuery(
        ['fetchDocumentReceiptVisaDetail', id],
        async (): Promise<TourVisaDto> => {
            const response = await getDocumentReceitVisaApi().tourVisaGet(id, 'root');
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!id },
    );
};

export const useCreateDocumentReceiptVisa = () => {
    return useMutation(
        ['createDocumentReceiptVisa'],
        async (request: CreateTourVisaRequest) => {
            const dataFetch = await getDocumentReceitVisaApi().tourVisaCreate('root', request);
            return dataFetch.data;
        },
        {
            onSuccess: () => {
                toastSuccess(i18n.t('menu.visaReceipt'), i18n.t('message.default.createContentSuccess'));
            },
        },
    );
};

export const useUpdateDocumentReceiptVisa = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        ['updateDocumentReceiptVisa'],
        async (request: UpdateTourVisaRequest) => {
            const dataFetch = await getDocumentReceitVisaApi().tourVisaUpdate(request.id!, 'root', request);
            return dataFetch.data ?? [];
        },
        {
            onSuccess: () => {
                toastSuccess(i18n.t('menu.visaReceipt'), i18n.t('message.default.updateContentSuccess'));
                queryClient.invalidateQueries(['fetchDocumentReceiptVisaDetail', id]);
            },
        },
    );
};

export const useDeleteDocumentReceiptVisa = () => {
    return useMutation(['deleteDocumentReceiptVisa'], async (id: string): Promise<string> => {
        const response = await getDocumentReceitVisaApi().tourVisaDelete(id, 'root');
        return response.data;
    });
};

export const useGetSaleOrderListFromVisa = () => {
    const params = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
    };

    const requestFn = async (valueSearch: string | undefined) => {
        const response = await getDocumentReceitVisaApi().tourVisaGetSaleOrder('root', {
            ...params,
            keyword: valueSearch,
        });
        return response.data;
    };
    return useMutation(['GET_VISA_SALE_ORDER_FROM_DOCUMENT_RECEIVE_VISA'], requestFn);
};

export const useGetLocations = () => {
    return useQuery(
        ['getLocations'],
        async (): Promise<PaginationResponseOfLocationDto> => {
            const response = await new LocationApi(undefined, AppConfig.ApiHost, getAxiosInstance()).locationSearch(
                'root',
                {},
            );
            return response.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};

export const useGetCountries = () => {
    return useQuery(
        ['getCountries'],
        async (): Promise<PaginationResponseOfCountryDto> => {
            const response = await new CountryApi(undefined, AppConfig.ApiHost, getAxiosInstance()).countrySearch(
                'root',
                {},
            );
            return response.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};

export const useGetCheckList = () => {
    return useQuery(
        ['getCheckList'],
        async () => {
            const response = await getDocumentReceitVisaApi().tourVisaGetCheckList('root');
            return response.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};

export const getTourVisaLineStatus = () =>
    Object.values(TourVisaLineStatus).map((key: string | TourVisaLineStatus) => ({
        value: key,
        label: i18n.t(`tourVisa.visaLineStatus.${key}`),
    }));

export const getTourVisaStatus = () =>
    Object.values(TourVisaStatus).map((key: string | TourVisaLineStatus) => ({
        value: key,
        label: i18n.t(`tourVisa.status.${key}`),
    }));

export const useDownloadFile = () => {
    return useMutation(['downloadFile'], async (request: { id: string; type: DocumentType }) => {
        const response = await getDocumentReceitVisaApi().tourVisaDownload('root', request.id, request.type);
        return response.data;
    });
};

export const useExportExcel = () => {
    const fetchData = async (request: ExportTourVisaRequest) => {
        const response = await getDocumentReceitVisaApi().tourVisaExport('root', request);

        return response.data;
    };

    return useMutation(['exportDataReceivableVoucher'], fetchData);
};

export const useChangeStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ['changeStatus'],
        async (request: UpdateVisaStatusRequest) => {
            const dataFetch = await getDocumentReceitVisaApi().tourVisaUpdateStatus('root', request);
            return dataFetch;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchDocumentReceiptVisaDetail']);
                queryClient.invalidateQueries(['fetchDocumentReceiptVisa']);
            },
        },
    );
};

export const mapSearchRequest = (params: TableParams<TourVisaDto>): SearchTourVisaRequest => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().subtract(1, 'month').startOf('day').utc().toDate(),
        dayjs().endOf('day').utc().toDate(),
    );

    const advancedSearchKeyword = {
        logic: 'or',
        filters: [
            {
                field: 'code',
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

    const request: SearchTourVisaRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        status: params.status ? (params.status as TourVisaStatus[]) : [],
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        countryId: params.countryId,
        tourScheduleId: params.tourId,
        advancedFilter: advancedSearchKeyword,
    };

    const sorter = params.sorter as SorterResult<TourVisaDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};
