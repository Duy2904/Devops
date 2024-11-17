import { isEmpty } from "lodash";
import { useMemo, useState } from "react";
import { BlockMapType, BlockValueType, PageValueType } from "react-notion";

import { useQuery } from "@tanstack/react-query";

import { getNotionApi } from "../../../services/tmcSdk";

const notionApi = getNotionApi();

export const useGetPageContentById = (id?: string) => {
  return useQuery({
    queryKey: ["get-content", id],
    queryFn: async () => {
      const { data } = await notionApi.getPage(id ?? "");
      return data;
    },
    enabled: !["", ":sectionId"].includes(id ?? ""),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export const useSearchPageByKeyword = (keyword: string) => {
  return useQuery({
    queryKey: ["get-page-by-keyword", keyword],
    queryFn: async () => {
      const { data } = await notionApi.searchTextInPage(keyword ?? "");
      return data as unknown as BlockValueType[];
    },
    enabled: keyword !== "",
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export const getPageTitle = (blockMap: BlockMapType) => {
  if (isEmpty(blockMap)) return null;
  const pages = Object.keys(blockMap).map((blockId) => {
    if (blockMap[blockId]?.value?.type === "page") {
      return blockMap[blockId];
    }
  });
  const page = pages?.[0]?.value as PageValueType;
  const title = page?.properties?.title?.[0] ?? "";
  return title;
};
export const getListPageByPageContent = (blockMap: BlockMapType) => {
  if (isEmpty(blockMap)) return [];
  const pages = Object.keys(blockMap).map((blockId) => {
    if (blockMap[blockId]?.value?.type === "page") {
      return blockMap[blockId];
    }
  });
  const parentId = pages?.[0]?.value?.parent_id;
  return pages.slice(1).filter((page) => page && page.value.id !== parentId);
};

export const getListPageOfFeature = (featureBlockMap: BlockMapType) => {
  if (isEmpty(featureBlockMap)) return [];
  const pages = Object.keys(featureBlockMap).map((blockId) => {
    if (featureBlockMap[blockId]?.value?.type === "page") {
      return featureBlockMap[blockId];
    }
  });
  const parentId = pages?.[0]?.value?.parent_id;
  return pages.slice(1).filter((page) => page && page.value.id !== parentId && page.value.parent_table === "block");
};
const useCenterSupport = (id: string) => {
  const [searchKey, setSearchKey] = useState("");
  const { data: pagesBySearchKey, isLoading: isSearching } = useSearchPageByKeyword(searchKey);
  const { data: currentPage, isLoading } = useGetPageContentById(id);

  const title = useMemo(() => {
    if (id) return getPageTitle(currentPage as unknown as BlockMapType);
    return "";
  }, [currentPage]);

  return { currentPage, searchKey, setSearchKey, pagesBySearchKey, isSearching, title, isLoading };
};

export default useCenterSupport;
