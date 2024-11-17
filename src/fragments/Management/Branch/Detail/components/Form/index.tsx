import { BranchDto, CreateBranchRequest, UpdateBranchRequest } from '@sdk/identity-next/models';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormInstance, UploadFile } from 'antd';
import { useCreateBranch, useUpdateBranch } from '@hooks/identity-next/mutates/useBranch';
import { useUploadDocuments, useUploadPhoto } from '@hooks/identity-next/mutates/useUploadMedia';

import { AnyObject } from 'antd/es/_util/type';
import { FormTabsDetail } from './FormTabsDetail';
import { FormUploadAvatar } from './FormUploadAvatar';
import { MyPermissions } from '@utils/Permissions';
import { RcFile } from 'antd/es/upload';
import isEmpty from 'lodash/isEmpty';
import { rootPaths } from '@src/routers/route';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useNavigate } from 'react-router-dom';

interface FormDetailProps {
    form: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<boolean>>;
    branchId?: string;
    dataBranch?: BranchDto;
}
export const FormDetail: React.FC<FormDetailProps> = props => {
    const { form, isEnableEdit, setIsEnableEdit, setIsSubmitting, setLoadingSubmit, branchId, dataBranch } = props;
    const canChangeData = useHasAnyPermission([MyPermissions.BranchCreate, MyPermissions.BranchUpdate]);

    const navigate = useNavigate();
    const [avatarUpload, setAvatarUpload] = useState<UploadFile[]>([]);
    const [documentsUpload, setDocumentsUpload] = useState<UploadFile[]>([]);

    const { mutateAsync: createBranch, isLoading: loadingCreate } = useCreateBranch();
    const { mutateAsync: updateBranch, isLoading: loadingUpdate } = useUpdateBranch();
    const { mutateAsync: uploadPhoto, isLoading: loadingUploadPhoto } = useUploadPhoto();
    const { mutateAsync: uploadDocuments, isLoading: loadingUploadDocuments } = useUploadDocuments();

    const handleOnValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    const handleUploadPhoto = async (id: string, values: AnyObject): Promise<string> => {
        const urlRes = !isEmpty(avatarUpload[0])
            ? avatarUpload[0]?.originFileObj
                ? await uploadPhoto({ id: id, file: avatarUpload[0]?.originFileObj as RcFile })
                : values?.logo
            : '';
        return urlRes;
    };

    const handleUploadDocuments = async (id: string) => {
        const documentsOriginFile = !isEmpty(documentsUpload) && documentsUpload.filter(item => !item.url);
        if (!isEmpty(documentsOriginFile)) {
            await uploadDocuments({ id: id, document: documentsOriginFile as RcFile[] });
        }
    };

    const handleCreateBranch = async (values: CreateBranchRequest) => {
        const response = await createBranch(values);
        if (response) {
            await handleUploadPhoto(response.id!, values);
            await handleUploadDocuments(response.id!);
            navigate(`${rootPaths.branchForm}/${response.id}`);
        }
    };

    const handleUpdateBranch = async (values: UpdateBranchRequest) => {
        const resPhoto = await handleUploadPhoto(branchId!, values);
        await handleUploadDocuments(branchId!);
        await updateBranch({ id: branchId ?? '', updateRequest: { ...values, logo: resPhoto } });
        setDocumentsUpload([]);
    };

    const onFinish = (values: AnyObject) => {
        if (!values.id) {
            handleCreateBranch(values);
        } else {
            handleUpdateBranch(values);
        }
        setIsSubmitting(false);
        setIsEnableEdit(false);
    };

    useEffect(() => {
        setLoadingSubmit(loadingCreate || loadingUpdate || loadingUploadPhoto || loadingUploadDocuments ? true : false);
    }, [loadingCreate, loadingUpdate, loadingUploadDocuments, loadingUploadPhoto, setLoadingSubmit]);

    return (
        <div className="flex flex-col relative">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-4 xl:col-span-3 lg:h-[calc(100vh_-_165px)] overflow-auto rounded-lg">
                    <FormUploadAvatar
                        avatarUpload={avatarUpload}
                        setAvatarUpload={setAvatarUpload}
                        dataBranch={dataBranch}
                        setIsEnableEdit={setIsEnableEdit}
                        canChangeData={canChangeData}
                    />
                </div>
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 lg:h-[calc(100vh_-_165px)] overflow-auto w-full rounded-lg">
                    <FormTabsDetail
                        form={form}
                        dataBranch={dataBranch}
                        onValuesChange={handleOnValuesChange}
                        onFinish={onFinish}
                        setIsEnableEdit={setIsEnableEdit}
                        documentsUpload={documentsUpload}
                        setDocumentsUpload={setDocumentsUpload}
                        canChangeData={canChangeData}
                    />
                </div>
            </div>
        </div>
    );
};
