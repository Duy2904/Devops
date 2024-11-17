import {
    CreateVendorContactPersonRequest,
    PaginationResponseOfVendorContactPersonDto,
    SearchVendorContactPersonsRequest,
    UpdateVendorContactPersonRequest,
    VendorContactPersonApi,
    VendorContactPersonDto,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../../types/SearchResponse';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getVendorContactPersonApi = () => {
    return new VendorContactPersonApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetVendorContactsPerson = () => {
    return useMutation(
        ['getVendorContactsPerson'],
        async (request: SearchVendorContactPersonsRequest): Promise<PaginationResponseOfVendorContactPersonDto> => {
            const response = await getVendorContactPersonApi().vendorContactPersonSearch('root', request);
            return response.data;
        },
    );
};

export const useGetVendorContactPerson = () => {
    return useMutation(['getVendorContactPerson'], async (id: string): Promise<VendorContactPersonDto> => {
        const response = await getVendorContactPersonApi().vendorContactPersonGet(id, 'root');
        return response.data;
    });
};

export const useCreateVendorContactPerson = () => {
    return useMutation(
        ['createVendorContactPerson'],
        async (request: CreateVendorContactPersonRequest): Promise<AxiosResponse<string>> => {
            const response = await getVendorContactPersonApi().vendorContactPersonCreate('root', request);
            return response;
        },
    );
};

export const useUpdateVendorContactPerson = () => {
    return useMutation(
        ['updateVendorContactPerson'],
        async (request: UpdateVendorContactPersonRequest): Promise<AxiosResponse<string>> => {
            const response = await getVendorContactPersonApi().vendorContactPersonUpdate(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useDeleteVendorContactPerson = () => {
    return useMutation(['deleteVendorContactPerson'], async (id: string): Promise<string> => {
        const response = await getVendorContactPersonApi().vendorContactPersonDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<VendorContactPersonDto>): SearchVendorContactPersonsRequest => {
    const request: SearchVendorContactPersonsRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
    };

    const sorter = params.sorter as SorterResult<VendorContactPersonDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }
    return request;
};
