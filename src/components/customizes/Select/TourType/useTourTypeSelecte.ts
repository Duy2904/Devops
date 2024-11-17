import { PaginationResponseOfTourTypeDto, TourTypeApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const useGetTourTypes = () => {
    return useQuery(
        ['getTourTypes'],
        async (): Promise<PaginationResponseOfTourTypeDto> => {
            const res = await new TourTypeApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourTypeSearch(
                'root',
                {},
            );
            return res.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
