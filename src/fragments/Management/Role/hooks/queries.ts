import { AnyObject } from 'antd/es/_util/type';
import { SorterResult } from 'antd/es/table/interface';
import _, { isNil } from 'lodash';
import { useQuery } from 'react-query';

import { GroupsIdentityApi } from '@hooks/identity-next/apis';
import { GroupKey } from '@hooks/identity-next/key-type';
import { ActiveStatus, AgentApi, RoleApi, RoleDto, SearchRoleRequest } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { TableParams } from '@src/types/SearchResponse';
import { AppConfig } from '@utils/config';

export const AgentDetailApi = () => {
    return new AgentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetRole = (id: string) => {
    const fetchData = async () => {
        const response = await new RoleApi(undefined, AppConfig.ApiHost, getAxiosInstance()).roleGet(id, 'root');
        return response.data;
    };

    return useQuery(['getRole', id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const useGetRoleSearch = (groupId: string, request: AnyObject) => {
    request.groupId = groupId;
    const customKey = _.omit(request, 'pagination.total');
    const requestFn = async () => {
        const response = await new RoleApi(undefined, AppConfig.ApiHost, getAxiosInstance()).roleSearch(
            'root',
            request,
        );
        return response.data;
    };

    return useQuery({
        queryKey: ['getRoleSearch', JSON.stringify(customKey)],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        enabled: !!groupId,
    });
};

export const useGetListGroupAgent = (request: AnyObject, shoulCall?: boolean) => {
    const customKey = _.omit(request, 'pagination.total');
    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsSearchGroupsForTourOperations('hnh', request);
        return response.data;
    };

    return useQuery({
        queryKey: [GroupKey.getListGroupAgent, JSON.stringify(customKey)],
        queryFn: requestFn,
        enabled: shoulCall,
        refetchOnWindowFocus: false,
    });
};

export const mapSearchRequest = (params: TableParams<RoleDto>): SearchRoleRequest => {
    const request: SearchRoleRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
        advancedSearch: params.advancedSearch,
        advancedFilter: params.advancedFilter,
        ...(!isNil(params?.iSMineData) ? { iSMineData: params?.iSMineData } : {}),
        ...(params?.status ? { statuses: params?.status as ActiveStatus[] } : {}),
        ...(params?.groupIds ? { groupIds: params?.groupIds } : {}),
        ...(params?.groupId ? { groupId: params?.groupId } : {}),
        ...(params?.branchIds ? { branchIds: params?.branchIds } : {}),
    };

    const sorter = params.sorter as SorterResult<RoleDto>;

    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};
