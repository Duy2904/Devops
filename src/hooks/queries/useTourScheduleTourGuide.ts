import {
    CreateExistingTourGuideForTourRequest,
    CreateTourGuideForTourRequest,
    TourScheduleTourGuideApi,
    UpdateExistingTourGuideForTourRequest,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getTourScheduleTourGuideApi = () => {
    return new TourScheduleTourGuideApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

// if haven't Tour Guide
export const useCreateTourScheduleTourGuide = () => {
    return useMutation(
        ['createTourScheduleTourGuide'],
        async (request: CreateTourGuideForTourRequest): Promise<string> => {
            const response = await getTourScheduleTourGuideApi().tourScheduleTourGuideCreate('root', request);
            return response.data;
        },
    );
};

// if had Tour Guide
export const useCreateExistingTourScheduleTourGuide = () => {
    return useMutation(
        ['createExistingTourScheduleTourGuide'],
        async (request: CreateExistingTourGuideForTourRequest): Promise<AxiosResponse> => {
            const response = await getTourScheduleTourGuideApi().tourScheduleTourGuideCreate2('root', request);
            return response;
        },
    );
};

export const useUpdateTourScheduleTourGuide = () => {
    return useMutation(
        ['updateTourScheduleTourGuide'],
        async (request: UpdateExistingTourGuideForTourRequest): Promise<AxiosResponse> => {
            const response = await getTourScheduleTourGuideApi().tourScheduleTourGuideUpdate(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useDeleteTourScheduleTourGuide = () => {
    return useMutation(['deleteTourScheduleTourGuide'], async (id: string): Promise<string> => {
        const response = await getTourScheduleTourGuideApi().tourScheduleTourGuideDelete(id, 'root');
        return response.data;
    });
};
