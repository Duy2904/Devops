import { FilterValue, SorterResult } from 'antd/es/table/interface';

import { AnyObject } from 'antd/es/_util/type';
import { TablePaginationConfig } from 'antd';

export interface ITableParamsType<BaseParamsDto> {
    pagination?: TablePaginationConfig;
    advancedFilter?: Record<string, FilterValue | null> | AnyObject;
    advancedSearch?: AnyObject;
    sorter?: SorterResult<BaseParamsDto> | SorterResult<BaseParamsDto>[];
    keyword?: string;
    createdOn?: Date;
    fromDate?: Date | null;
    toDate?: Date | null;
    statuses?: string[];
    tourId?: string;

    // Tour
    providers?: string[];
    tags?: string[];
    areaIds?: string[];
    regionIds?: string[];
    tourCategories?: string[];
    tourCategoryId?: string;
    departureLocationId?: string;
    destinationLocationId?: string;
    saleStartDate?: Date | null;
    saleEndDate?: Date | null;
    fromPrice?: number;
    toPrice?: number;
    routeId?: string;
}
