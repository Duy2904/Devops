import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
    ExportRoomListRequest,
    ExportTourScheduleRequest,
    PaginationResponseOfTourSearchFitDto,
    RoomListTravellerDto,
    SendForApprovalRequest,
    TourFitApi,
    TourScheduleDto,
    UpdateRoomListTravellerRequest,
} from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

import { mapSearchRequest } from '../TourList/features';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

// get list tour Fit
export const useGetListTourFit = (request: AnyObject) => {
    const response = async (): Promise<PaginationResponseOfTourSearchFitDto> => {
        const res = await getTourFitApi().tourFitSearch('root', mapSearchRequest(request));
        return res.data;
    };
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(['getListTourFit', JSON.stringify(customKey)], response, {
        refetchOnWindowFocus: false,
        enabled: !!request,
    });
};

// get tour Fit by Code
export const useGetTourFitByCode = (tourCode: string | null) => {
    const response = async (): Promise<TourScheduleDto> => {
        const res = await getTourFitApi().tourFitGetTourCode(tourCode!, 'root');
        return res.data;
    };
    return useQuery(['getTourFitByCode', tourCode], response, { refetchOnWindowFocus: false, enabled: !!tourCode });
};

// mutate
export const useGetTourScheduleUseCode = () => {
    return useMutation(['getTourScheduleCode'], async (tourCode: string): Promise<TourScheduleDto> => {
        const response = await getTourFitApi().tourFitGetTourCode(tourCode, 'root');
        return response.data;
    });
};

// Room List
export const useFetchRoomListOfTourFit = (tourId: string | undefined) => {
    const response = async (): Promise<RoomListTravellerDto[]> => {
        const res = await getTourFitApi().tourFitGetRoomList(tourId!, 'root');
        return res.data;
    };
    return useQuery(['fetchRoomListByIdOfTourFit', tourId], response, {
        refetchOnWindowFocus: false,
        enabled: !!tourId,
    });
};

export const useUpdateRoomListOfTourFit = () => {
    return useMutation(
        ['updateRoomListOfTourFit'],
        async (data: { id: string | undefined; request: UpdateRoomListTravellerRequest[] }) => {
            const dataFetch = await getTourFitApi().tourFitUpdateRoomList(data.id!, 'root', {
                travellers: data.request,
            });
            return dataFetch.data ?? [];
        },
    );
};

export const useExportExcelRoomList = () => {
    return useMutation(['exportExcelRoomList'], async (data: { id: string; request: ExportRoomListRequest }) => {
        const response = await getTourFitApi().tourFitExport(data.id, 'root', data.request);
        return response.data;
    });
};

export const useExportExcelTourFit = () => {
    const response = async (request: ExportTourScheduleRequest) => {
        const res = await getTourFitApi().tourFitExport2('root', request);
        return res.data;
    };

    return useMutation(['exportExcelTourFit'], response);
};

export const useGetDepartureLocationOnFilterTourFit = () => {
    const response = async () => {
        const res = await getTourFitApi().tourFitGetDepartureLocation('root');
        const mappingData: Array<{ value: string; label: string }> =
            res.data?.map(item => ({
                value: item.id ?? '',
                label: item.name ?? '',
            })) ?? [];
        return mappingData;
    };
    return useQuery(['getDepartureLocationOnFilterTourFit'], response, { refetchOnWindowFocus: false });
};

export const useGetDestinationLocationOnFilterTourFit = () => {
    const response = async () => {
        const res = await getTourFitApi().tourFitGetDestinationLocation('root');
        const mappingData: Array<{ value: string; label: string }> =
            res.data?.map(item => ({
                value: item.id ?? '',
                label: item.name ?? '',
            })) ?? [];
        return mappingData;
    };
    return useQuery(['getDestinationLocationOnFilterTourFit'], response, { refetchOnWindowFocus: false });
};

export const useGetTripOnFilterTourFit = () => {
    return useMutation(['getTripOnFilterTourFit'], async (destinationLocationId: string) => {
        const response = await getTourFitApi().tourFitGetRouteByDestinationId(destinationLocationId, 'root');
        const mappingData: Array<{ value: string; label: string }> =
            response.data?.map(item => ({
                value: item.id ?? '',
                label: item.name ?? '',
            })) ?? [];
        return mappingData;
    });
};

export const useTourFitRequestApprove = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ['tourFitRequestApprove'],
        async ({ id, data }: { id: string; data: SendForApprovalRequest }): Promise<string> => {
            const response = await getTourFitApi().tourFitSendForApproval(id, 'root', data);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['getListTourFit']);
            },
        },
    );
};
