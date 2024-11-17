import {
    DebtReportApi,
    ExportRevenueReportRequest,
    SearchDebtReportViewDto,
    SearchDebtReportViewPaginationDto,
    SearchDebtReportViewRequest,
    SearchRevenueReportViewDto,
} from '@sdk/tour-operations';
import { currentPage, pageSize } from '@utils/filterSearch';
import { useMutation, useQuery } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '@src/types/SearchResponse';
import _ from 'lodash';
import dayjs from 'dayjs';
import { getAxiosInstance } from '@services/auth';

export const getAccountReceivableApi = () => {
    return new DebtReportApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchAccountsReceivable = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        ['fetchAccountsReceivable', JSON.stringify(customKey)],
        async (): Promise<SearchDebtReportViewPaginationDto> => {
            const response = await getAccountReceivableApi().debtReportSearch('root', mapSearchRequest(request));
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!request },
    );
};

export const useFetchCustomer = () => {
    const requestFn = async () => {
        const response = await getAccountReceivableApi().debtReportGetCustomer('root');
        return (
            response.data?.map(item => {
                const { id, name } = item;
                return { value: `${id}`, label: `${name}` };
            }) ?? []
        );
    };
    return useQuery(['FETCH_CUSTOMER'], requestFn, { refetchOnWindowFocus: false });
};

export const useFetchProvider = () => {
    const requestFn = async () => {
        const response = await getAccountReceivableApi().debtReportGetSOProviders(true, 'root');
        return (
            response.data?.map(item => {
                const { id, name } = item;
                return { value: `${id}`, label: `${name}` };
            }) ?? []
        );
    };
    return useQuery(['FETCH_PROVIDER'], requestFn, { refetchOnWindowFocus: false });
};

export const useExportExcel = () => {
    const fetchData = async (request: ExportRevenueReportRequest) => {
        const response = await getAccountReceivableApi().debtReportExport('root', request);

        return response.data;
    };

    return useMutation(['exportDataRevenueTourFit'], fetchData);
};

export const mapSearchRequest = (params: TableParams<SearchRevenueReportViewDto>): SearchDebtReportViewRequest => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().subtract(1, 'months').startOf('day').utc().toDate(),
        dayjs().endOf('day').utc().toDate(),
    );

    const sorter = params.sorter as SorterResult<SearchDebtReportViewDto>;

    const request: SearchDebtReportViewRequest = {
        pageNumber: params.pagination?.current ?? currentPage,
        pageSize: params.pagination?.pageSize ?? pageSize,
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        tourScheduleId: params.tourId,
        groupIds: params.groupIds,
        createdByIds: params.createdByIds,
        customerIds: params.customerIds,
        isAgent: true,
    };

    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};
