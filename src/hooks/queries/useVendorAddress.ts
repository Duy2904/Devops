import {
    CreateVendorAddressRequest,
    PaginationResponseOfVendorAddressDto,
    SearchVendorAddressesRequest,
    UpdateVendorAddressRequest,
    VendorAddressApi,
    VendorAddressDto,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../../types/SearchResponse';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getVendorAddressApi = () => {
    return new VendorAddressApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetVendorAddresses = () => {
    return useMutation(
        ['getVendorAddresses'],
        async (request: SearchVendorAddressesRequest): Promise<PaginationResponseOfVendorAddressDto> => {
            const response = await getVendorAddressApi().vendorAddressSearch('root', request);
            return response.data;
        },
    );
};

export const useGetVendorAddress = () => {
    return useMutation(['getVendorAddress'], async (id: string): Promise<VendorAddressDto> => {
        const response = await getVendorAddressApi().vendorAddressGet(id, 'root');
        return response.data;
    });
};

export const useCreateVendorAddress = () => {
    return useMutation(
        ['createVendorAddress'],
        async (request: CreateVendorAddressRequest): Promise<AxiosResponse<string>> => {
            const response = await getVendorAddressApi().vendorAddressCreate('root', request);
            return response;
        },
    );
};

export const useUpdateVendorAddress = () => {
    return useMutation(
        ['updateVendorAddress'],
        async (request: UpdateVendorAddressRequest): Promise<AxiosResponse<string>> => {
            const response = await getVendorAddressApi().vendorAddressUpdate(request.id ?? '', 'root', request);
            return response;
        },
    );
};

export const useDeleteVendorAddress = () => {
    return useMutation(['deleteVendorAddress'], async (id: string): Promise<string> => {
        const response = await getVendorAddressApi().vendorAddressDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<VendorAddressDto>): SearchVendorAddressesRequest => {
    const request: SearchVendorAddressesRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
    };

    const sorter = params.sorter as SorterResult<VendorAddressDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }
    return request;
};
