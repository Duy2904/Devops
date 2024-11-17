import {
    ApprovalTourStatus,
    ApproveTourScheduleRequest,
    CreateTourScheduleRequest,
    ExportRoomListRequest,
    ExportTourScheduleRequest,
    PaginationResponseOfTourSearchFitDto,
    RoomListTravellerDto,
    SendForApprovalRequest,
    TourFitApi,
    TourScheduleDto,
    TourScheduleStatus,
    UpdateRoomListTravellerRequest,
    UpdateTourScheduleRequest,
} from '@sdk/tour-operations';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import _ from 'lodash';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';
import { mapSearchRequest } from '../Feature/FeatureTourFit';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

// get list tour Fit
export const useGetListTourFit = (request: AnyObject) => {
    const paramsSearch = mapSearchRequest(request);
    delete paramsSearch.keyword;
    const response = async (): Promise<PaginationResponseOfTourSearchFitDto> => {
        const res = await getTourFitApi().tourFitSearch('root', paramsSearch);
        return res.data;
    };
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(['getListTourFit', JSON.stringify(customKey)], response, {
        refetchOnWindowFocus: false,
        enabled: !!request,
    });
};

// get list tour Fit Dropdown
export const useGetListTourFitDropdown = () => {
    const response = async (request: AnyObject): Promise<PaginationResponseOfTourSearchFitDto> => {
        const res = await getTourFitApi().tourFitSearch('root', mapSearchRequest(request));
        return res.data;
    };
    return useMutation(['getListTourFitDropdown'], response);
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

export const useGetTourScheduleUseId = () => {
    return useMutation(['getTourScheduleId'], async (id: string): Promise<TourScheduleDto> => {
        const response = await getTourFitApi().tourFitGet(id, 'root');
        return response.data;
    });
};

// create tour
export const useCreateTourFit = () => {
    const requestFn = async ({ data }: { data: CreateTourScheduleRequest }): Promise<string> => {
        const response = await getTourFitApi().tourFitCreate('root', data);
        return response.data;
    };
    return useMutation({
        mutationKey: ['createTourFit'],
        mutationFn: requestFn,
    });
};

// update tour
export const useUpdateTourFit = () => {
    const requestFn = async ({ id, data }: { id: string; data: UpdateTourScheduleRequest }) => {
        const response = await getTourFitApi().tourFitUpdate(id, 'root', data);
        return response.data;
    };
    return useMutation({
        mutationKey: ['updateTourFit'],
        mutationFn: requestFn,
    });
};

// delete tour
export const useDeleteTourSchedule = () => {
    return useMutation(['deleteTourSchedule'], async (id: string): Promise<string> => {
        const response = await getTourFitApi().tourFitDelete(id, 'root');
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

export const useTourFitApproveSalesOpen = () => {
    return useMutation(
        ['tourFitApproveSalesOpen'],
        async ({ id, data }: { id: string; data: ApproveTourScheduleRequest }): Promise<string> => {
            const response = await getTourFitApi().tourFitApprove(id, 'root', data);
            return response.data;
        },
    );
};

export const useUpdateTourSheduleCancelStatus = () => {
    return useMutation(['updateTourScheduleCancelStatus'], async (id: string): Promise<string> => {
        const response = await getTourFitApi().tourFitCancelTour(id, 'root');
        return response.data;
    });
};

export const getTourScheduleStatus = () =>
    Object.values(TourScheduleStatus).map((key: string) => ({
        value: key,
        label: i18n.t(`tour.status.${key}`),
    }));

export const getApproveStatus = () =>
    Object.values(ApprovalTourStatus).map((key: string | ApprovalTourStatus) => ({
        value: key,
        label: i18n.t(`tour.approveStatus.${key}`),
    }));
