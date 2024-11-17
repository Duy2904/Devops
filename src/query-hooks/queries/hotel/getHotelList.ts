import { useMutation, useQuery } from "@tanstack/react-query";

import { getHotelApi } from "@/services/tmcSdk.ts";
import { SearchHotelsRequest, SearchHotelsResponse } from "sdk/tmc";

export const useSearchHotel = () => {
  return useMutation({
    mutationKey: ["useSearchHotel"],
    mutationFn: async (hotelRequest: SearchHotelsRequest): Promise<SearchHotelsResponse> => {
      if (hotelRequest.selectedGeographicalEntityId) {
        const { data } = await getHotelApi().searchHotels(hotelRequest);
        return data;
      }
      return {};
    },
  });
};

export default useSearchHotel;
