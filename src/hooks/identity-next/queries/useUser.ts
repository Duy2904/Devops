import { RoleDto, UserDetailsDto } from "@sdk/identity-next/models";

import { UserIdentityApi } from "../apis";
import { UserKey } from "../key-type";
import { useQuery } from "react-query";

export const useFetchRoleUser = (id: string, data: UserDetailsDto) => {
    const groupId = data.groups?.[0]?.groupId;
    const requestFn = async (): Promise<RoleDto[]> => {
        const response = await UserIdentityApi().usersGetRoles(id, groupId, id);
        return response.data;
    }

    return useQuery({
        queryKey: [UserKey.fetchUserRole],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
    })
}