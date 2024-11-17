import {
    CreatePassengerTypeSeatsRequest,
    PassengerTypeSeatApi,
    UpdatePassengerTypeSeatsRequest,
} from '../../../sdk/tour-operations/index.ts';
import { useMutation } from 'react-query';
import { AppConfig } from '../../utils/config.ts';
import { getAxiosInstance } from '../../services/auth.ts';
import { AxiosResponse } from 'axios';

export const getPassengerTypeSeat = () => {
    return new PassengerTypeSeatApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useCreatePassengerTypeSeat = () => {
    return useMutation(
        ['createPassengerTypeSeat'],
        async (request: CreatePassengerTypeSeatsRequest): Promise<AxiosResponse<number>> => {
            const response = await getPassengerTypeSeat().passengerTypeSeatCreate('root', request);
            return response;
        },
    );
};

export const useUpdatePassengerTypeSeat = () => {
    return useMutation(
        ['updatePassengerTypeSeat'],
        async (request: UpdatePassengerTypeSeatsRequest): Promise<AxiosResponse<number>> => {
            const response = await getPassengerTypeSeat().passengerTypeSeatUpdate('root', request);
            return response;
        },
    );
};
