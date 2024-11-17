import {
    CreateCustomerAddressRequest,
    CustomerAddressApi,
    CustomerAddressDto,
    PaginationResponseOfCustomerAddressDto,
    SearchCustomerAddressesRequest,
    UpdateCustomerAddressRequest,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../../types/SearchResponse';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getCustomerAddressApi = () => {
    return new CustomerAddressApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetCustomerAddresses = () => {
    return useMutation(
        ['getCustomerAddresses'],
        async (request: SearchCustomerAddressesRequest): Promise<PaginationResponseOfCustomerAddressDto> => {
            const response = await getCustomerAddressApi().customerAddressSearch('root', request);
            return response.data;
        },
    );
};

export const useGetCustomerAddress = () => {
    return useMutation(['getCustomerAddress'], async (id: string): Promise<CustomerAddressDto> => {
        const response = await getCustomerAddressApi().customerAddressGet(id, 'root');
        return response.data;
    });
};

export const useCreateCustomerAddress = () => {
    return useMutation(
        ['createCustomerAddress'],
        async (request: CreateCustomerAddressRequest): Promise<AxiosResponse<string>> => {
            const response = await getCustomerAddressApi().customerAddressCreate('root', request);
            return response;
        },
    );
};

export const useUpdateCustomerAddress = () => {
    return useMutation(
        ['updateCustomerAddress'],
        async (request: UpdateCustomerAddressRequest): Promise<AxiosResponse<string>> => {
            const response = await getCustomerAddressApi().customerAddressUpdate(request.id ?? '', 'root', request);
            return response;
        },
    );
};

export const useDeleteCustomerAddress = () => {
    return useMutation(['deleteCustomerAddress'], async (id: string): Promise<string> => {
        const response = await getCustomerAddressApi().customerAddressDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<CustomerAddressDto>): SearchCustomerAddressesRequest => {
    const request: SearchCustomerAddressesRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
    };

    const sorter = params.sorter as SorterResult<CustomerAddressDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }
    return request;
};
