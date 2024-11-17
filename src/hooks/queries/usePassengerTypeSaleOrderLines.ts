import { useMutation } from "react-query"
import { AppConfig } from "../../utils/config"
import { getAxiosInstance } from "../../services/auth"
import { AxiosResponse } from "axios"
import { CreateSaleOrderLinePassengerRequest, PaginationResponseOfSaleOrderLinePassengerDto, SaleOrderLinePassengerApi, SearchSaleOrderLinePassengersRequest, UpdateSaleOrderLinePassengerRequest } from "../../../sdk/tour-operations"

export const useGetPassengerTypeSaleOrderLines = () => {
    return useMutation(
        ['getPassengerTypeSaleOrderLines'],
        async (request: SearchSaleOrderLinePassengersRequest) : Promise<PaginationResponseOfSaleOrderLinePassengerDto> => {
            const response = await new SaleOrderLinePassengerApi(undefined, AppConfig.ApiHost, getAxiosInstance())
                    .saleOrderLinePassengerSearch('root', request);
            return response.data;
        }
    )
}

export const useCreatePassengerTypeSaleOrderLine = () => {
    return useMutation(
        ['createPassengerTypeSaleOrderLine'],
        async (request: CreateSaleOrderLinePassengerRequest) : Promise<AxiosResponse<string>> => {
            const response = await new SaleOrderLinePassengerApi(undefined, AppConfig.ApiHost, getAxiosInstance())
                    .saleOrderLinePassengerCreate('root', request);
            return response;
        }
    )
}

export const useUpdatePassengerTypeSaleOrderLine = () => {
    return useMutation(
        ['updatePassengerTypeSaleOrderLine'],
        async (request: UpdateSaleOrderLinePassengerRequest) : Promise<AxiosResponse<string>> => {
            const response = await new SaleOrderLinePassengerApi(undefined, AppConfig.ApiHost, getAxiosInstance())
                    .saleOrderLinePassengerUpdate(request.id ?? '', 'root', request);
            return response;
        }
    )
}

export const useDeletePassengerTypeSaleOrderLine = () => {
    return useMutation(
        ['deletePassengerTypeSaleOrderLine'],
        async (id: string) : Promise<string> => {
            const response = await new SaleOrderLinePassengerApi(undefined, AppConfig.ApiHost, getAxiosInstance())
                    .saleOrderLinePassengerDelete(id, 'root');
            return response.data;
        }
    )
}