import { LiteAgentDto, SearchBranchesRequest } from '@sdk/identity-next/models';

import { AnyObject } from 'antd/es/_util/type';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from './type';
import isEmpty from 'lodash/isEmpty';

const responseFilterData = (status: string[]) => {
    const filtersParams: AnyObject[] = [];
    status.forEach(item => {
        filtersParams.push({
            field: 'branchState',
            operator: 'eq',
            value: item,
        });
    });
    return filtersParams;
};

export const mapSearchRequest = (params: TableParams<LiteAgentDto>): SearchBranchesRequest => {
    const filtersParams = responseFilterData(params.status ?? []);
    const request: SearchBranchesRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        advancedSearch: params.keyword
            ? {
                  fields: ['name'],
                  keyword: params.keyword,
              }
            : undefined,
        advancedFilter: !isEmpty(filtersParams)
            ? {
                  logic: 'or',
                  filters: filtersParams,
              }
            : undefined,
    };
    const sorter = params.sorter as SorterResult<LiteAgentDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = undefined;
    }
    return request;
};
