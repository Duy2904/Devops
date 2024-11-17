import { AppConfig } from '@utils/config';
import { TagApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getTagsApi = () => {
    return new TagApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchTags = () => {
    const requestFn = async () => {
        const res = await getTagsApi().tagSearchDislayFilterPane('root', {});
        return res.data;
    };
    return useQuery({
        queryKey: ['FETCH_TAGS_CHECKBOX'],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
