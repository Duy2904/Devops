import { SorterResult } from 'antd/es/table/interface';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import {
    CreateTravellerRequest,
    PaginationResponseOfTravellerDto,
    SearchTravellersRequest,
    TravellerApi,
    TravellerDto,
    UpdateTravellerRequest,
} from '../../../sdk/tour-operations';
import { getAxiosInstance } from '../../services/auth';
import { TableParams } from '../../types/SearchResponse';
import { AppConfig } from '../../utils/config';

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

export const useUpdateTraveller = () => {
    return useMutation(['updateTraveller'], async (request: UpdateTravellerRequest): Promise<AxiosResponse<string>> => {
        const response = await getTravellerApi().travellerUpdate(request.id ?? '', 'root', request);
        return response;
    });
};

export const useDeleteTraveller = () => {
    return useMutation(['deleteTraveller'], async (id: string): Promise<string> => {
        const response = await getTravellerApi().travellerDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<TravellerDto>): SearchTravellersRequest => {
    const request: SearchTravellersRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
    };

    const sorter = params.sorter as SorterResult<TravellerDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }
    return request;
};
