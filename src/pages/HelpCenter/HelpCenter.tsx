import { Image, Flex, Typography } from "antd";
import { Search } from "lucide-react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BlockMapType, PageValueType } from "react-notion";

import { ROUTES } from "@/routers/routes";
import globalNavigate from "@/utils/globalNavigate";
import { toRoute } from "@/utils";

import { SearchInput } from "./components/SearchInput";
import { Section } from "./components/Section";
import useCenterSupport, { getListPageByPageContent } from "./hooks/useCenterSupport";
import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROOT_NOTION_PAGE_ID } from "@/constants/center-support";

const { Text } = Typography;
export const HelpCenter: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = globalNavigate;
  const { currentPage } = useCenterSupport(ROOT_NOTION_PAGE_ID);

  const sections = useMemo(() => {
    return getListPageByPageContent(currentPage as unknown as BlockMapType);
  }, [currentPage]);

  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        className={`bg-[url('/support-header.svg')] bg-cover px-4 w-full pt-4 relative`}>
        <Flex
          justify="flex-start"
          className="w-full"
          align="center">
          <Flex flex={2}>
            <Flex
              className={"bg-white rounded-md px-2"}
              justify={"center"}>
              <Image
                preview={false}
                src={"https://hongngocha.com/wp-content/uploads/2023/11/LOGO-HNH-SLOGAN_-OL-01.png"}
                width={100}></Image>
            </Flex>
          </Flex>
          <Flex
            flex={1}
            justify="flex-end">
            <Link to={ROUTES.DASHBOARD}>
              <Flex align="center">
                <HomeFilled color="#1f1f1f" />
                <Text className="mx-1 font-light text-black hover:underline cursor-pointer">Back to Home</Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>

        <Flex
          vertical
          className="py-10"
          align="center">
          <Text className="pb-4 font-semibold text-2xl">Help & Support Center</Text>
          <Text className="pb-10 text-2xl text-black">{t("Hi, how can we help?")}</Text>

          <SearchInput
            className="flex-1 bg-[#fafafa] px-4 py-[5px] border-black/10 rounded-md min-w-[480px] min-h-[50px] text-black/70"
            prefix={<Search color="#999999" />}
            placeholder="Find anything: Change your trip, baggage..."
          />
        </Flex>
      </Flex>
      <Flex
        wrap="wrap"
        gap={20}
        className="py-8"
        justify="center">
        {sections.map((item) => {
          const { value } = item as unknown as { value: PageValueType };
          const title = value?.properties?.title?.[0] ?? "";
          const icon = value?.format?.page_icon;

          return (
            <Flex
              key={value?.id}
              onClick={() => navigate?.(toRoute(ROUTES.SUPPORT_SECTION, { sectionId: value?.id }))}>
              <Section
                title={title as string}
                icon={icon}
              />
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};
