import { AppConfig } from '@utils/config';
import { TourApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getToursApi = () => {
    return new TourApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchProviders = () => {
    const requestFn = async () => {
        const res = await getToursApi().tourGetTourProviders('root', {});
        return res.data;
    };
    return useQuery({
        queryKey: ['FETCH_PROVIDERS_CHECKBOX'],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
