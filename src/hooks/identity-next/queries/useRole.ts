import { useQuery } from 'react-query';

import { RoleType } from '@src/types/TypeEnum';

import { RolesIdentityApi } from '../apis';
import { RoleKey } from '../key-type';

export const useFetchAgentPermissions = (type: RoleType) => {
    const requestFn = async () => {
        const response = await RolesIdentityApi().rolesGetDefaultAgentPermissions('hnh');
        return response.data;
    };

    return useQuery({
        queryKey: [RoleKey.fetchAgentPermissions],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: type === RoleType.Agent,
    });
};

export const useFetchAdminPermissions = (type: RoleType) => {
    const requestFn = async () => {
        const response = await RolesIdentityApi().rolesGetDefaultTourAdminPermissions('hnh');
        return response.data;
    };

    return useQuery({
        queryKey: [RoleKey.fetchAdminPermissions],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: type === RoleType.Company,
    });
};

export const useFetchRolePermissions = (roleId: string) => {
    const requestFn = async () => {
        const response = await RolesIdentityApi().rolesGetRolePermissions(roleId, 'hnh');
        return response.data;
    };

    return useQuery({
        queryKey: [RoleKey.fetchRolePermissions, roleId],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!roleId,
    });
};
