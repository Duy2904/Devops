import { Flex, Typography } from "antd";
import classNames from "classnames";
import React, { useMemo } from "react";
import { BlockMapType } from "react-notion";
import { useLocation, useParams } from "react-router-dom";

import { ROUTES } from "@/routers/routes";
import globalNavigate from "@/utils/globalNavigate";
import { toRoute } from "@/utils";

import { NotionRendererCustom } from "./components/Article";
import useCenterSupport, { getListPageOfFeature } from "./hooks/useCenterSupport";

export default function Article() {
  const { articleId } = useParams();
  const location = useLocation();
  const featureIdState = location?.state?.featureId;

  const featureId = useMemo(() => {
    return featureIdState;
  }, [featureIdState]);

  return (
    <Flex
      className="w-full"
      wrap="wrap-reverse">
      <Flex
        flex={1}
        className="pr-10 min-w-[280px]">
        <Feature
          featureId={featureId}
          activeId={articleId ?? ""}
        />
      </Flex>
      <Flex
        flex={4}
        className="mx-4 w-full">
        <NotionRendererCustom
          pageId={articleId ?? ""}
          currentFeature={featureId}
        />
      </Flex>
    </Flex>
  );
}

const { Text } = Typography;
export const Feature: React.FC<{ featureId: string; activeId: string }> = ({ featureId, activeId }) => {
  const { sectionId } = useParams();
  const { navigate } = globalNavigate;
  const { title, currentPage } = useCenterSupport(featureId ?? "");

  const articles = useMemo(() => {
    return getListPageOfFeature(currentPage as unknown as BlockMapType);
  }, [currentPage]);

  return (
    <Flex
      vertical
      className="py-20">
      <Text className="font-semibold text-black/70 text-sm">{title}</Text>
      <Flex
        vertical
        className="py-4">
        {articles.map((article) => {
          const pageTitle = article?.value?.properties?.title?.[0];

          return (
            <Text
              className={classNames("border-0 py-4 border-b border-solid text-sm hover:underline cursor-pointer", {
                "text-blue": activeId == article?.value?.id,
                "text-black/60 ": activeId != article?.value?.id,
              })}
              key={article?.value?.id}
              onClick={() =>
                navigate?.(
                  toRoute(ROUTES.SUPPORT_ARTICLE, {
                    sectionId: sectionId,
                    articleId: article?.value?.id,
                  }),
                  {
                    state: {
                      featureId,
                    },
                  },
                )
              }>
              {pageTitle}
            </Text>
          );
        })}
      </Flex>
    </Flex>
  );
};
