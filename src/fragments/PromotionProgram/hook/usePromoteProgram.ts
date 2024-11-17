import {
    CreateDiscountRequest,
    DiscountApi,
    DiscountDetailDto,
    DiscountDto,
    Filter,
    PaginationResponseOfDiscountDto,
    SaleOrderByDiscountIdDto,
    SearchDiscountRequest,
    TourFitApi,
    UpdateDiscountRequest,
} from '@sdk/tour-operations';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '../Feature';
import _ from 'lodash';
import dayjs from 'dayjs';
import { getAxiosInstance } from '@services/auth';

export const getPromoteProgramsApi = () => {
    return new DiscountApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchPromotionPrograms = (request: SearchDiscountRequest) => {
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(
        ['fetchPromotionProgram', JSON.stringify(customKey)],
        async (): Promise<PaginationResponseOfDiscountDto> => {
            const response = await getPromoteProgramsApi().discountSearch('root', request);
            return response.data;
        },
        { refetchOnWindowFocus: false },
    );
};

export const useMutatePromotionPrograms = () => {
    return useMutation(
        ['fetchMutatePromotionProgram'],
        async (request: SearchDiscountRequest): Promise<PaginationResponseOfDiscountDto> => {
            const response = await getPromoteProgramsApi().discountSearch('root', request);
            return response.data;
        },
    );
};

export const useFetchPromotionDetail = (id: string) => {
    return useQuery(
        ['fetchPromotionDetail', id],
        async (): Promise<DiscountDetailDto> => {
            const response = await getPromoteProgramsApi().discountGet(id, 'root');
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!id },
    );
};

export const useCreatePromotionDetail = () => {
    return useMutation(['createReceivableVoucherDetail'], async (request: CreateDiscountRequest) => {
        const dataFetch = await getPromoteProgramsApi().discountCreate('root', request);
        return dataFetch.data;
    });
};

export const useUpdatePromotionDetail = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation(
        ['updatePromotionDetail'],
        async (request: UpdateDiscountRequest) => {
            const dataFetch = await getPromoteProgramsApi().discountUpdate(request.id ?? '', 'root', request);
            return dataFetch.data ?? [];
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchPromotionDetail', id ?? '']);
            },
        },
    );
};

export const useDeletePromotionDetail = () => {
    return useMutation(['deletePromotionDetail'], async (id: string): Promise<string> => {
        const response = await getPromoteProgramsApi().discountDelete(id, 'root');
        return response.data;
    });
};

export const mapSearchRequest = (params: TableParams<DiscountDto>): SearchDiscountRequest => {
    const fromDateSearch = {
        field: params.typePromote == '1' ? 'createdOn' : 'startDate',
        operator: 'gte',
        value: dayjs(params.fromDate).startOf('day').utc().toDate(),
    };

    const endDateSearch = {
        field: params.typePromote == '1' ? 'createdOn' : 'endDate',
        operator: 'lte',
        value: dayjs(params.toDate).endOf('day').utc().toDate(),
    };

    const typeSearch = {
        field: 'type',
        operator: 'eq',
        value: params.typePromote,
    };

    const filtersSearch = [] as Filter[];
    if (params.fromDate && params.toDate) {
        filtersSearch.push(fromDateSearch, endDateSearch);
    }
    filtersSearch.push(typeSearch);

    const request: SearchDiscountRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        tourScheduleId: params.tourScheduleId,
        advancedFilter: {
            logic: 'and',
            filters: filtersSearch,
        },
    };

    const sorter = params.sorter as SorterResult<DiscountDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};

export const useSearchTourDiscount = () => {
    return useMutation(['fetchSearchTourDiscount'], async (request: AnyObject) => {
        const response = await getPromoteProgramsApi().discountSearchTourSchedules('root', request);

        const responseMap =
            response?.data?.data?.map(item => ({
                value: `${item.id}`,
                label: `${item.tourCode}-${item.name}`,
            })) ?? [];

        return responseMap;
    });
};

export const useGetSaleOrderOfDiscount = () => {
    return useMutation(['getSaleOrderOfDiscount'], async (id: string): Promise<SaleOrderByDiscountIdDto[]> => {
        const response = await getPromoteProgramsApi().discountGetSaleOrders(id, 'root');
        return response.data;
    });
};

export const useGetTourFitById = () => {
    const fetchRes = async (id: string) => {
        const response = await new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance()).tourFitGet(id, 'root');
        return response.data;
    };
    return useMutation({
        mutationKey: ['getTourFitById'],
        mutationFn: fetchRes,
    });
};
