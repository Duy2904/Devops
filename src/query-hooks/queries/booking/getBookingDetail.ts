import { QUERY_KEYS } from "@/query-hooks/keys";
import { getTripRequestInfoApi } from "@/services/tmcSdk";
import { useQuery } from "@tanstack/react-query";

export const useGetBookingDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BOOKING_DETAIL, id],
    queryFn: async () => {
      if (!id) {
        return undefined;
      }
      const { data } = await getTripRequestInfoApi().getTripHotelBookingDetails(id);
      return data;
    },
    staleTime: 3 * 1000 * 60, // 3mins
  });
};
