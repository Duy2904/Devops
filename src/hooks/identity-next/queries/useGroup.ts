import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import { useQuery } from 'react-query';

import i18n from '@src/i18n';

import { GroupsIdentityApi } from '../apis';
import { GroupKey } from '../key-type';

export const useGetGroupBranchs = () => {
    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsGetBranches('hnh');
        const data =
            response?.data?.map(x => {
                const { id, name } = x;
                return { value: `${id}`, label: `${name}` };
            }) ?? [];

        return data;
    };

    return useQuery({
        queryKey: [GroupKey.getGroupBranchs],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
    });
};

export const useGetGroupDetail = (id: string) => {
    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsGetById(id, 'hnh');
        return response.data;
    };

    return useQuery({
        queryKey: [GroupKey.getGroupDetail],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!id,
        cacheTime: 0,
    });
};

export const useGetGroupAgent = (id: string) => {
    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsGetAgent(id, 'hnh');
        return response.data;
    };

    return useQuery({
        queryKey: [GroupKey.getGroupAgent],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!id,
        cacheTime: 0,
    });
};

export const useGetListGroupAgent = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');

    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsSearchGroupsForTourOperations('hnh', request);
        return response.data;
    };

    return useQuery({
        queryKey: [GroupKey.getListGroupAgent, JSON.stringify(customKey)],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });
};

export const useFetchAgentStates = () => {
    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsGetAgentStates('hnh');
        const dataOpt =
            response.data.map(item => {
                const value = item.key ?? '';
                const label = item.key ? i18n.t('agentStatus.' + item.key) : '';
                return { value, label };
            }) ?? [];
        return dataOpt;
    };
    return useQuery({
        queryKey: [GroupKey.fetchAgentState],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
