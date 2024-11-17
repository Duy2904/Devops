import {
    ExportRevenueReportRequest,
    RevenueReportApi,
    SearchQuoteDto,
    SearchRevenueReportViewDto,
    SearchRevenueReportViewPaginationDto,
    SearchRevenueReportViewRequest,
} from '@sdk/tour-operations';
import { useMutation, useQuery } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '@src/types/SearchResponse';
import { TourNatureType } from '@src/types/TypeEnum';
import _ from 'lodash';
import dayjs from 'dayjs';
import { getAxiosInstance } from '@services/auth';

export const getRevenueApi = () => {
    return new RevenueReportApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchRevenueTourFitCollab = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        ['fetchRevenueTourFitCollab', JSON.stringify(customKey)],
        async (): Promise<SearchRevenueReportViewPaginationDto> => {
            const response = await getRevenueApi().revenueReportSearch('root', mapSearchRequest(request));
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!request },
    );
};

export const useExportExcel = () => {
    const fetchData = async (request: ExportRevenueReportRequest) => {
        const response = await getRevenueApi().revenueReportExport('root', request);

        return response.data;
    };

    return useMutation(['exportDataRevenueTourFitCollab'], fetchData);
};

export const useFetchProviderRevenueCollab = () => {
    const requestFn = async () => {
        const response = await getRevenueApi().revenueReportGetSOProviders(TourNatureType.SendGuest, 'root');
        return (
            response.data?.map(item => {
                const { id, name } = item;
                return { value: `${id}`, label: `${name}` };
            }) ?? []
        );
    };
    return useQuery(['FETCH_PROVIDERS_REVENUE_COLLAB'], requestFn, {
        refetchOnWindowFocus: false,
    });
};

export const useSendCustomerRevenueCollab = () => {
    const requestFn = async (groupIds: string[]) => {
        const fetchPromises = groupIds.map(id =>
            getRevenueApi().revenueReportGetCreatedBy(TourNatureType.SendGuest, id, 'root'),
        );
        const ItemsPromiseAll = await Promise.all(fetchPromises);

        return ItemsPromiseAll.flatMap(response =>
            response.data.map(item => ({
                value: `${item.id}`,
                label: `${item.name}`,
            })),
        );
    };
    return useMutation(['FETCH_SEND_CUSTOMER_REVENUE_COLLAB'], requestFn);
};

export const mapSearchRequest = (params: TableParams<SearchRevenueReportViewDto>): SearchRevenueReportViewRequest => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().subtract(3, 'month').startOf('day').utc().toDate(),
        dayjs().endOf('day').utc().toDate(),
    );

    const sorter = params.sorter as SorterResult<SearchQuoteDto>;

    const request: SearchRevenueReportViewRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        tourScheduleId: params.tourId,
        tourNature: TourNatureType.SendGuest,
        groupIds: params.groupIds,
        createdByIds: params.createdByIds,
    };

    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};
