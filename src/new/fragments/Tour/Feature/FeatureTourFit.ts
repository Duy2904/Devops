import {
    SearchTourSchedulesRequestOfTourSearchFitDto,
    TourScheduleDto,
    TourScheduleStatus,
} from '@sdk/tour-operations';

import Format from '@utils/format';
import { ITableParamsType } from '@src/new/shared/types/Search';
import { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';

export const mapSearchRequest = (params: ITableParamsType<TourScheduleDto>) => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().startOf('day').utc().toDate(),
        dayjs().add(3, 'months').endOf('day').utc().toDate(),
    );

    const advancedSearchKeyword = {
        fields: ['TourCode', 'Name'],
        keyword: params.keyword,
    };

    const request: SearchTourSchedulesRequestOfTourSearchFitDto = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        tourCategoryId: params.tourCategoryId,
        departureLocationId: params.departureLocationId,
        destinationLocationId: params.destinationLocationId,
        status: params.statuses ? (params.statuses as TourScheduleStatus[]) : [],
        advancedSearch: advancedSearchKeyword,
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
