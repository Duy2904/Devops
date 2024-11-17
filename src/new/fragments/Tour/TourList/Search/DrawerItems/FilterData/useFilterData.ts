import { AppConfig } from '@utils/config';
import { TourFitApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchFilterDataTourFit = () => {
    const requestFn = async () => {
        const response = await getTourFitApi().tourFitGetFilterData('root');
        return response.data;
    };
    return useQuery(['getFetchFilterDataTourFit'], requestFn, { refetchOnWindowFocus: false });
};
