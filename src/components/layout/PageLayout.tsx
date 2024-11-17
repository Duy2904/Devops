import { Breadcrumb, Flex, Layout } from "antd";
import { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/es/breadcrumb/Breadcrumb";
import { capitalize, upperCase } from "lodash";
import { PropsWithChildren, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { IconHome } from "@/components/common/SvgIcon";
import Sidebar from "@/components/layout/Sidebar";
import { RightOutlined } from "@ant-design/icons";

import type { GetProp, MenuProps } from "antd";
import { LanguageSwitch } from "../common/LanguageSwitch";
import { t } from "i18next";
const { Content } = Layout;

type MenuItem = GetProp<MenuProps, "items">[number];

interface IBreadCrumbItem {
  title: string;
  href: string;
}
interface ISidebarProps extends PropsWithChildren {
  menuItems: MenuItem[];
}

const isValidID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

const getPenultimateSegment = (pathname: string): string => {
  const segments = pathname.split("/");
  if (segments.length < 2) {
    return ""; // Not enough segments to have a penultimate one
  }
  return segments[segments.length - 2];
};

const getBreadCrumbItems = (pathname: string): IBreadCrumbItem[] => {
  const allItemInUrl = pathname.split("/");
  const penultimateSegment = getPenultimateSegment(pathname);

  const itemInBreadCrumb = allItemInUrl
    .map((item, itemIdx) => {
      const href = allItemInUrl
        .filter((urlItem, urlItemIdx) => {
          if (urlItemIdx <= itemIdx) {
            return urlItem;
          }
        })
        .join("/");

      // If the item is an ID, change the title to suitably describe the page
      const title = isValidID(item)
        ? `${capitalize(penultimateSegment.split("-").join(" "))} detail`
        : capitalize(item.split("-").join(" "));

      return {
        title,
        href: `/${href}`,
      };
    })
    .filter((item, idx) => {
      if (idx > 0) return item;
      else {
        return <IconHome></IconHome>;
      }
    });
  return itemInBreadCrumb;
};

const getBreadCrumbItemsRender = (route: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>) => {
  if (!route.title) return null;
  if (upperCase(`${route.title}`) === upperCase("HNH")) {
    return <IconHome></IconHome>;
  }
  return (
    <Link
      to={route.href ?? ""}
      className={`${route.href === window.location.pathname ? "!text-black font-bold" : ""}`}>
      {t(route.title.toString())}
    </Link>
  );
};

function PageLayout(props: ISidebarProps) {
  const { children, menuItems = [] } = props;

  const { pathname } = useLocation();
  const [breadcrumbItems, setBreadCrumbItem] = useState<IBreadCrumbItem[]>();

  useEffect(() => {
    setBreadCrumbItem(getBreadCrumbItems(pathname));
  }, [pathname]);

  return (
    <Layout className={"min-h-screen"}>
      <Sidebar menuItems={menuItems}></Sidebar>

      <Content className={"min-h-[100%] py-[20px] px-[30px] xl:py-[40px] xl:px-[64px] bg-[#fafafa]"}>
        <Flex
          justify="flex-end"
          className="p-2">
          <LanguageSwitch />
        </Flex>
        <Breadcrumb
          className={"hnh-breadcrumb"}
          separator={<RightOutlined />}
          items={breadcrumbItems}
          itemRender={getBreadCrumbItemsRender}></Breadcrumb>
        <Content>
          <Flex>{children}</Flex>
        </Content>
      </Content>
    </Layout>
  );
}

export default PageLayout;
