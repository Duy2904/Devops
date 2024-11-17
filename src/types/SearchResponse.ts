import { TablePaginationConfig } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

import { TourScheduleStatus } from '../../sdk/tour-operations';

export interface TableParams<BaseParamsDto> {
    pagination?: TablePaginationConfig;
    advancedFilter?: Record<string, FilterValue | null> | AnyObject;
    advancedSearch?: AnyObject;
    sorter?: SorterResult<BaseParamsDto> | SorterResult<BaseParamsDto>[];
    keyword?: string;
    createdOn?: Date;
    status?: string[];
    tourId?: string;
    tourTypeId?: string;
    tourCategoryId?: string;
    departureLocationId?: string;
    destinationLocationId?: string;
    fromDate?: Date | null;
    toDate?: Date | null;
    includeIds?: string[];
    customerId?: string;
    customerIds?: string[];
    countryId?: string;
    hasUnpaidSaleOrders?: boolean;
    forQuote?: boolean;
    routeId?: string;
    iSMineData?: boolean;
    branchIds?: string[];
    agentStates?: string[];
    groupIds?: string[];
    groupId?: string;
    providers?: string[];
    tags?: string[];
    areaId?: string[];
    regionId?: string[];
    createdByIds?: string[];
}

export interface SearchTourFit<SearchTourSchedulesRequestOfTourSearchFitDto> {
    pagination?: TablePaginationConfig;
    advancedFilter?: AnyObject;
    sorter?:
        | SorterResult<SearchTourSchedulesRequestOfTourSearchFitDto>
        | SorterResult<SearchTourSchedulesRequestOfTourSearchFitDto>[];
    keyword?: string | null;
    createdOn?: Date;
    status?: TourScheduleStatus[] | null;
    tourId?: string;
    pageNumber?: number;
    pageSize?: number;
    fromDate?: Date | null;
    toDate?: Date | null;
    providers?: string[];
    tags?: string[];
}
