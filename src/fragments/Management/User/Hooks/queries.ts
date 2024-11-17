import { AccountApi, ActiveStatus } from '@sdk/tour-operations';

import { AccountKey } from '../Features/key-type';
import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import _ from 'lodash';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';
import { useQuery } from 'react-query';

const accountApi = new AccountApi(undefined, AppConfig.ApiHost, getAxiosInstance());

export const useGetAccountsSearch = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    const requestFn = async () => {
        const response = await accountApi.accountSearch('root', request);
        return response.data;
    };

    return useQuery({
        queryKey: [AccountKey.fetchAccounts, customKey],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!request.groupId,
    });
};

export const useFetchAccountDetail = (id: string) => {
    const requestFn = async () => {
        const response = await accountApi.accountGet(id, 'hnh');
        return response.data;
    };

    return useQuery({
        queryKey: [AccountKey.fetchAccount, id],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const getAccountStatus = () =>
    Object.values(ActiveStatus).map((key: string) => ({
        value: key,
        label: i18n.t(`accountStatus.${key}`),
    }));
