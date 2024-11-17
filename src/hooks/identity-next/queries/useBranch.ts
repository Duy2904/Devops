import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import { useQuery } from 'react-query';

import { mapSearchRequest } from '@fragments/Management/Branch/Feature/mapSearchRequest';
import i18n from '@src/i18n';

import { GroupsIdentityApi } from '../apis';
import { BranchKey } from '../key-type';

export const useFetchBranchs = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsSearchBranch('hnh', mapSearchRequest(request));
        return response.data;
    };

    return useQuery({
        queryKey: [BranchKey.fetchBranchs, JSON.stringify(customKey)],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
    });
};

export const useFetchBranchDetail = (id: string) => {
    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsGetBranch(id, 'hnh');
        return response.data;
    };

    return useQuery({
        queryKey: [BranchKey.fetchBranchDetail, id],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const useFetchBranchStates = () => {
    const requestFn = async () => {
        const response = await GroupsIdentityApi().groupsGetBranchStates('hnh');
        const dataOpt =
            response.data.map(item => {
                const value = item.key ?? '';
                const label = item.key ? i18n.t('branchStatus.' + item.key) : '';
                return { value, label };
            }) ?? [];
        return dataOpt;
    };
    return useQuery({
        queryKey: [BranchKey.fetchState],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
