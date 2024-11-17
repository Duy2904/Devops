import { getHotelApi } from "@/services/tmcSdk";
import { useQuery } from "@tanstack/react-query";
import { SuggestedDestinationDto } from "sdk/tmc";

export const useGetHotelSuggestedDestinations = (keyword: string) => {
  return useQuery(
    ["getHotelSuggestedDestinations", keyword],
    async (): Promise<SuggestedDestinationDto[]> => {
      // keyword require length greater than 2 characters
      if (!keyword || keyword.length < 2) {
        return [];
      }

      const response = await getHotelApi().retrievesSuggestedDestinationsBasedOnUserPreferencesAsynchronously(keyword);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!keyword,
    },
  );
};
