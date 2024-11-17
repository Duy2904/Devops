import "./Sidebar.scss";

import { Avatar, Card, Flex, Layout, Menu, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { get } from "lodash";
import { PropsWithChildren, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { generateBrightColorFromString, getInitialsFromFullName } from "@/utils/commons";
import { useTranslation } from "react-i18next";
import useGetUserProfile from "@/query-hooks/queries/useGetUserProfile";

interface ISidebarProps extends PropsWithChildren {
  menuItems: ItemType[];
}

const { Sider } = Layout;

function Sidebar(props: ISidebarProps) {
  const { menuItems } = props;
  const { t } = useTranslation();
  const { data: userProfile } = useGetUserProfile();

  const location = useLocation();

  const subMenuActivating = useMemo(() => {
    const subMenu = menuItems.find((item) => {
      return item?.key === location.pathname;
    });
    if (subMenu) {
      return subMenu?.key;
    }
    return menuItems.reduce((result: any, item) => {
      const children = get(item, ["children"]) as ItemType[];
      if (!children) {
        return result;
      }
      const currentSubMenuItem = children.find((childItem) => childItem?.key === location.pathname);
      if (currentSubMenuItem) {
        return item?.key;
      }
      return result;
    }, "");
  }, [location, menuItems]);

  return (
    <Sider
      width={280}
      className="bg-white shadow-lg"
      theme={"light"}>
      <Flex
        className={"py-[40px]"}
        justify={"center"}>
        <img
          src={"https://hongngocha.com/wp-content/uploads/2023/11/LOGO-HNH-SLOGAN_-OL-01.png"}
          width={86}
          height={40}></img>
      </Flex>
      <Flex
        className={"px-[20px]"}
        justify={"center"}
        vertical>
        <Card
          className="bg-gray-50 w-full"
          styles={{
            body: {
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
            },
          }}>
          <Avatar
            style={{
              backgroundColor: generateBrightColorFromString(userProfile?.email ?? ""),
            }}
            size={50}
            src={userProfile?.imageUrl}
            className="flex-shrink-0">
            {getInitialsFromFullName(userProfile?.displayName ?? "")}
          </Avatar>
          <Flex
            className="ms-4"
            vertical>
            <Typography.Text className="font-medium text-[18px]">{userProfile?.displayName}</Typography.Text>
            <Typography.Text className="text-[#8c8c8c] text-[14px]">{t(userProfile?.role ?? "")}</Typography.Text>
          </Flex>
        </Card>
        <div className={"mt-[40px] dashboard-side-bar"}>
          <Menu
            className={"px-0 h-full !border-0"}
            items={menuItems}
            mode={"inline"}
            inlineIndent={12}
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={[subMenuActivating]}></Menu>
        </div>
      </Flex>
    </Sider>
  );
}

export default Sidebar;
