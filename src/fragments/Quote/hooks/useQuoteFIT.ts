import {
    ConfirmQuoteRequest,
    CreateQuoteRequest,
    ExportQuoteRequest,
    ExportQuotesRequest,
    PaginationResponseOfSearchQuoteDto,
    QuoteFitApi,
    QuoteStatus,
    SearchQuoteDto,
    SearchQuotesRequest,
} from '@sdk/tour-operations';
import _, { isEmpty } from 'lodash';
import { useMutation, useQuery } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { AxiosResponse } from 'axios';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '@src/types/SearchResponse';
import dayjs from 'dayjs';
import { getAxiosInstance } from '@services/auth';
import useHasAnyPermission from '@hooks/useHasAnyPermission';

export const getQuoteApi = () => {
    return new QuoteFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

// auto gen code QE
export const useGenerateQuoteCode = () => {
    return useMutation(['generateQuoteCode'], async (): Promise<string> => {
        const response = await getQuoteApi().quoteFitGetCode('root');
        return response.data;
    });
};

export const useFetchQuotes = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        ['fetchQuotes', JSON.stringify(customKey)],
        async (): Promise<PaginationResponseOfSearchQuoteDto> => {
            const response = await getQuoteApi().quoteFitSearch('root', mapSearchRequest(request));
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !isEmpty(request) },
    );
};

export const useGetQuote = (id: string) => {
    const fetchData = async () => {
        const response = await getQuoteApi().quoteFitGet(id, 'root');
        return response.data;
    };

    return useQuery(['getQuote', id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: !!id,
        cacheTime: 0,
    });
};

export const useCreateQuote = () => {
    return useMutation(['createQuote'], async (request: CreateQuoteRequest): Promise<AxiosResponse<string>> => {
        const response = await getQuoteApi().quoteFitCreate('root', request);
        return response;
    });
};

export const useDeleteQuote = () => {
    return useMutation(['deleteQuote'], async (id: string): Promise<string> => {
        const response = await getQuoteApi().quoteFitDelete(id, 'root');
        return response.data;
    });
};

export const useCancelQuote = () => {
    return useMutation(['cancelQuote'], async (id: string): Promise<string> => {
        const response = await getQuoteApi().quoteFitCancel(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<SearchQuoteDto>): SearchQuotesRequest => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().subtract(1, 'month').startOf('day').utc().toDate(),
        dayjs().endOf('day').utc().toDate(),
    );

    const advancedSearchKeyword = {
        logic: 'or',
        filters: [
            {
                field: 'orderNo',
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

    const request: SearchQuotesRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        status: params.status ? (params.status as QuoteStatus[]) : [],
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        tourScheduleId: params.tourId,
        advancedFilter: advancedSearchKeyword,
    };

    const sorter = params.sorter as SorterResult<SearchQuoteDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};

export const useUpdateQuote = () => {
    return useMutation(['updateQuote'], async (request: CreateQuoteRequest): Promise<AxiosResponse<string>> => {
        const response = await getQuoteApi().quoteFitUpdate('root', request);
        return response;
    });
};

export const useExportQuoteDetail = () => {
    const hasSaleOrderSearchPermission = useHasAnyPermission([MyPermissions.QuoteView]);

    const fetchData = hasSaleOrderSearchPermission
        ? async (data: { id: string; request: ExportQuoteRequest }) => {
              const response = await getQuoteApi().quoteFitExportDetail(data.id, 'root', data.request);

              return response.data;
          }
        : async (data: { id: string; request: ExportQuoteRequest }) => {
              const response = await getQuoteApi().quoteFitAgencyExportDetail(data.id, 'root', data.request);

              return response.data;
          };

    return useMutation(['exportQuoteDetail'], fetchData);
};

export const useExportQuoteList = () => {
    const hasSaleOrderSearchPermission = useHasAnyPermission([MyPermissions.QuoteView]);

    const fetchData = hasSaleOrderSearchPermission
        ? async (request: ExportQuotesRequest) => {
              const response = await getQuoteApi().quoteFitExport('root', request);

              return response.data;
          }
        : async (request: ExportQuotesRequest) => {
              const response = await getQuoteApi().quoteFitAgencyExport('root', request);

              return response.data;
          };

    return useMutation(['exportQuoteList'], fetchData);
};

export const useRequestApproveQuote = () => {
    return useMutation(['requestApproveQuote'], async (id: string): Promise<string> => {
        const response = await getQuoteApi().quoteFitSendConfirm(id, 'root');
        return response.data;
    });
};

export const useApproveQuote = () => {
    return useMutation(['approveQuote'], async (request: ConfirmQuoteRequest): Promise<string> => {
        const response = await getQuoteApi().quoteFitConfirm('root', request);
        return response.data;
    });
};
