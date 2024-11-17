import { DropdownDto, RoleApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { RolesKey } from './key-type';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

const roleApi = new RoleApi(undefined, AppConfig.ApiHost, getAxiosInstance());

export const useFetchDropdownRoles = (ownerId: string | undefined, groupId: string | undefined) => {
    const requestFn = async () => {
        const response = await roleApi.roleGetDropdown(ownerId ?? '', groupId ?? '', 'root');
        const optionRes = response.data.map((item: DropdownDto) => {
            return { value: `${item.id}`, label: `${item.name}` };
        });
        return optionRes;
    };

    return useQuery({
        queryKey: [RolesKey.fetchDropdownRoles, groupId, ownerId],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!groupId,
    });
};
