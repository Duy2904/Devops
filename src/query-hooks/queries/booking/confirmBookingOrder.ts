import { QUERY_KEYS } from "@/query-hooks/keys";
import { getTripRequestInfoApi } from "@/services/tmcSdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IUpdateReservationRequest {
  id: string;
  tripId?: string;
  tripHotelId?: string;
  hotelId?: string;
  hotelName?: string;
  hotelAddress?: string;
  roomTypeId?: string;
  roomTypeName?: string;
  starRating?: number;
  newRoomPrice?: number;
  newTax?: number;
  newServiceFee?: number;
  reservationCode?: string;
  reservationDate?: Date;
  note?: string;
  tourCode?: string;
  files?: File[];
}

export const useConfirmUpdateBookingOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useConfirmUpdateBookingOrder"],
    mutationFn: async (payload: IUpdateReservationRequest) => {
      const response = await getTripRequestInfoApi().tripRequestInfoUpdateReservationCodeForHotel(
        payload.id,
        payload.tripId,
        payload.tripHotelId,
        payload.hotelId,
        payload.hotelName,
        payload.hotelAddress,
        payload.roomTypeId,
        payload.roomTypeName,
        payload.starRating,
        payload.newRoomPrice,
        payload.newTax,
        payload.newServiceFee,
        payload.reservationCode,
        payload.reservationDate,
        payload.tourCode,
        payload.note,
        payload.files
      );
      const { data } = response;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GET_BOOKING_DETAIL])
      queryClient.invalidateQueries([QUERY_KEYS.GET_LIST_BOOKING])
    }
  });
};
