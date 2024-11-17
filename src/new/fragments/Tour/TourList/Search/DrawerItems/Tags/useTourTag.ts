import { TagApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';
import { TourKey } from '@hooks/identity-next/key-type';

export const useGetTagsOnFilterPane = () => {
    const requestFn = async () => {
        const res = await new TagApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tagSearchDislayFilterPane(
            'root',
            {},
        );

        const { data } = res.data;

        return data?.map(item => {
            const { id, name } = item;
            return { value: `${id}`, label: `${name}` };
        }) ?? [];
    };

    return useQuery({
        queryKey: [TourKey.getTagsOnFilterPane],
        queryFn: requestFn,
        refetchOnWindowFocus: false, 
        staleTime: Infinity
    });
};
