import { AppConfig } from '@utils/config';
import { AreaApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getAreasApi = () => {
    return new AreaApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchAreas = () => {
    const requestFn = async () => {
        const res = await getAreasApi().areaSearch('root', {});
        return res.data;
    };
    return useQuery({
        queryKey: ['FETCH_AREAS_CHECKBOX'],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
