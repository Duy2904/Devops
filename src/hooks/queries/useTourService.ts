import { useMutation } from 'react-query';
import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';
import {
    CreateHotelTourServiceRequest,
    CreateLandTourServiceRequest,
    CreateTourServicesRequest,
    CreateTransportationTourServiceRequest,
    CreateVisaTourServiceRequest,
    DeleteTourServiceRequest,
    DeleteTransportationTourServiceRequest,
    TourServiceApi,
    UpdateHotelTourServiceRequest,
    UpdateLandTourServiceRequest,
    UpdateTransportationTourServiceRequest,
    UpdateVisaTourServiceRequest,
} from '../../../sdk/tour-operations';
import { AxiosResponse } from 'axios';

export const getTourServiceApi = () => {
    return new TourServiceApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useCreateTourService = () => {
    return useMutation(
        ['createTourService'],
        async (request: CreateTourServicesRequest): Promise<AxiosResponse<number>> => {
            const response = await getTourServiceApi().tourServiceCreate('root', request);
            return response;
        },
    );
};

export const useCreateTransportationTourService = () => {
    return useMutation(
        ['createTransportationTourService'],
        async (request: CreateTransportationTourServiceRequest): Promise<AxiosResponse<string>> => {
            const response = await getTourServiceApi().tourServiceCreateTransportation('root', request);
            return response;
        },
    );
};

export const useCreateVisaTourService = () => {
    return useMutation(
        ['createVisaTourService'],
        async (request: CreateVisaTourServiceRequest): Promise<AxiosResponse<string>> => {
            const response = await getTourServiceApi().tourServiceCreateVisa('root', request);
            return response;
        },
    );
};

export const useCreateHotelTourService = () => {
    return useMutation(
        ['createHotelTourService'],
        async (request: CreateHotelTourServiceRequest): Promise<AxiosResponse<string>> => {
            const response = await getTourServiceApi().tourServiceCreateHotel('root', request);
            return response;
        },
    );
};

export const useCreateLandTourTourService = () => {
    return useMutation(
        ['createLandTourTourService'],
        async (request: CreateLandTourServiceRequest): Promise<AxiosResponse<string>> => {
            const response = await getTourServiceApi().tourServiceCreateLand('root', request);
            return response;
        },
    );
};

export const useUpdateTransportationTourService = () => {
    return useMutation(
        ['updateTransportationTourService'],
        async (request: UpdateTransportationTourServiceRequest): Promise<AxiosResponse<string>> => {
            const response = await getTourServiceApi().tourServiceUpdateTransportation(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useUpdateVisaTourService = () => {
    return useMutation(
        ['updateVisaTourService'],
        async (request: UpdateVisaTourServiceRequest): Promise<AxiosResponse<string>> => {
            const response = await getTourServiceApi().tourServiceUpdateVisa(request.id ?? '', 'root', request);
            return response;
        },
    );
};

export const useUpdateHotelTourService = () => {
    return useMutation(
        ['updateHotelTourService'],
        async (request: UpdateHotelTourServiceRequest): Promise<AxiosResponse<string>> => {
            const response = await getTourServiceApi().tourServiceUpdateHotel(request.id ?? '', 'root', request);
            return response;
        },
    );
};

export const useUpdateLandTourTourService = () => {
    return useMutation(
        ['updateLandTourTourService'],
        async (request: UpdateLandTourServiceRequest): Promise<AxiosResponse<string>> => {
            const response = await getTourServiceApi().tourServiceUpdateLand(request.id ?? '', 'root', request);
            return response;
        },
    );
};

export const useDeleteTourService = () => {
    return useMutation(
        ['deleteTourService'],
        async (request: DeleteTourServiceRequest): Promise<AxiosResponse<number>> => {
            const response = await getTourServiceApi().tourServiceDelete('root', request);
            return response;
        },
    );
};

export const useDeleteTourServiceTransportation = () => {
    return useMutation(
        ['deleteTourServiceTransportation'],
        async (request: DeleteTransportationTourServiceRequest): Promise<AxiosResponse<number>> => {
            const response = await getTourServiceApi().tourServiceDeleteTransportation('root', request);
            return response;
        },
    );
};
