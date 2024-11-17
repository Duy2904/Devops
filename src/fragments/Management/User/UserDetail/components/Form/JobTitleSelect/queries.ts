import { DropdownDto, PositionApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { PositionKey } from './key-type';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

const positionApi = new PositionApi(undefined, AppConfig.ApiHost, getAxiosInstance());

export const useFetchDropdownPosition = () => {
    const requestFn = async () => {
        const response = await positionApi.positionGetDropdown('root');
        const optionRes = response.data.map((item: DropdownDto) => {
            return { value: `${item.id}`, label: `${item.name}` };
        });
        return optionRes;
    };

    return useQuery({
        queryKey: [PositionKey.fetchDropdownPosition],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
