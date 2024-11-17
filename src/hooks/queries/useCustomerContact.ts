import {
    CreateCustomerContactPersonRequest,
    CustomerContactPersonApi,
    CustomerContactPersonDto,
    PaginationResponseOfCustomerContactPersonDto,
    SearchCustomerContactPersonsRequest,
    UpdateCustomerContactPersonRequest,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../../types/SearchResponse';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getCustomerContactPersonApi = () => {
    return new CustomerContactPersonApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetCustomerContactsPerson = () => {
    return useMutation(
        ['getCustomerContactsPerson'],
        async (request: SearchCustomerContactPersonsRequest): Promise<PaginationResponseOfCustomerContactPersonDto> => {
            const response = await getCustomerContactPersonApi().customerContactPersonSearch('root', request);
            return response.data;
        },
    );
};

export const useGetCustomerContactPerson = () => {
    return useMutation(['getCustomerContactPerson'], async (id: string): Promise<CustomerContactPersonDto> => {
        const response = await getCustomerContactPersonApi().customerContactPersonGet(id, 'root');
        return response.data;
    });
};

export const useCreateCustomerContactPerson = () => {
    return useMutation(
        ['createCustomerContactPerson'],
        async (request: CreateCustomerContactPersonRequest): Promise<AxiosResponse<string>> => {
            const response = await getCustomerContactPersonApi().customerContactPersonCreate('root', request);
            return response;
        },
    );
};

export const useUpdateCustomerContactPerson = () => {
    return useMutation(
        ['updateCustomerContactPerson'],
        async (request: UpdateCustomerContactPersonRequest): Promise<AxiosResponse<string>> => {
            const response = await getCustomerContactPersonApi().customerContactPersonUpdate(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useDeleteCustomerContactPerson = () => {
    return useMutation(['deleteCustomerContactPerson'], async (id: string): Promise<string> => {
        const response = await getCustomerContactPersonApi().customerContactPersonDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (
    params: TableParams<CustomerContactPersonDto>,
): SearchCustomerContactPersonsRequest => {
    const request: SearchCustomerContactPersonsRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
    };

    const sorter = params.sorter as SorterResult<CustomerContactPersonDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }
    return request;
};
