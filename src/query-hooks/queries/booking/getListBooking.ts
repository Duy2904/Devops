import { QUERY_KEYS } from "@/query-hooks/keys";
import { getTripRequestInfoApi } from "@/services/tmcSdk";
import { adjustDateToUTC } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";

type TQueryOption = {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  fromDate?: Date;
  toDate?: Date;
  sortField?: string;
  isAsc?: boolean;
};

export const useGetListBooking = (queryOption: TQueryOption) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LIST_BOOKING, JSON.stringify(queryOption)],
    queryFn: async () => {
      const convertedFromDate = adjustDateToUTC(queryOption.fromDate);
      const convertedToDate = adjustDateToUTC(queryOption.toDate);

      const { data } = await getTripRequestInfoApi().getHotelBookingOrdersForBookerWithPagination(
        queryOption.keyword,
        convertedFromDate.toDate(),
        convertedToDate.toDate(),
        queryOption.sortField ? queryOption.sortField : undefined,
        queryOption.sortField ? queryOption.isAsc : undefined,
        queryOption.pageNumber,
        queryOption.pageSize,
      );
      return data;
    },
    staleTime: 3 * 1000 * 60, // 3mins
  });
};
