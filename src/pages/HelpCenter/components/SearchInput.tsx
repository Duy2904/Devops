import { Button, Card, Empty, Flex, Input, InputProps, Spin, Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";
import classNames from "classnames";
import { debounce, toArray } from "lodash";
import React, { useEffect, useState } from "react";

import { ROUTES } from "@/routers/routes";
import globalNavigate from "@/utils/globalNavigate";
import { toRoute } from "@/utils";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

import { useSearchPageByKeyword } from "../hooks/useCenterSupport";
import { sliceString } from "@/utils/string";

const { Text } = Typography;
function highlightText(text: string, searchKey: string) {
  const regex = new RegExp(`(${searchKey})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === searchKey.toLowerCase() ? (
      <span
        key={index}
        style={{ backgroundColor: "yellow" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export const HighlightedText: React.FC<{ text: string; searchKey: string } & TextProps> = ({
  text,
  searchKey,
  ...props
}) => {
  return <Text {...props}>{highlightText(text, searchKey)}</Text>;
};

type SearchInputProps = InputProps & {};
export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { navigate } = globalNavigate;
  const [handlerText, setHandlerText] = useState("");

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const debouced = debounce(() => setSearchText(handlerText), 250);
    debouced();

    return () => {
      debouced.cancel();
    };
  }, [handlerText]);
  const { data: pagesBySearchKey, isLoading: isSearching } = useSearchPageByKeyword(searchText);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        value={handlerText}
        prefix={
          <SearchOutlined
            style={{
              color: "#1677FF",
              fontSize: 18,
            }}
          />
        }
        className={classNames("min-h-[40px]", { "rounded-b-none": handlerText }, `${props.className}`)}
        onChange={(e) => setHandlerText(e.target.value)}
      />

      {handlerText && (
        <div className="z-50 absolute bg-white shadow-lg w-full max-h-[60vh] overflow-y-scroll">
          <div className="bg-white/40 shadow-lg px-2 pb-10 border border-t-0 border-black/25 border-solid rounded-lg rounded-t-none">
            {handlerText && (
              <Flex
                justify="space-between"
                className="w-full"
                align="center">
                <Text className="text-black/50 text-sm">{pagesBySearchKey?.length} results found</Text>
                <Button
                  onClick={() => setHandlerText("")}
                  type="text"
                  className="flex justify-center items-center"
                  icon={<CloseOutlined />}
                />
              </Flex>
            )}
            {isSearching && (
              <Flex justify="center">
                <Spin spinning />
              </Flex>
            )}
            {pagesBySearchKey?.length === 0 && (
              <Empty description="We can't find any article match with your search..." />
            )}
            <Flex
              vertical
              className="py-4"
              gap={4}>
              {(toArray(pagesBySearchKey) ?? [])?.map((page) => {
                const type = page?.type;
                const content = page?.properties?.title?.[0].toString().replace(",b", "");

                // @ts-ignore
                const pageTitle = page?.page_title?.title?.[0]?.toString();
                return (
                  <Card
                    key={page.id}
                    styles={{
                      body: {
                        padding: "4px 12px",
                      },
                    }}
                    className="my-1"
                    onClick={() => {
                      type === "page"
                        ? navigate?.(toRoute(ROUTES.SUPPORT_ARTICLE, { articleId: page.id }))
                        : navigate?.(toRoute(ROUTES.SUPPORT_ARTICLE, { articleId: page.parent_id }));
                      setHandlerText("");
                    }}>
                    <Flex
                      justify="space-between"
                      className="w-full"
                      vertical>
                      {type !== "page" && (
                        <Flex align="flex-start">
                          <i className="mt-1 text-black/60 text-sm fa-book fa-solid" />
                          <Text className="ml-1 font-Montserrat font-semibold">{pageTitle ?? page?.parent_id}</Text>
                        </Flex>
                      )}
                      <Flex>
                        {type == "page" && <i className="mt-1 mr-1 text-black/60 text-sm fa-book fa-solid" />}
                        <HighlightedText
                          text={type === "page" ? content : `${sliceString(content, 100)}`}
                          searchKey={handlerText}
                          className={classNames({
                            "font-semibold  font-Montserrat": type === "page",
                            "text-black/40 pl-2 text-sm": type !== "page",
                          })}
                        />
                      </Flex>
                    </Flex>
                  </Card>
                );
              })}
            </Flex>
          </div>
        </div>
      )}
    </div>
  );
};
