import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { GroupsIdentityApi } from '@hooks/identity-next/apis';
import { TourFitApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useMutation } from 'react-query';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetListTourFitDropdown = () => {
    const response = async (request: AnyObject) => {
        const res = await getTourFitApi().tourFitDropdown('root', request);
        const responseMap =
            res.data?.map(item => ({
                value: `${item.id}`,
                label: `${item.tourCode}-${item.name}`,
            })) ?? [];
        return responseMap;
    };
    return useMutation(['FETCH_LIST_TOUR_FIT_DROPDOWN'], response);
};

export const useGetListTourFitTransferDropdown = (id: string) => {
    const response = async (request: AnyObject) => {
        const res = await getTourFitApi().tourFitGetTransfer(id, 'root', { ...request, id: id });
        const responseMap =
            res?.data?.data?.map(item => ({
                value: `${item.id}`,
                label: `${item.tourCode}-${item.name}`,
            })) ?? [];
        return responseMap;
    };
    return useMutation(['FETCH_LIST_TOUR_FIT_TRANSFER'], response);
};

export const useGetListGroupAgentDropdown = () => {
    const response = async (request: AnyObject) => {
        const newRequest = {
            ...request,
            advancedFilter: {
                field: 'agentState',
                operator: 'eq',
                value: 'Active',
            },
        };
        const res = await GroupsIdentityApi().groupsSearchGroupsForTourOperations('hnh', newRequest);
        const responseMap =
            res?.data?.data?.map(item => ({
                value: `${item.id}`,
                label: `${item.code}-${item.name}`,
            })) ?? [];
        return responseMap;
    };

    return useMutation(['getListGroupAgent'], response);
};
