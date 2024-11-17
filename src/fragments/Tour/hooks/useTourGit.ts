import {
    ApproveTourScheduleRequest,
    CreateTourGitRequest,
    ExportTourScheduleRequest,
    PaginationResponseOfTourSearchGitDto,
    SendForApprovalRequest,
    TourGitApi,
    TourGitDto,
    UpdateTourGitRequest,
} from '@sdk/tour-operations';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import _ from 'lodash';
import { getAxiosInstance } from '@services/auth';
import { mapSearchRequest } from '../Feature/FeatureTourGit';

export const getTourGitApi = () => {
    return new TourGitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

// get list tour Git
export const useGetListTourGit = (request: AnyObject) => {
    const response = async (): Promise<PaginationResponseOfTourSearchGitDto> => {
        const res = await getTourGitApi().tourGitSearch('root', mapSearchRequest(request));
        return res.data;
    };
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(['getListTourGit', JSON.stringify(customKey)], response, {
        refetchOnWindowFocus: false,
        enabled: !!request,
    });
};

// mutate
export const useGetTourGitUseCode = () => {
    return useMutation(['getTourGitUseCode'], async (tourCode: string): Promise<TourGitDto> => {
        const response = await getTourGitApi().tourGitGet2(tourCode, 'root');
        return response.data;
    });
};

export const useGetTourGitUseId = () => {
    return useMutation(['getTourGitUseId'], async (id: string): Promise<TourGitDto> => {
        const response = await getTourGitApi().tourGitGet(id, 'root');
        return response.data;
    });
};

//query get Tour Git by code
export const useGetTourGitByCode = (tourCode: string | null) => {
    const response = async (): Promise<TourGitDto> => {
        const res = await getTourGitApi().tourGitGet2(tourCode!, 'root');
        return res.data;
    };
    return useQuery(['getTourGitByCode', tourCode], response, { refetchOnWindowFocus: false, enabled: !!tourCode });
};

// create tour
export const useCreateTourGit = () => {
    const requestFn = async ({ data }: { data: CreateTourGitRequest }): Promise<string> => {
        const response = await getTourGitApi().tourGitCreate('root', data);
        return response.data;
    };
    return useMutation({
        mutationKey: ['createTourGit'],
        mutationFn: requestFn,
    });
};

// update tour
export const useUpdateTourGit = () => {
    const requestFn = async ({ id, data }: { id: string; data: UpdateTourGitRequest }) => {
        const response = await getTourGitApi().tourGitUpdate(id, 'root', data);
        return response.data;
    };

    return useMutation({
        mutationKey: ['updateTourGit'],
        mutationFn: requestFn,
    });
};

// delete Tour
export const useDeleteTourGit = () => {
    return useMutation(['deleteTourGit'], async (id: string): Promise<string> => {
        const response = await getTourGitApi().tourGitDelete(id, 'root');
        return response.data;
    });
};

export const useGetDepartureLocationOnFilterTourGit = () => {
    const response = async () => {
        const res = await getTourGitApi().tourGitGetDepartureLocation('root');
        const mappingData: Array<{ value: string; label: string }> =
            res.data?.map(item => ({
                value: item.id ?? '',
                label: item.name ?? '',
            })) ?? [];
        return mappingData;
    };
    return useQuery(['getDepartureLocationOnFilterTourGit'], response, { refetchOnWindowFocus: false });
};

export const useGetDestinationLocationOnFilterTourGit = () => {
    const response = async () => {
        const res = await getTourGitApi().tourGitGetDestinationLocation('root');
        const mappingData: Array<{ value: string; label: string }> =
            res.data?.map(item => ({
                value: item.id ?? '',
                label: item.name ?? '',
            })) ?? [];
        return mappingData;
    };
    return useQuery(['getDestinationLocationOnFilterTourGit'], response, { refetchOnWindowFocus: false });
};

export const useGetCustomerOnFilterTourGit = () => {
    const response = async () => {
        const res = await getTourGitApi().tourGitGetCustomer('root');
        const mappingData: Array<{ value: string; label: string }> =
            res.data?.map(item => ({
                value: item.id ?? '',
                label: item.name ?? '',
            })) ?? [];
        return mappingData;
    };
    return useQuery(['getGetCustomerOnFilterTourGit'], response, { refetchOnWindowFocus: false });
};

export const useTourGitRequestApprove = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ['tourGitRequestApprove'],
        async ({ id, data }: { id: string; data: SendForApprovalRequest }): Promise<string> => {
            const response = await getTourGitApi().tourGitSendForApproval(id, 'root', data);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['getListTourGit']);
            },
        },
    );
};

export const useTourGitApproveSalesOpen = () => {
    return useMutation(
        ['tourGitApproveSalesOpen'],
        async ({ id, data }: { id: string; data: ApproveTourScheduleRequest }): Promise<string> => {
            const response = await getTourGitApi().tourGitApprove(id, 'root', data);
            return response.data;
        },
    );
};

export const useExportExcelTourGit = () => {
    const response = async (request: ExportTourScheduleRequest) => {
        const res = await getTourGitApi().tourGitExport('root', request);
        return res.data;
    };

    return useMutation(['exportExcelTourGit'], response);
};
