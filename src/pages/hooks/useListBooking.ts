import dayjs, { Dayjs } from "dayjs";
import { omit } from "lodash";
import { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

import useQueryParams from "@/hooks/useQueryParams";
import { useGetListBooking } from "@/query-hooks/queries/booking/getListBooking";
import { NoUndefinedRangeValueType, RangeValueType } from "@/types/lib";

const ITEM_PER_PAGE = 10;

export const useListBooking = () => {
  // util hooks
  const { getParam, setParam, setMultipleParams } = useQueryParams();
  const keyword = getParam("keyword", "");
  const currentPage = parseInt(getParam("page", "1"));
  const startDate = getParam("startDate", dayjs().subtract(30, "days").format("YYYY-MM-DD"));
  const endDate = getParam("endDate", dayjs().format("YYYY-MM-DD"));
  const sortField = getParam("sortField", "");
  const isAsc = getParam("isAsc", "false");

  const rangeDate: RangeValueType<Dayjs> = [dayjs(startDate), dayjs(endDate)];

  // custom hooks
  const [debouncedKeyword, setDebouncedKeyword] = useDebounceValue(keyword, 500);

  // queries
  const { data, isLoading } = useGetListBooking({
    pageNumber: currentPage,
    pageSize: ITEM_PER_PAGE,
    keyword: debouncedKeyword,
    fromDate: rangeDate?.[0]?.toDate(),
    toDate: rangeDate?.[1]?.toDate(),
    sortField: sortField,
    isAsc: isAsc === "true",
  });

  // handlers
  const resetToFirstPage = () => {
    // reset page to 1 when any filter changes
    setParam("page", "1");
  };

  const resetSortOption = () => {
    setMultipleParams({
      sortField: "",
      isAsc: "",
    });
  };

  const resetFilters = () => {
    resetToFirstPage();
    resetSortOption();
  };

  const handlePageChange = (page: number) => {
    setParam("page", page.toString());
  };

  const handleKeywordChange = (keyword: string) => {
    setParam("keyword", keyword);
  };

  const handleRangeDateChange = (rangeDate: NoUndefinedRangeValueType<Dayjs> | null) => {
    const startDate = dayjs(rangeDate?.[0]?.toDate());
    const endDate = dayjs(rangeDate?.[1]?.toDate());

    setParam("startDate", startDate.toString());
    setParam("endDate", endDate.toString());

    resetFilters();
  };

  const handleSortOptionChange = (sortOption: { fieldName: string; isAsc: boolean }) => {
    setParam("sortField", sortOption.fieldName);

    // check if field name was cleared, then clear isAsc
    if (!sortOption.fieldName) {
      setParam("isAsc", "");
    } else {
      setParam("isAsc", sortOption.isAsc.toString());
    }
  };

  // effects
  useEffect(() => {
    if (keyword === "") {
      setDebouncedKeyword("");
    } else {
      setDebouncedKeyword(keyword);

      resetFilters();
    }
  }, [keyword]);

  return {
    isLoading,
    data: data?.data,
    pagination: omit(data, "data"),
    currentPage,
    keyword,
    rangeDate,
    sortField,
    isAsc,
    onPageChange: handlePageChange,
    onKeywordChange: handleKeywordChange,
    onRangeDateChange: handleRangeDateChange,
    onSortOptionChange: handleSortOptionChange,
  };
};
