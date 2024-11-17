import { FilterValue, SorterResult } from 'antd/es/table/interface';

import { TablePaginationConfig } from 'antd';

export interface TableParams<BaseParamsDto> {
    pagination?: TablePaginationConfig;
    advancedFilter?: Record<string, FilterValue | null>;
    sorter?: SorterResult<BaseParamsDto> | SorterResult<BaseParamsDto>[];
    keyword?: string;
    createdOn?: Date;
    status?: string;
    tourId?: string;
    tourTypeId?: string;
    tourCategoryId?: string;
    departureLocationId?: string;
    destinationLocationId?: string;
    fromDate?: Date | null;
    toDate?: Date | null;
    includeIds?: string[];
    customerId?: string;
}
