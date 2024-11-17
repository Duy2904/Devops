import {
    CreateCustomerBankAccountRequest,
    CustomerBankAccountApi,
    CustomerBankAccountDto,
    PaginationResponseOfCustomerBankAccountDto,
    SearchCustomerBankAccountsRequest,
    UpdateCustomerBankAccountRequest,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../../types/SearchResponse';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getCustomerBankAccountApi = () => {
    return new CustomerBankAccountApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetCustomerBankAccounts = () => {
    return useMutation(
        ['getCustomerBankAccounts'],
        async (request: SearchCustomerBankAccountsRequest): Promise<PaginationResponseOfCustomerBankAccountDto> => {
            const response = await getCustomerBankAccountApi().customerBankAccountSearch('root', request);
            return response.data;
        },
    );
};

export const useGetCustomerBankAccount = () => {
    return useMutation(['getCustomerBankAccount'], async (id: string): Promise<CustomerBankAccountDto> => {
        const response = await getCustomerBankAccountApi().customerBankAccountGet(id, 'root');
        return response.data;
    });
};

export const useCreateCustomerBankAccount = () => {
    return useMutation(
        ['createCustomerBankAccount'],
        async (request: CreateCustomerBankAccountRequest): Promise<AxiosResponse<string>> => {
            const response = await getCustomerBankAccountApi().customerBankAccountCreate('root', request);
            return response;
        },
    );
};

export const useUpdateCustomerBankAccount = () => {
    return useMutation(
        ['updateCustomerBankAccount'],
        async (request: UpdateCustomerBankAccountRequest): Promise<AxiosResponse<string>> => {
            const response = await getCustomerBankAccountApi().customerBankAccountUpdate(
                request.id ?? '',
                'root',
                request,
            );
            return response;
        },
    );
};

export const useDeleteCustomerBankAccount = () => {
    return useMutation(['deleteCustomerBankAccount'], async (id: string): Promise<string> => {
        const response = await getCustomerBankAccountApi().customerBankAccountDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<CustomerBankAccountDto>): SearchCustomerBankAccountsRequest => {
    const request: SearchCustomerBankAccountsRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
    };

    const sorter = params.sorter as SorterResult<CustomerBankAccountDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }
    return request;
};
