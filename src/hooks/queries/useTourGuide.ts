import {
    CreateTourGuideRequest,
    PaginationResponseOfTourGuideDto,
    SearchTourGuidesRequest,
    TourGuideApi,
    TourGuideDto,
    UpdateTourGuideRequest,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getTourGuideApi = () => {
    return new TourGuideApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useTourGuideInfos = () => {
    return useMutation(
        ['getTourGuideInfos'],
        async (request: SearchTourGuidesRequest): Promise<PaginationResponseOfTourGuideDto> => {
            const response = await getTourGuideApi().tourGuideSearch('root', request);
            return response.data;
        },
    );
};

export const useGetTourGuide = () => {
    return useMutation(['getTourGuide'], async (id: string): Promise<TourGuideDto> => {
        const response = await getTourGuideApi().tourGuideGet(id, 'root');
        return response.data;
    });
};

export const useCreateTourGuide = () => {
    return useMutation(['createTourGuide'], async (request: CreateTourGuideRequest): Promise<AxiosResponse> => {
        const response = await getTourGuideApi().tourGuideCreate('root', request);
        return response;
    });
};

export const useUpdateTourGuide = () => {
    return useMutation(['updateTourGuide'], async (request: UpdateTourGuideRequest): Promise<AxiosResponse> => {
        const response = await getTourGuideApi().tourGuideUpdate(request.id ?? '', 'root', request);
        return response;
    });
};

export const useDeleteTourGuide = () => {
    return useMutation(['deleteTourGuide'], async (id: string): Promise<string> => {
        const response = await getTourGuideApi().tourGuideDelete(id, 'root');
        return response.data;
    });
};
