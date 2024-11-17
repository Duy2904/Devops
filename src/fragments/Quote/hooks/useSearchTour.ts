import { TourFitApi, TourGitApi, TourGitDto, TourScheduleDto } from '@sdk/tour-operations';
import { useQuery } from 'react-query';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';

export const getTourGitApi = () => {
    return new TourGitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useQueryGetTourGitScheduleUseId = (id: string) => {
    const response = async (): Promise<TourGitDto> => {
        const response = await getTourGitApi().tourGitGet(id, 'root');
        return response.data;
    };

    return useQuery(['getTourScheduleId', id], response, { refetchOnWindowFocus: false, enabled: !!id });
};

export const useQueryGetTourScheduleUseId = (id: string) => {
    const response = async (): Promise<TourScheduleDto> => {
        const response = await getTourFitApi().tourFitGet(id, 'root');
        return response.data;
    };

    return useQuery(['getTourScheduleId', id], response, { refetchOnWindowFocus: false, enabled: !!id });
};
