import { useMutation, useQueryClient } from 'react-query';

import { AgentDto, CreateAgentPermissionsRequest, CreateAgentRequest } from '@sdk/identity-next/models';
import { toastSuccess } from '@components/ui/Toast/Toast';
import i18n from '@src/i18n';

import { GroupsIdentityApi } from '../apis';
import { GroupKey } from '../key-type';

export const useCreateGroupAgent = () => {
    return useMutation({
        mutationKey: GroupKey.createGroupAgent,
        mutationFn: async (createAgentRequest: CreateAgentRequest): Promise<AgentDto> => {
            const response = await GroupsIdentityApi().groupsAddAgent('hnh', createAgentRequest);
            return response.data;
        },
        onSuccess: () => {
            return toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.createContentSuccess'));
        },
    });
};

export const useUpdateGroupAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: GroupKey.updateGroupAgent,
        mutationFn: async ({
            id,
            updateAgentRequest,
        }: {
            id: string;
            updateAgentRequest: CreateAgentRequest;
        }): Promise<AgentDto> => {
            const response = await GroupsIdentityApi().groupsUpdateAgent(id, 'hnh', updateAgentRequest);
            return response.data;
        },
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.updateContentSuccess'));
            queryClient.invalidateQueries([GroupKey.getGroupAgent]);
        },
    });
};

export const useAddPermissionGroupAgent = () => {
    return useMutation({
        mutationKey: GroupKey.createGroupAgentPermissions,
        mutationFn: async (request: CreateAgentPermissionsRequest) => {
            const response = await GroupsIdentityApi().groupsAddAgentPermissions('hnh', request);
            return response.data;
        },
    });
};

export const useUpdatePermissionGroupAgent = () => {
    return useMutation({
        mutationKey: GroupKey.updateGroupAgentPermissions,
        mutationFn: async ({ id, request }: { id: string; request: CreateAgentPermissionsRequest }) => {
            const response = await GroupsIdentityApi().groupsUpdateAgentPermissions(id, 'hnh', request);
            return response.data;
        },
    });
};

export const useDeleteGroupAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [GroupKey.deleteGroupAgent],
        mutationFn: async (id: string) => {
            const response = await GroupsIdentityApi().groupsDeleteAgent(id, 'hnh');
            return response.data;
        },
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.deleteContentSuccess'));
            queryClient.invalidateQueries([GroupKey.getListGroupAgent]);
        },
    });
};
