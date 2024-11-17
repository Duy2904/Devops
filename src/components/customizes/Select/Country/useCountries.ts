import { CountryApi, PaginationResponseOfCountryDto } from '../../../../../sdk/tour-operations';

import { AppConfig } from '../../../../utils/config';
import { getAxiosInstance } from '../../../../services/auth';
import { useQuery } from 'react-query';

export const getCountriesApi = () => {
    return new CountryApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchCountries = () => {
    const response = async (): Promise<PaginationResponseOfCountryDto> => {
        const res = await getCountriesApi().countrySearch('root', {
            pageSize: 300,
        });
        return res.data;
    };
    return useQuery(['fetchCountries'], response, { refetchOnWindowFocus: false, staleTime: Infinity });
};
