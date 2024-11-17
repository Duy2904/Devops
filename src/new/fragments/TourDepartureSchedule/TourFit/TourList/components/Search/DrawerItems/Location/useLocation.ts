import { AppConfig } from '@utils/config';
import { TourFitApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchDepartureDropdown = () => {
    const response = async () => {
        const res = await getTourFitApi().tourFitGetDepartureLocation('root');
        const mappingData: Array<{ value: string; label: string }> =
            res.data?.map(item => ({
                value: item.id ?? '',
                label: item.name ?? '',
            })) ?? [];
        return mappingData;
    };
    return useQuery(['getDepartureLocationOnFilterTourFit'], response, { refetchOnWindowFocus: false });
};

export const useFetchDestinationDropdown = () => {
    const response = async () => {
        const res = await getTourFitApi().tourFitGetDestinationLocation('root');
        const mappingData: Array<{ value: string; label: string }> =
            res.data?.map(item => ({
                value: item.id ?? '',
                label: item.name ?? '',
            })) ?? [];
        return mappingData;
    };
    return useQuery(['getDestinationLocationOnFilterTourFit'], response, { refetchOnWindowFocus: false });
};
