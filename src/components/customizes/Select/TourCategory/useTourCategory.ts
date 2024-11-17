import { PaginationResponseOfTourTypeDto, TourCategoryApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const useGetTourCategories = () => {
    return useQuery(
        ['getTourCategories'],
        async (): Promise<PaginationResponseOfTourTypeDto> => {
            const res = await new TourCategoryApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourCategorySearch(
                'root',
                {},
            );
            return res.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
