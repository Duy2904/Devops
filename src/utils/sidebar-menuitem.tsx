import { Flex, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import { PermissionWrapper } from "@/components/permissions/PermissionWrapper";
import { Permissions } from "@/constant/permission-list";

export function menuItemCustom(
  label: string,
  key: string,
  icon: React.ReactNode,
  children?: ItemType[],
  onClick = () => {},
  isOpenNewTab?: boolean,
) {
  if ((children && children.length > 0) || key === "") {
    return {
      label: (
        <Flex
          align={"center"}
          className={"h-full"}
          onClick={onClick}>
          {icon}
          <Typography.Text className={"ms-3"}>{label}</Typography.Text>
        </Flex>
      ),
      key,
      children,
    };
  }

  const openNewTabAttr = useMemo(() => {
    const attr: Record<string, string> = {};
    if (isOpenNewTab) {
      (attr["target"] = "_blank"), (attr["rel"] = "noopener noreferrer");
    }
    return attr;
  }, [isOpenNewTab]);
  return {
    label: (
      <PermissionWrapper permission={Permissions.TripRequestInfoView}>
        <NavLink
          to={key}
          className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
          {...openNewTabAttr}>
          <Flex
            align={"center"}
            className={"h-full"}>
            {icon}
            <Typography.Text className={"ms-3"}>{label}</Typography.Text>
          </Flex>
        </NavLink>
      </PermissionWrapper>
    ),
    key,
    children,
  };
}
