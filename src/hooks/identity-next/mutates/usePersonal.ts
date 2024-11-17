import { useMutation, useQueryClient } from 'react-query';

import { PersonalIdentityApi } from '../apis';
import { PersonalKey } from '../key-type';
import { UpdateProfileRequest } from '@sdk/identity-next/models';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';

export const useUpdatePersonal = () => {
    const queryClient = useQueryClient();
    const requestFn = async (request: UpdateProfileRequest) => {
        const response = await PersonalIdentityApi().personalUpdateProfile(request);
        return response.data;
    };

    return useMutation({
        mutationKey: [PersonalKey.updatePersonal],
        mutationFn: requestFn,
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.updateContentSuccess'));
            queryClient.invalidateQueries([PersonalKey.fetchPersonal]);
        },
    });
};
