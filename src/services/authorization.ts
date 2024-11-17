import { intersection } from "lodash";

import { VITE_LOGOUT_REDIRECT_URI } from "@/configs";
import msalInstance from "@/configs/authConfig";
import { UserRole } from "@/constant/user";

export const handleLogout = () => {
  const currentAccount = msalInstance.getActiveAccount();
  msalInstance.logoutRedirect({ account: currentAccount, postLogoutRedirectUri: VITE_LOGOUT_REDIRECT_URI });
};

export const isAuthorized = (userRoles: UserRole[]): boolean => {
  const acceptedRoles = [UserRole.Booker];
  return intersection(userRoles, acceptedRoles).length > 0;
};

export const authorizeByRoleUser = (role: UserRole[]) => {
  const authorized = isAuthorized(role);
  if (!authorized) handleLogout();
};
