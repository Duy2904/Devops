import {
    CreateVendorBankAccountRequest,
    PaginationResponseOfVendorBankAccountDto,
    SearchVendorBankAccountsRequest,
    UpdateVendorBankAccountRequest,
    VendorBankAccountApi,
    VendorBankAccountDto,
} from '../../../sdk/tour-operations';

import { AppConfig } from '../../utils/config';
import { AxiosResponse } from 'axios';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../../types/SearchResponse';
import { getAxiosInstance } from '../../services/auth';
import { useMutation } from 'react-query';

export const getVendorBankAccountApi = () => {
    return new VendorBankAccountApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetVendorBankAccounts = () => {
    return useMutation(
        ['getVendorBankAccounts'],
        async (request: SearchVendorBankAccountsRequest): Promise<PaginationResponseOfVendorBankAccountDto> => {
            const response = await getVendorBankAccountApi().vendorBankAccountSearch('root', request);
            return response.data;
        },
    );
};

export const useGetVendorBankAccount = () => {
    return useMutation(['getVendorBankAccount'], async (id: string): Promise<VendorBankAccountDto> => {
        const response = await getVendorBankAccountApi().vendorBankAccountGet(id, 'root');
        return response.data;
    });
};

export const useCreateVendorBankAccount = () => {
    return useMutation(
        ['createVendorBankAccount'],
        async (request: CreateVendorBankAccountRequest): Promise<AxiosResponse<string>> => {
            const response = await getVendorBankAccountApi().vendorBankAccountCreate('root', request);
            return response;
        },
    );
};

export const useUpdateVendorBankAccount = () => {
    return useMutation(
        ['updateVendorBankAccount'],
        async (request: UpdateVendorBankAccountRequest): Promise<AxiosResponse<string>> => {
            const response = await getVendorBankAccountApi().vendorBankAccountUpdate(request.id ?? '', 'root', request);
            return response;
        },
    );
};

export const useDeleteVendorBankAccount = () => {
    return useMutation(['deleteVendorBankAccount'], async (id: string): Promise<string> => {
        const response = await getVendorBankAccountApi().vendorBankAccountDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<VendorBankAccountDto>): SearchVendorBankAccountsRequest => {
    const request: SearchVendorBankAccountsRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        orderBy: [''],
    };

    const sorter = params.sorter as SorterResult<VendorBankAccountDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = [];
    }
    return request;
};
