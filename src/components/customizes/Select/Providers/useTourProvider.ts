import { TourApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';
import { TourKey } from '@hooks/identity-next/key-type';

export const useGetTourProviders = () => {
    const requestFn = async () => {
        const res = await new TourApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourGetTourProviders(
            'root',
            {},
        );

        return res.data?.map(item => {
            const { id, name } = item;
            return { value: `${id}`, label: `${name}` };
        }) ?? [];
    };

    return useQuery({
        queryKey: [TourKey.getTourProviders],
        queryFn: requestFn,
        refetchOnWindowFocus: false, 
        staleTime: Infinity
    });
};
