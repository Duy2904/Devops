import dayjs from 'dayjs';
import { useMutation } from 'react-query';

import {
    DiscountApi,
    EstimateDiscountRequest,
    EstimateDiscountResponse,
    PaginationResponseOfDiscountDto,
    SaleOrderApi,
    SearchDiscountRequest,
} from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@src/new/shared/utils/config';

import QueryKeys from './query-keys';

export const useGetDiscountList = (request: SearchDiscountRequest, tourId: string | undefined) => {
    return useMutation([QueryKeys.GET_DISCOUNTS], async (type: string): Promise<PaginationResponseOfDiscountDto> => {
        request.activeDate = dayjs().startOf('day').utc().toDate();

        const response = await new DiscountApi(undefined, AppConfig.ApiHost, getAxiosInstance()).discountSearch(
            'root',
            {
                ...request,
                tourScheduleId: tourId,
                advancedFilter: {
                    logic: 'and',
                    filters: [
                        {
                            field: 'isActive',
                            operator: 'eq',
                            value: 'true',
                        },

                        {
                            field: 'type',
                            operator: 'eq',
                            value: type,
                        },
                    ],
                },
            },
        );

        return response.data;
    });
};

export const useGetEstimateDiscount = () => {
    return useMutation(
        [QueryKeys.GET_ESTIMATE_DISCOUNTS],
        async (request: EstimateDiscountRequest): Promise<EstimateDiscountResponse> => {
            const response = await new SaleOrderApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).saleOrderEstimateDiscount('root', request);
            return response.data;
        },
    );
};