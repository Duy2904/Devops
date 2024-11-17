import { LocationApi, PaginationResponseOfLocationDto } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const useGetLocations = () => {
    return useQuery(
        ['getLocation'],
        async (): Promise<PaginationResponseOfLocationDto> => {
            const response = await new LocationApi(undefined, AppConfig.ApiHost, getAxiosInstance()).locationSearch(
                'root',
                {},
            );
            return response.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
