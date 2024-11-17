import { DepartmentDto, SearchDepartmentViewRequest } from '@sdk/tour-operations';

import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from './type';

export const mapSearchRequest = (params: TableParams<DepartmentDto>): SearchDepartmentViewRequest => {
    const request: SearchDepartmentViewRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        statuses: params.status,
        branchIds: params.branchIds,
    };
    const sorter = params.sorter as SorterResult<DepartmentDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = undefined;
    }
    return request;
};
