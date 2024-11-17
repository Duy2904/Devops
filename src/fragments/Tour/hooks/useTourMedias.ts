import { useMutation, useQueryClient } from 'react-query';

import { AppConfig } from '../../../utils/config.ts';
import { TourScheduleMediaApi } from '../../../../sdk/tour-operations/index.ts';
import { TourType } from '@src/types/TypeEnum.ts';
import { getAxiosInstance } from '../../../services/auth.ts';

export const getTourMediaApi = () => {
    return new TourScheduleMediaApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useCreateTourMedias = () => {
    return useMutation(
        ['createTourMedias'],
        async ({ tourScheduleId, file }: { tourScheduleId: string; file: File }): Promise<string> => {
            const response = await getTourMediaApi().tourScheduleMediaCreate('root', tourScheduleId, file);
            return response.data;
        },
    );
};

export const useDeleteTourMedia = (tourType: TourType) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['deleteTourMedia'],
        mutationFn: async (id: string): Promise<string> => {
            const response = await getTourMediaApi().tourScheduleMediaDelete(id, 'root');
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(tourType === TourType.FIT ? ['getTourFitByCode'] : ['getTourGitByCode']);
        },
    });
};
