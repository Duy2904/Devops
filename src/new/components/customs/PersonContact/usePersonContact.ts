import {
    CreateTravellerRequest,
    PaginationResponseOfTravellerDto,
    SearchTravellersRequest,
    TravellerApi,
    TravellerDto,
} from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const getTravellerApi = () => {
    return new TravellerApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetTravellers = () => {
    return useMutation(
        ['getTravellers'],
        async (request: SearchTravellersRequest): Promise<PaginationResponseOfTravellerDto> => {
            const response = await getTravellerApi().travellerSearch('root', request);
            return response.data;
        },
    );
};

export const useGetTraveller = (id: string) => {
    const response = async (): Promise<TravellerDto> => {
        const response = await getTravellerApi().travellerGet(id, 'root');
        return response.data;
    };

    return useQuery(['getTravellerId', id], response, { refetchOnWindowFocus: false, enabled: !!id });
};

export const useCreateTraveller = () => {
    return useMutation(['createTraveller'], async (request: CreateTravellerRequest): Promise<AxiosResponse<string>> => {
        const response = await getTravellerApi().travellerCreate('root', request);
        return response;
    });
};
