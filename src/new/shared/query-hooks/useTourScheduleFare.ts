import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import {
    CreateTourScheduleFareRequest,
    PaginationResponseOfTourScheduleFareDto,
    SearchTourScheduleFaresRequest,
    TourScheduleFareApi,
    TourScheduleFareDto,
    UpdateTourScheduleFareRequest,
} from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

import QueryKeys from './query-keys';

export const getTourScheduleFareApi = () => {
    return new TourScheduleFareApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useTourScheduleFareInfos = (tourId: string) => {
    return useQuery({
        queryKey: [QueryKeys.GET_TOUR_SCHEDULE_FARE_INFOS, tourId],
        queryFn: async (): Promise<PaginationResponseOfTourScheduleFareDto> => {
            const request: SearchTourScheduleFaresRequest = {
                advancedSearch: {
                    fields: ['tourScheduleId'],
                    keyword: tourId,
                },
            };

            const response = await getTourScheduleFareApi().tourScheduleFareSearch('root', request);
            return response.data;
        },
        enabled: !!tourId,
    });
};

export const useGetTourScheduleFare = () => {
    return useMutation(['getTourScheduleFare'], async (id: string): Promise<TourScheduleFareDto> => {
        const response = await getTourScheduleFareApi().tourScheduleFareGet(id, 'root');
        return response.data;
    });
};

export const useCreateTourScheduleFare = () => {
    return useMutation(
        ['createTourScheduleFare'],
        async (request: CreateTourScheduleFareRequest): Promise<AxiosResponse> => {
            const response = await getTourScheduleFareApi().tourScheduleFareCreate('root', request);
            return response;
        },
    );
};

export const useUpdateTourScheduleFare = () => {
    return useMutation(
        ['updateTourScheduleFare'],
        async (request: UpdateTourScheduleFareRequest): Promise<AxiosResponse> => {
            const response = await getTourScheduleFareApi().tourScheduleFareUpdate(request.id ?? '', 'root', request);
            return response;
        },
    );
};

export const useDeleteTourScheduleFare = () => {
    return useMutation(['deleteTourScheduleFare'], async (id: string): Promise<string> => {
        const response = await getTourScheduleFareApi().tourScheduleFareDelete(id, 'root');
        return response.data;
    });
};
