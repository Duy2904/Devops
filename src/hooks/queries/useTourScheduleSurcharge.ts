import { useMutation } from 'react-query';
import {
    CreateTourScheduleSurchargeRequest,
    PaginationResponseOfTourScheduleSurchargeDto,
    SearchTourScheduleSurchargesRequest,
    TourScheduleSurchargeApi,
    TourScheduleSurchargeDto,
    UpdateTourScheduleSurchargeRequest,
} from '../../../sdk/tour-operations';
import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';

export const getTourScheduleSurchargeApi = () => {
    return new TourScheduleSurchargeApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useTourScheduleSurchargeInfos = () => {
    return useMutation(
        ['getTourScheduleSurchargeInfos'],
        async (request: SearchTourScheduleSurchargesRequest): Promise<PaginationResponseOfTourScheduleSurchargeDto> => {
            const response = await getTourScheduleSurchargeApi().tourScheduleSurchargeSearch('root', request);
            return response.data;
        },
    );
};

export const useGetTourScheduleSurcharge = () => {
    return useMutation(['getTourScheduleSurcharge'], async (id: string): Promise<TourScheduleSurchargeDto> => {
        const response = await getTourScheduleSurchargeApi().tourScheduleSurchargeGet(id, 'root');
        return response.data;
    });
};

export const useCreateTourScheduleSurcharge = () => {
    return useMutation(
        ['createTourScheduleSurcharge'],
        async (request: CreateTourScheduleSurchargeRequest): Promise<AxiosResponse> => {
            const response = await getTourScheduleSurchargeApi().tourScheduleSurchargeCreate('root', request);
            return response;
        },
    );
};

export const useUpdateTourScheduleSurcharge = () => {
    return useMutation(
        ['updateTourScheduleSurcharge'],
        async (request: UpdateTourScheduleSurchargeRequest): Promise<AxiosResponse> => {
            const response = await getTourScheduleSurchargeApi().tourScheduleSurchargeUpdate(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useDeleteTourScheduleSurcharge = () => {
    return useMutation(['deleteTourScheduleSurcharge'], async (id: string): Promise<string> => {
        const response = await getTourScheduleSurchargeApi().tourScheduleSurchargeDelete(id, 'root');
        return response.data;
    });
};
