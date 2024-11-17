import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTripRequestInfoApi } from "@/services/tmcSdk";
import { MarkHotelBookingOrdersAsReadRequest } from "sdk/tmc";
import { QUERY_KEYS } from "../keys";

export const useReadBookingOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: MarkHotelBookingOrdersAsReadRequest) => {
      await getTripRequestInfoApi().tripRequestInfoMarkBookingOrderAsRead(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_LIST_BOOKING]);
    },
  });
};
