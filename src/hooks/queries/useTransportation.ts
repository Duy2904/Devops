import { useMutation } from 'react-query';
import { PaginationResponseOfVatDto, TransportationApi } from '../../../sdk/tour-operations';
import { getAxiosInstance } from '../../services/auth';
import { AppConfig } from '../../utils/config';

export const getTransportationApi = () => {
    return new TransportationApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetTransportations = () => {
    return useMutation(['getTransportations'], async (): Promise<PaginationResponseOfVatDto> => {
        const response = await getTransportationApi().transportationSearch('root', {
            pageSize: 10,
        });
        return response.data;
    });
};
