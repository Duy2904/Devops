import { AppConfig } from '@utils/config';
import { RegionApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getRegionsApi = () => {
    return new RegionApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchRegions = () => {
    const requestFn = async () => {
        const res = await getRegionsApi().regionSearch('root', {});
        return res.data;
    };
    return useQuery({
        queryKey: ['FETCH_REGIONS_CHECKBOX'],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
