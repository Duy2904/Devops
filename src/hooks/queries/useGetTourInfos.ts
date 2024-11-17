import {
    CreateTourInforRequest,
    PaginationResponseOfTourInforDto,
    PaginationResponseOfTourTypeDto,
    SearchTourInforsRequest,
    SearchTourTypesRequest,
    TourInfoMediaApi,
    TourInforApi,
    TourInforDto,
    TourTypeApi,
    UpdateTourInforRequest,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../../types/SearchResponse';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const useGetTourInfos = () => {
    return useMutation(
        ['getTourInfos'],
        async (request: SearchTourInforsRequest): Promise<PaginationResponseOfTourInforDto> => {
            const response = await new TourInforApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourInforSearch(
                'root',
                request,
            );

            return response.data;
        },
    );
};

export const mapSearchRequest = (params: TableParams<TourInforDto>): SearchTourInforsRequest => {
    const request: SearchTourInforsRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
        fromDate: params.fromDate,
        toDate: params.toDate,
        includeIds: params.includeIds,
        tourTypeId: params.tourTypeId,
        tourCategoryId: params.tourCategoryId,
        departureLocationId: params.departureLocationId,
        destinationLocationId: params.destinationLocationId,
    };

    const sorter = params.sorter as SorterResult<TourInforDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }

    return request;
};

export const useGetTourInfo = () => {
    return useMutation(['getMutaionTourInfo'], async ({ id }: { id: string | undefined }): Promise<TourInforDto> => {
        return await getTourInfo(id);
    });
};

export const getTourInfo = async (id: string | undefined): Promise<TourInforDto> => {
    if (id == null || id == undefined) {
        const tourInfo: TourInforDto = {};
        return tourInfo;
    }

    const respone = await new TourInforApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourInforGet(id, 'root');

    return respone.data;
};

export const useCreateTourInfo = () => {
    return useMutation(['createTourInfo'], async (request: CreateTourInforRequest): Promise<AxiosResponse> => {
        const response = await new TourInforApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourInforCreate(
            'root',
            request,
        );
        return response;
    });
};

export const useUpdateTourInfo = () => {
    return useMutation(['updateTourInfo'], async (request: UpdateTourInforRequest): Promise<AxiosResponse> => {
        const response = await new TourInforApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourInforUpdate(
            request.id ?? '',
            'root',
            request,
        );
        return response;
    });
};

export const useGetTourTypes = () => {
    return useMutation(
        ['getTourTypes'],
        async (request: SearchTourTypesRequest): Promise<PaginationResponseOfTourTypeDto> => {
            const response = await new TourTypeApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourTypeSearch(
                'root',
                request,
            );
            return response.data;
        },
    );
};

export const useCreateTourInfoMedia = () => {
    return useMutation(
        ['createTourInfoMedia'],
        async ({ tourInfoId, file }: { tourInfoId: string; file: File }): Promise<string> => {
            const response = await new TourInfoMediaApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).tourInfoMediaCreate('root', tourInfoId, file);
            return response.data;
        },
    );
};

export const useDeleteTourInfoMedia = () => {
    return useMutation(['deleteTourInfoMedia'], async (id: string): Promise<string> => {
        const response = await new TourInfoMediaApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).tourInfoMediaDelete(id, 'root');
        return response.data;
    });
};

export const useDeleteTourInfo = () => {
    return useMutation(['deleteTourInfo'], async (id: string): Promise<string> => {
        const response = await new TourInforApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourInforDelete(
            id,
            'root',
        );
        return response.data;
    });
};
