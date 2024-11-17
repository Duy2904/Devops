import { UserIdentityApi } from '../apis';
import { UserKey } from '../key-type';
import { useMutation } from 'react-query';

export const useUserUploadPhoto = () => {
    const requestFn = async ({ userId, file }: { userId: string; file: File }): Promise<string> => {
        const response = await UserIdentityApi().usersUpdateUserProfilePhoto(userId, 'hnh', 'mm', userId, file);
        return response.data;
    };

    return useMutation({
        mutationKey: [UserKey.userUploadPhoto],
        mutationFn: requestFn,
    });
};

export const useChangePassword = () => {
    const requestFn = async () => {
        const response = await UserIdentityApi().usersGetChangePasswordUrl();
        return response.data;
    };
    return useMutation({
        mutationKey: [UserKey.userChangePassword],
        mutationFn: requestFn,
    });
};
