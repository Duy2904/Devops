import { CreateRoleRequest, RoleApi, UpdateRoleRequest } from '@sdk/tour-operations';
import { useMutation, useQueryClient } from 'react-query';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';

const roleApi = new RoleApi(undefined, AppConfig.ApiHost, getAxiosInstance());

export const useCreateRole = () => {
    return useMutation(['createRole'], async (request: CreateRoleRequest) => {
        const response = await roleApi.roleCreate('root', request);
        return response;
    });
};

export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['updateRole'],
        mutationFn: async (request: UpdateRoleRequest) => {
            const response = await roleApi.roleUpdate('root', request);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['getRole']);
        },
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteRole'],
        mutationFn: async (id: string) => {
            const response = await roleApi.roleDelete(id, 'root');
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['getRoleSearch']);
        },
    });
};
