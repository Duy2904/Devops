import { SearchTourSchedulesRequestOfTourSearchGitDto, TourGitDto, TourScheduleStatus } from '@sdk/tour-operations';

import Format from '@utils/format';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '@src/types/SearchResponse';
import dayjs from 'dayjs';

export const mapSearchRequest = (params: TableParams<TourGitDto>) => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().startOf('day').utc().toDate(),
        dayjs().add(3, 'months').endOf('day').utc().toDate(),
    );
    const request: SearchTourSchedulesRequestOfTourSearchGitDto = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        includeIds: params.includeIds,
        tourCategoryId: params.tourCategoryId,
        departureLocationId: params.departureLocationId,
        destinationLocationId: params.destinationLocationId,
        status: params.status ? (params.status as TourScheduleStatus[]) : [],
        forQuote: params.forQuote,
    };

    const sorter = params.sorter as SorterResult<TourGitDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};
