import { AccountApi, CreateAccountRequest, UpdateAccountRequest } from '@sdk/tour-operations';
import { useMutation, useQueryClient } from 'react-query';

import { AccountKey } from '../Features/key-type';
import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';

const accountApi = new AccountApi(undefined, AppConfig.ApiHost, getAxiosInstance());

export const useCreateAccount = () => {
    return useMutation({
        mutationKey: [AccountKey.createAccount],
        mutationFn: async (request: CreateAccountRequest) => {
            const response = await accountApi.accountCreate('root', request);
            return response.data;
        },
    });
};

export const useUpdateAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [AccountKey.updateAccount],
        mutationFn: async (updateRequest: UpdateAccountRequest) => {
            const response = await accountApi.accountUpdate('root', updateRequest);
            return response.data;
        },
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.updateContentSuccess'));
            queryClient.invalidateQueries([AccountKey.fetchAccount]);
        },
    });
};

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [AccountKey.deleteAccount],
        mutationFn: async (id: string) => {
            const response = await accountApi.accountDelete(id, 'root');
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([AccountKey.fetchAccounts]);
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.deleteContentSuccess'));
        },
    });
};
