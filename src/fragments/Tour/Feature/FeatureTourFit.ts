import {
    SearchTourSchedulesRequestOfTourSearchFitDto,
    TourScheduleDto,
    TourScheduleStatus,
} from '@sdk/tour-operations';

import Format from '@utils/format';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '@src/types/SearchResponse';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';

export const mapSearchRequest = (params: TableParams<TourScheduleDto>) => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().startOf('day').utc().toDate(),
        dayjs().add(3, 'months').endOf('day').utc().toDate(),
    );

    const advancedSearchKeyword = {
        logic: 'or',
        filters: [
            {
                field: 'tourCode',
                operator: 'contains',
                value: params.keyword ?? '',
            },
            {
                field: 'name',
                operator: 'contains',
                value: params.keyword ?? '',
            },
        ],
    };

    const request: SearchTourSchedulesRequestOfTourSearchFitDto = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        includeIds: params.includeIds,
        tourCategoryId: params.tourCategoryId,
        departureLocationId: params.departureLocationId,
        destinationLocationId: params.destinationLocationId,
        customerId: params.customerId,
        status: params.status ? params.status as TourScheduleStatus[] : [],
        hasUnpaidSaleOrders: params.hasUnpaidSaleOrders,
        advancedFilter: !isEmpty(params.advancedFilter) ? params?.advancedFilter : advancedSearchKeyword,
        forQuote: params.forQuote,
        routeId: params.routeId,
        providers: params.providers || [],
        tags: params.tags || [],
    };

    const sorter = params.sorter as SorterResult<TourScheduleDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }

    return request;
};
