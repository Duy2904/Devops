import { AppConfig } from '@utils/config';
import { PersonalIdentityApi } from '../apis';
import { PersonalKey } from '../key-type';
import { UserDetailsDto } from '@sdk/identity-next/models';
import { useQuery } from 'react-query';

export const useFetchPersonalIdentityInfo = () => {
    const requestFn = async (): Promise<UserDetailsDto> => {
        const response = await PersonalIdentityApi().personalGetProfile('hnh', AppConfig.AppSource);
        return response.data;
    };
    return useQuery({
        queryKey: [PersonalKey.fetchPersonal],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
    });
};
