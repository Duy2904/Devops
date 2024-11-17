import { AppConfig } from '@utils/config';
import { TourCategoryApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const useGetTourCategoriesSelect = () => {
    return useQuery(
        ['getTourCategoriesSelect'],
        async () => {
            const res = await new TourCategoryApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourCategorySearch(
                'root',
                {},
            );
            return (
                res.data?.data?.map(item => ({
                    value: `${item.id}`,
                    label: `${item.name}`,
                })) ?? []
            );
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
