import { Document } from '@sdk/identity-next/models';
import { GroupsIdentityApi } from '../apis';
import { UploadKey } from '../key-type';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useMutation } from 'react-query';

export const useUploadPhoto = () => {
    const requestFn = async ({ id, file }: { id: string; file: File }): Promise<string> => {
        const response = await GroupsIdentityApi().groupsUpdateLogo(id, 'hnh', 'mm', file, id);
        return response.data;
    };

    return useMutation({
        mutationKey: [UploadKey.uploadPhoto],
        mutationFn: requestFn,
    });
};

export const useUploadDocuments = () => {
    const requestFn = async ({ id, document }: { id: string; document: File[] }): Promise<Document[]> => {
        const response = await GroupsIdentityApi().groupsUpdateAgentDocuments(id, 'hnh', 'mm', document);
        return response.data;
    };
    return useMutation({
        mutationKey: [UploadKey.uploadDocuments],
        mutationFn: requestFn,
    });
};

export const useDeleteDocument = () => {
    const requestFn = async ({ id, url }: { id: string; url: string }): Promise<boolean> => {
        const response = await GroupsIdentityApi().groupsDeleteDocuments(id, url, 'hnh');
        return response.data;
    };
    return useMutation({
        mutationKey: [UploadKey.deleteDocument],
        mutationFn: requestFn,
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.info'), i18n.t('message.tour.deleteMediaSuccess'));
        },
    });
};
