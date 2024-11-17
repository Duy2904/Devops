import { useQuery } from 'react-query';

import i18n from '@src/i18n';

import { TitleLevelsIdentityApi } from '../apis';
import { TitleLevelsKey } from '../key-type';

export const useGetTitleLevels = (id: string) => {
    const requestFn = async () => {
        const response = await TitleLevelsIdentityApi().titleLevelsGetList(id, 'hnh');
        const data =
            response.data?.map(x => {
                const { id, name } = x;
                return { value: id ?? '', label: i18n.t(`agentAccount.${name}`) ?? '' };
            }) ?? [];

        return data;
    };

    return useQuery({
        queryKey: [TitleLevelsKey.fetchTitleLevels],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};
