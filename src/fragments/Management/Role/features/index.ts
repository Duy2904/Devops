import { AnyObject } from 'antd/es/_util/type';
import isEmpty from 'lodash/isEmpty';

import { rootPaths } from '@src/routers/route';
import { TableParams } from '@src/types/SearchResponse';
import { RoleType } from '@src/types/TypeEnum';
import { sortPermissionsBy } from '@utils/defaultPermissions';

export const getURLFormNavigate = (type: RoleType) => {
    switch (type) {
        case RoleType.Agent:
            return rootPaths.roleAgentForm;
        case RoleType.Company:
            return rootPaths.roleCompanyForm;
    }
};

export const getURLListNavigate = (type: RoleType) => {
    switch (type) {
        case RoleType.Agent:
            return rootPaths.roleAgent;
        case RoleType.Company:
            return rootPaths.roleCompany;
    }
};

export const getList = (name: string, group: string[]) => {
    const findItem = group.find(y => y === name);

    if (isEmpty(findItem)) {
        group.push(name);
    }

    return group;
};

export const sortFunctionPermissions = (originalGroup: string[], sortGroup: string[]) => {
    sortPermissionsBy.forEach(item => {
        if (originalGroup.includes(item) && !sortGroup.includes(item)) {
            sortGroup.push(item);
        }
    });
    return sortGroup;
};

export const customTableParamsListAgent = (tableParams: TableParams<AnyObject>) => {
    if (isEmpty(tableParams.status)) {
        delete tableParams?.status;
    }

    if (isEmpty(tableParams.groupIds)) {
        delete tableParams?.groupIds;
    }

    return {
        ...tableParams,
        advancedSearch: {
            fields: ['name'],
            keyword: tableParams.keyword,
        },
        keyword: undefined,
        ...(tableParams.status ? { status: tableParams.status } : {}),
        ...(tableParams.groupIds ? { groupIds: tableParams.groupIds } : {}),
    };
};
