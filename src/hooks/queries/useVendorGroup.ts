import {
    CreateVendorGroupRequest,
    PaginationResponseOfVendorGroupDto,
    SearchVendorGroupsRequest,
    UpdateVendorGroupRequest,
    VendorGroupApi,
    VendorGroupDto,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../../types/SearchResponse';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getVendorGroupApi = () => {
    return new VendorGroupApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetVendorGroups = () => {
    return useMutation(
        ['getVendorGroups'],
        async (request: SearchVendorGroupsRequest): Promise<PaginationResponseOfVendorGroupDto> => {
            const response = await getVendorGroupApi().vendorGroupSearch('root', request);
            return response.data;
        },
    );
};

export const useGetVendorGroup = () => {
    return useMutation(['getVendorGroup'], async (id: string): Promise<VendorGroupDto> => {
        const response = await getVendorGroupApi().vendorGroupGet(id, 'root');
        return response.data;
    });
};

export const useCreateVendorGroup = () => {
    return useMutation(
        ['createVendorGroup'],
        async (request: CreateVendorGroupRequest): Promise<AxiosResponse<string>> => {
            const response = await getVendorGroupApi().vendorGroupCreate('root', request);
            return response;
        },
    );
};

export const useUpdateVendorGroup = () => {
    return useMutation(
        ['updateVendorGroup'],
        async (request: UpdateVendorGroupRequest): Promise<AxiosResponse<string>> => {
            const response = await getVendorGroupApi().vendorGroupUpdate(request.id ?? '', 'root', request);
            return response;
        },
    );
};

export const useDeleteVendorGroup = () => {
    return useMutation(['deleteVendorGroup'], async (id: string): Promise<string> => {
        const response = await getVendorGroupApi().vendorGroupDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<VendorGroupDto>): SearchVendorGroupsRequest => {
    const request: SearchVendorGroupsRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
    };

    const sorter = params.sorter as SorterResult<VendorGroupDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }
    return request;
};
