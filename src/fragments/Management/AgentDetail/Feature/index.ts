import { AnyObject } from 'antd/es/_util/type';
import { SorterResult } from 'antd/es/table/interface';
import isEmpty from 'lodash/isEmpty';

import { CreateAgentPermissionsRequest } from '@sdk/identity-next/models';
import { FilterLogicEnum, FilterOperatorEnum } from '@src/types/FilterOperatorEnum';
import { TableParams } from '@src/types/SearchResponse';
import { convertCheckedFormToArray } from '@utils/formHelper';

export const checkRegexCode = (code: string) => {
    const regex = /[^A-Z0-9]/;
    return regex.exec(code);
};

export const checkRegexSpace = (code: string) => {
    const regex = /\s/;
    return regex.exec(code);
};

export const getRequest = (id: string, values: AnyObject) => {
    const listPermission = values.permissions;
    const listPermissions = convertCheckedFormToArray(listPermission);
    const request: CreateAgentPermissionsRequest = {
        groupId: id,
        permissions: listPermissions,
    };
    return isEmpty(listPermissions) ? {} : request;
};

export const getList = (name: string, group: string[]) => {
    const findItem = group.find(y => y === name);

    if (isEmpty(findItem)) {
        group.push(name);
    }

    return group;
};

export const mapSearchRequest = (params: TableParams<AnyObject>): AnyObject => {
    const request: AnyObject = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        agentStates: params.agentStates,
        advancedSearch: params.advancedSearch,
        advancedFilter: params.advancedFilter,
        orderBy: ['CreatedOn Desc'],
    };

    const sorter = params.sorter as SorterResult<AnyObject>;

    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    }

    return request;
};

export const customTableParamsListAgent = (tableParams: TableParams<AnyObject>) => {
    const arrFilter: AnyObject[] = [];
    const filterAgentAccount = tableParams?.advancedFilter?.agentAccountStatus?.map((item: string) => ({
        field: 'accountCreation',
        operator: FilterOperatorEnum.eq,
        value: item === 'true',
    }));

    if (!isEmpty(filterAgentAccount)) {
        arrFilter.push({
            logic: FilterLogicEnum.or,
            filters: filterAgentAccount,
        });
    }

    if (tableParams?.advancedFilter?.branchId) {
        arrFilter.push({
            field: 'branchId',
            operator: FilterOperatorEnum.contains,
            value: tableParams?.advancedFilter?.branchId ?? '',
        });
    }

    if (isEmpty(arrFilter)) {
        delete tableParams?.advancedFilter;
    }

    return {
        ...tableParams,
        advancedSearch: {
            fields: ['code', 'name', 'personInChargeLastName', 'personInChargeFirstName'],
            keyword: tableParams.keyword,
        },
        keyword: undefined,
        ...(!isEmpty(arrFilter)
            ? {
                  advancedFilter: {
                      logic: FilterLogicEnum.and,
                      filters: arrFilter,
                  },
              }
            : {}),
    };
};
