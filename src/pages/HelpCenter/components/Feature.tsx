import { Flex, Typography } from "antd";
import React, { useMemo } from "react";
import { BlockMapType } from "react-notion";
import { useParams } from "react-router-dom";

import { ROUTES } from "@/routers/routes";
import globalNavigate from "@/utils/globalNavigate";
import { toRoute } from "@/utils";

import useCenterSupport, { getListPageOfFeature } from "../hooks/useCenterSupport";
import { ChevronRight } from "lucide-react";

type FeatureProps = {
  featureId?: string;
};
const { Text } = Typography;
export const Feature: React.FC<FeatureProps> = ({ featureId }) => {
  const { sectionId } = useParams();
  const { navigate } = globalNavigate;
  const { title, currentPage } = useCenterSupport(featureId ?? "");

  const articles = useMemo(() => {
    return getListPageOfFeature(currentPage as unknown as BlockMapType);
  }, [currentPage]);

  return (
    <Flex
      vertical
      className="mx-14 w-full">
      <Text className="font-semibold text-base text-black/70">{title}</Text>
      <Flex
        vertical
        className="py-4">
        {articles.map((article) => {
          const pageTitle = article?.value?.properties?.title?.[0];
          return (
            <Flex
              key={article?.value?.id}
              align="center"
              className="border-0 py-4 border-b border-solid cursor-pointer"
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
              <Text className="flex-1 text-black">{pageTitle}</Text>
              <ChevronRight className="text-primary" />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
