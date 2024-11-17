import {
    ConfirmQuoteRequest,
    CreateQuoteRequest,
    ExportQuoteRequest,
    ExportQuotesRequest,
    PaginationResponseOfSearchQuoteDto,
    QuoteGitApi,
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
    return new QuoteGitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

// auto gen code QE
export const useGenerateQuoteGitCode = () => {
    return useMutation(['generateQuoteCodeGit'], async (): Promise<string> => {
        const response = await getQuoteApi().quoteGitGetCode('root');
        return response.data;
    });
};

export const useFetchQuotesGit = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        ['fetchQuotesGit', JSON.stringify(customKey)],
        async (): Promise<PaginationResponseOfSearchQuoteDto> => {
            const response = await getQuoteApi().quoteGitSearch('root', mapSearchRequest(request));
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !isEmpty(request) },
    );
};

export const useGetQuoteGit = (id: string) => {
    const fetchData = async () => {
        const response = await getQuoteApi().quoteGitGet(id, 'root');
        return response.data;
    };

    return useQuery(['getQuoteGit', id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: !!id,
        cacheTime: 0,
    });
};

export const useCreateQuoteGit = () => {
    return useMutation(['createQuoteGit'], async (request: CreateQuoteRequest): Promise<AxiosResponse<string>> => {
        const response = await getQuoteApi().quoteGitCreate('root', request);
        return response;
    });
};

export const useDeleteQuoteGit = () => {
    return useMutation(['deleteQuoteGit'], async (id: string): Promise<string> => {
        const response = await getQuoteApi().quoteGitDelete(id, 'root');
        return response.data;
    });
};

export const useCancelQuoteGit = () => {
    return useMutation(['cancelQuoteGit'], async (id: string): Promise<string> => {
        const response = await getQuoteApi().quoteGitCancel(id, 'root');
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

export const useUpdateQuoteGit = () => {
    return useMutation(['updateQuoteGit'], async (request: CreateQuoteRequest): Promise<AxiosResponse<string>> => {
        const response = await getQuoteApi().quoteGitUpdate('root', request);
        return response;
    });
};

export const useExportQuoteGitDetail = () => {
    const hasSaleOrderSearchPermission = useHasAnyPermission([MyPermissions.QuoteGitView]);

    const fetchData = hasSaleOrderSearchPermission
        ? async (data: { id: string; request: ExportQuoteRequest }) => {
              const response = await getQuoteApi().quoteGitExportDetail(data.id, 'root', data.request);

              return response.data;
          }
        : async (data: { id: string; request: ExportQuoteRequest }) => {
              const response = await getQuoteApi().quoteGitAgencyExportDetail(data.id, 'root', data.request);

              return response.data;
          };

    return useMutation(['exportQuoteDetailGit'], fetchData);
};

export const useExportQuoteGitList = () => {
    const hasSaleOrderSearchPermission = useHasAnyPermission([MyPermissions.QuoteGitView]);

    const fetchData = hasSaleOrderSearchPermission
        ? async (request: ExportQuotesRequest) => {
              const response = await getQuoteApi().quoteGitExport('root', request);

              return response.data;
          }
        : async (request: ExportQuotesRequest) => {
              const response = await getQuoteApi().quoteGitAgencyExport('root', request);

              return response.data;
          };

    return useMutation(['exportQuoteGitList'], fetchData);
};

export const useRequestApproveQuoteGit = () => {
    return useMutation(['requestApproveQuoteGit'], async (id: string): Promise<string> => {
        const response = await getQuoteApi().quoteGitSendConfirm(id, 'root');
        return response.data;
    });
};

export const useApproveQuoteGit = () => {
    return useMutation(['approveQuoteGit'], async (request: ConfirmQuoteRequest): Promise<string> => {
        const response = await getQuoteApi().quoteGitConfirm('root', request);
        return response.data;
    });
};
