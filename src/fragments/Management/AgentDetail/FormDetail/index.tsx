import { Dispatch, SetStateAction, useState } from 'react';
import { Form, FormInstance, UploadFile } from 'antd';
import _, { isEmpty } from 'lodash';
import { useUploadDocuments, useUploadPhoto } from '@hooks/identity-next/mutates/useUploadMedia';

import { AgentDto } from '@sdk/identity-next/models';
import { AnyObject } from 'antd/es/_util/type';
import { FormPaymentLimit } from './FormPaymentLimit';
import { FormTabsDetail } from './FormTabsDetail';
import { FormUploadAvatar } from './FormUploadAvatar';
import { MyPermissions } from '@utils/Permissions';
import { RcFile } from 'antd/es/upload';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useUpdateGroupAgent } from '@hooks/identity-next/mutates/useGroup';

interface AgentManagementFormDetailProps {
    form: FormInstance;
    formPaymentLimit: FormInstance;
    data: AgentDto | undefined;
    isEnableEdit: boolean;
    isDirty: boolean;
    agentId?: string;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
    setSubmittable: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AgentManagementFormDetail: React.FC<AgentManagementFormDetailProps> = props => {
    const { form, formPaymentLimit, isEnableEdit, isDirty, data, setIsEnableEdit, setIsDirty, setSubmittable } = props;

    const isHasPermissionUpdate = useHasAnyPermission([MyPermissions.OwnerGroupUpdate]);

    // State
    const [avatarUpload, setAvatarUpload] = useState<UploadFile[]>([]);
    const [documentsUpload, setDocumentsUpload] = useState<UploadFile[]>([]);

    // Mutate
    const { mutateAsync: updateAgent } = useUpdateGroupAgent();
    const { mutateAsync: uploadPhoto } = useUploadPhoto();
    const { mutateAsync: uploadDocuments } = useUploadDocuments();
    const { data: fetchPersonal } = useFetchPersonalIdentityInfo();

    const handleOnValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
            setSubmittable(true);
        }
        if (!isDirty) {
            setIsDirty(true);
            setSubmittable(true);
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

    const handleUpdateAgent = async (values: AnyObject) => {
        const resPhoto = await handleUploadPhoto(values.id!, values);

        await updateAgent({
            id: values.id ?? '',
            updateAgentRequest: {
                ..._.omit(values, ['permissions']),
                logo: resPhoto,
            },
        });
        await handleUploadDocuments(values.id!);
    };

    const onFinish = (values: AnyObject) => {
        handleUpdateAgent(values);

        setSubmittable(false);
        setIsEnableEdit(false);
    };

    return (
        <div className="flex flex-col relative">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-4 xl:col-span-3 lg:h-[calc(100vh_-_165px)] overflow-auto rounded-lg">
                    <FormUploadAvatar
                        avatarUpload={avatarUpload}
                        setAvatarUpload={setAvatarUpload}
                        data={data}
                        setIsEnableEdit={setIsEnableEdit}
                        disabled={!isHasPermissionUpdate}
                    />
                    <FormPaymentLimit form={formPaymentLimit} data={data} />
                </div>
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 lg:h-[calc(100vh_-_165px)] overflow-auto w-full rounded-lg">
                    <Form
                        form={form}
                        layout="vertical"
                        onValuesChange={handleOnValuesChange}
                        onFinish={onFinish}
                        disabled={!isHasPermissionUpdate || !fetchPersonal?.isGlobal}
                    >
                        <FormTabsDetail
                            data={data}
                            setIsEnableEdit={setIsEnableEdit}
                            documentsUpload={documentsUpload}
                            setDocumentsUpload={setDocumentsUpload}
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
};
