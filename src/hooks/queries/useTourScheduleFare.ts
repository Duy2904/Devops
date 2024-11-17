import { useMutation } from 'react-query';
import {
    CreateTourScheduleFareRequest,
    PaginationResponseOfTourScheduleFareDto,
    SearchTourScheduleFaresRequest,
    TourScheduleFareApi,
    TourScheduleFareDto,
    UpdateTourScheduleFareRequest,
} from '../../../sdk/tour-operations';
import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';

export const getTourScheduleFareApi = () => {
    return new TourScheduleFareApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useTourScheduleFareInfos = () => {
    return useMutation(
        ['getTourScheduleFareInfos'],
        async (request: SearchTourScheduleFaresRequest): Promise<PaginationResponseOfTourScheduleFareDto> => {
            const response = await getTourScheduleFareApi().tourScheduleFareSearch('root', request);
            return response.data;
        },
    );
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
