import { AgentDto, CreateBranchRequest, UpdateBranchRequest } from '@sdk/identity-next/models';
import { useMutation, useQueryClient } from 'react-query';

import { BranchKey } from '../key-type';
import { GroupsIdentityApi } from '../apis';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';

export const useCreateBranch = () => {
    return useMutation({
        mutationKey: [BranchKey.createBranch],
        mutationFn: async (createRequest: CreateBranchRequest): Promise<AgentDto> => {
            const response = await GroupsIdentityApi().groupsAddBranch('hnh', createRequest);
            return response.data;
        },
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.createContentSuccess'));
        },
    });
};

export const useUpdateBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [BranchKey.updateBranch],
        mutationFn: async (data: { id: string; updateRequest: UpdateBranchRequest }): Promise<AgentDto> => {
            const response = await GroupsIdentityApi().groupsUpdateBranch(data.id, 'hnh', data.updateRequest);
            return response.data;
        },
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.updateContentSuccess'));
            queryClient.invalidateQueries([BranchKey.fetchBranchDetail]);
        },
    });
};

export const useDeleteBranch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [BranchKey.deleteBranch],
        mutationFn: async (id: string) => {
            const response = await GroupsIdentityApi().groupsDeleteBranch(id, 'hnh');
            return response.data;
        },
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.deleteContentSuccess'));
            queryClient.invalidateQueries([BranchKey.fetchBranchs]);
        },
    });
};
