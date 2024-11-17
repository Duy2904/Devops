import { useGetGroupAgent } from '@hooks/identity-next/queries/useGroup';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useFetchAdminPermissions, useFetchRolePermissions } from '@hooks/identity-next/queries/useRole';
import { RoleType } from '@src/types/TypeEnum';

export const useGetListPermissionsDefault = (type: RoleType, roleGroupId?: string) => {
    const { data: personInfo } = useFetchPersonalIdentityInfo();

    const { data: listPermissionAdmin } = useFetchAdminPermissions(personInfo?.isGlobal ? type : RoleType.Agent);
    const { data: listRolePermissions } = useFetchRolePermissions(roleGroupId ?? '');
    const { data: dataAgent } = useGetGroupAgent(!personInfo?.isGlobal ? personInfo?.groups?.[0]?.groupId ?? '' : '');

    if (personInfo?.isGlobal && type === RoleType.Company) {
        return listPermissionAdmin;
    } else if (!personInfo?.isGlobal && type === RoleType.Company) {
        return dataAgent;
    } else {
        return listRolePermissions;
    }
};
