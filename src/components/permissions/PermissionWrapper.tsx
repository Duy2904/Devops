import { useUserPermissionsStore } from "@/store/useUserPermissionsStore";

type PermissionWrapperProps = {
  permission: string;
  children: React.ReactNode;
};
export const PermissionWrapper: React.FC<PermissionWrapperProps> = ({ permission, children }) => {
  const userPermissions = useUserPermissionsStore((state) => state.permissions);

  const hasPermissionToRender = userPermissions.includes(permission);

  if (!hasPermissionToRender) {
    return null;
  }

  return <>{children}</>;
};
