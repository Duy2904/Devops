import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormInstance, UploadFile } from 'antd';
import { useCreateAccount, useUpdateAccount } from '@fragments/Management/User/Hooks/mutates';

import { AnyObject } from 'antd/es/_util/type';
import { AxiosError } from 'axios';
import { CreateMessageId } from '@fragments/Management/User/Features/key-type';
import { FormTabsDetail } from './FormTabsDetail';
import { FormUploadAvatar } from './FormUploadAvatar';
import { MyPermissions } from '@utils/Permissions';
import { RcFile } from 'antd/es/upload';
import { STATUS_ERROR } from '@src/types/statusErrors';
import isEmpty from 'lodash/isEmpty';
import { rootPaths } from '@src/routers/route';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useFetchAccountDetail } from '@fragments/Management/User/Hooks/queries';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserUploadPhoto } from '@hooks/identity-next/mutates/useUser';

interface FormDetailProps {
    form: FormInstance;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setLoadingSubmit: Dispatch<SetStateAction<boolean>>;
    userId?: string;
    isOwner?: boolean;
}
export const FormDetail: React.FC<FormDetailProps> = props => {
    const { form, setIsEnableEdit, setLoadingSubmit, userId, isOwner } = props;
    const canChangeData = useHasAnyPermission([
        MyPermissions.AgentAccountCreate,
        MyPermissions.AgentAccountUpdate,
        MyPermissions.OwnerAccountCreate,
        MyPermissions.OwnerAccountUpdate,
    ]);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [fileUpload, setFileUpload] = useState<UploadFile[]>([]);

    const { data: fetchAccountDetail } = useFetchAccountDetail(userId!);
    const { data: fetchPersonalInfo } = useFetchPersonalIdentityInfo();
    const { mutateAsync: createAccount, isLoading: loadingCreate } = useCreateAccount();
    const { mutateAsync: updateAccount, isLoading: loadingUpdate } = useUpdateAccount();
    const { mutateAsync: userUploadPhoto } = useUserUploadPhoto();

    const handleOnValuesChange = () => {
        setIsEnableEdit(true);
    };

    const handleUploadPhoto = async (userId: string, values: AnyObject): Promise<string> => {
        const urlRes = !isEmpty(fileUpload[0])
            ? fileUpload[0]?.originFileObj
                ? await userUploadPhoto({ userId: userId, file: fileUpload[0]?.originFileObj as RcFile })
                : values?.imageUrl
            : '';
        return urlRes;
    };

    const handleCreateAccount = async (values: AnyObject) => {
        try {
            const resData = await createAccount({
                ...values,
                groupId: isOwner ? fetchPersonalInfo?.groups?.[0].groupId : values.groupId,
                userName: values?.email,
                includedAd: values.includedAd ?? true,
            });
            if (resData) {
                await handleUploadPhoto(resData.id!, values);
                navigate(`${isOwner ? rootPaths.userOwnerForm : rootPaths.userForm}/${resData.id!}`);
                setIsEnableEdit(false);
                if (resData.messageId == CreateMessageId.createAcc) {
                    return toastSuccess(t('message.default.success'), t('message.default.createContentSuccess'));
                }
                if (resData.messageId == CreateMessageId.assignAcc) {
                    return toastSuccess(
                        t('message.default.success'),
                        t('Tài khoản đã được gán quyền thành công. Vui lòng Đăng nhập bằng phương thức B2C'),
                    );
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.data?.Errors?.[0]?.ErrorCode?.Id === STATUS_ERROR.EXISTED_EMAIL_USED) {
                    const errorMsg = `Email đã được sử dụng, vui lòng liên hệ với người phụ trách để được hỗ trợ`;
                    form.setFields([
                        {
                            name: 'email',
                            errors: [errorMsg],
                        },
                    ]);
                }
            }
        }
    };

    const handleUpdateAccount = async (values: AnyObject) => {
        const resPhoto = await handleUploadPhoto(userId!, values);
        await updateAccount({
            ...values,
            imageUrl: resPhoto,
            groupId: isOwner ? fetchPersonalInfo?.groups?.[0].groupId : values.groupId,
            userName: values?.email,
            positionId: values?.positionId ?? null,
            departmentId: values?.departmentId ?? null,
        });
        setIsEnableEdit(false);
    };

    const onFinish = async (values: AnyObject) => {
        if (!values?.id) {
            handleCreateAccount(values);
        } else {
            handleUpdateAccount(values);
        }
        setLoadingSubmit(false);
    };

    useEffect(() => {
        if (fetchAccountDetail) {
            form.setFieldsValue(fetchAccountDetail);
        }
    }, [fetchAccountDetail, form]);

    useEffect(() => {
        setLoadingSubmit(loadingCreate || loadingUpdate);
    }, [loadingCreate, loadingUpdate, setLoadingSubmit]);

    return (
        <div className="flex flex-col relative">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4 xl:col-span-3 lg:h-[calc(100vh_-_165px)] overflow-auto rounded-lg">
                    <FormUploadAvatar
                        avatarUpload={fileUpload}
                        setAvatarUpload={setFileUpload}
                        dataAccount={fetchAccountDetail}
                        setIsEnableEdit={setIsEnableEdit}
                        canChangeData={canChangeData}
                    />
                </div>
                <div className="col-span-8 xl:col-span-9 lg:h-[calc(100vh_-_165px)] overflow-auto w-full rounded-lg">
                    <FormTabsDetail
                        form={form}
                        onValuesChange={handleOnValuesChange}
                        onFinish={onFinish}
                        isOwner={isOwner}
                        userId={userId}
                        dataAccount={fetchAccountDetail}
                        canChangeData={canChangeData}
                    />
                </div>
            </div>
        </div>
    );
};
