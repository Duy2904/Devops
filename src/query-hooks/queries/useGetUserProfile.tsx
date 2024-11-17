import { useQuery } from "@tanstack/react-query";

import { ProfileDto } from "../../../sdk/tmc/index.ts";
import { getEmployeeApi } from "@/services/tmcSdk.ts";
import { authorizeByRoleUser } from "@/services/authorization.ts";
import { UserRole } from "@/constant/user.ts";
import msalInstance from "@/configs/authConfig.ts";

export const useGetUserProfile = () => {
  const activeAccount = msalInstance.getActiveAccount();
  return useQuery(
    ["useGetUserProfile"],
    async (): Promise<ProfileDto> => {
      const { data } = await getEmployeeApi().retrieveEmployeeProfile();
      authorizeByRoleUser(data?.role as UserRole[]);
      return data;
    },
    {
      enabled: !!activeAccount,
      staleTime: Infinity,
      retry: false,
    },
  );
};

export default useGetUserProfile;
