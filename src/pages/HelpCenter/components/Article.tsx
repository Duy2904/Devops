import "react-notion/src/styles.css";

import { Card, Flex, Typography } from "antd";
import { BlockMapType, NotionRenderer, PageValueType } from "react-notion";
import { useParams } from "react-router-dom";

import { ROUTES } from "@/routers/routes";
import { toRoute } from "@/utils";

import globalNavigate from "../../../utils/globalNavigate";
import { useGetPageContentById } from "../hooks/useCenterSupport";

type NotionRendererCustomProps = {
  pageId: string;
  currentFeature?: string;
};

const { Text } = Typography;
export const NotionRendererCustom: React.FC<NotionRendererCustomProps> = ({ pageId, currentFeature }) => {
  const { sectionId } = useParams();
  const { navigate } = globalNavigate;
  const { data } = useGetPageContentById(pageId);

  const handleNavigateForPage = (pageId: string) => {
    if (navigate) {
      navigate(toRoute(ROUTES.SUPPORT_ARTICLE, { sectionId, articleId: pageId }), {
        state: {
          featureId: currentFeature,
        },
      });
    }
  };

  const handleNavigate = (event: React.MouseEvent<HTMLSpanElement>, pageId: string) => {
    event.preventDefault();
    if (navigate) {
      navigate(toRoute(ROUTES.SUPPORT_ARTICLE, { sectionId, articleId: pageId }), {
        state: {
          featureId: currentFeature,
        },
      });
    }
  };

  return (
    <>
      {data && (
        <NotionRenderer
          mapImageUrl={(e) => e}
          blockMap={data as unknown as BlockMapType}
          fullPage
          hideHeader
          customDecoratorComponents={{
            a: ({ renderComponent, decoratorValue }) => (
              <Text
                onClick={(e) => {
                  handleNavigate(e, decoratorValue?.split("?")?.[0].replace("/", ""));
                }}>
                {renderComponent()}
              </Text>
            ),
          }}
          customBlockComponents={{
            page: ({ blockValue }) => {
              const pageValue = blockValue as PageValueType;
              return (
                <div className="my-4">
                  <Card
                    bodyStyle={{
                      padding: 8,
                      paddingRight: 12,
                    }}>
                    <Flex
                      justify="space-between"
                      align="center">
                      <Typography.Text className="text-xl">{pageValue?.format?.page_icon}</Typography.Text>

                      <Typography.Text
                        onClick={() => handleNavigateForPage(blockValue.id)}
                        className="flex-1 ml-2 text-base text-black/70">
                        {blockValue.properties?.page_icon} {blockValue?.properties?.title?.[0]?.[0]}
                      </Typography.Text>
                      <i className="fa-arrow-right text-primary text-sm fa-solid" />
                    </Flex>
                  </Card>
                </div>
              );
            },
          }}
        />
      )}
    </>
  );
};
