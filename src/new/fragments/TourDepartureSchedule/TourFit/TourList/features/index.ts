import { SearchTourFitRequestOfTourSearchFitViewDto, TourScheduleDto, TourScheduleStatus } from '@sdk/tour-operations';

import Format from '@utils/format';
import { ITableParamsType } from '@src/new/shared/types/Search';
import { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { isEmptyParams } from '@src/new/shared/utils/validations';

export const mapSearchRequest = (params: ITableParamsType<TourScheduleDto>) => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().startOf('day').utc().toDate(),
        dayjs().add(3, 'months').endOf('day').utc().toDate(),
    );

    const advancedSearchKeyword = {
        fields: ['tourCode', 'name', 'routeName'],
        keyword: params.keyword,
    };

    const request: SearchTourFitRequestOfTourSearchFitViewDto = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
        saleStartDate: params.saleStartDate,
        saleEndDate: params.saleEndDate,
        departureLocationId: params.departureLocationId,
        destinationLocationId: params.destinationLocationId,
        fromPrice: params.fromPrice,
        toPrice: params.toPrice,
        statuses: !params.statuses ? [TourScheduleStatus.SalesOpen] : (params.statuses as TourScheduleStatus[]),
        ...isEmptyParams('tourCategories', params.tourCategories),
        ...isEmptyParams('advancedFilter', params.advancedFilter),
        ...isEmptyParams('advancedSearch', advancedSearchKeyword),
        ...isEmptyParams('providers', params.providers),
        ...isEmptyParams('tags', params.tags),
        ...isEmptyParams('areaIds', params.areaIds),
        ...isEmptyParams('regionIds', params.regionIds),
    };

    const sorter = params.sorter as SorterResult<TourScheduleDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }

    return request;
};
