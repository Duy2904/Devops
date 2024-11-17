import {
    useAddPermissionGroupAgent,
    useCreateGroupAgent,
    useUpdateGroupAgent,
    useUpdatePermissionGroupAgent,
} from '@hooks/identity-next/mutates/useGroup';
import { Form, FormInstance, UploadFile } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { RcFile } from 'antd/es/upload';
import { AxiosError } from 'axios';
import _, { isEmpty, isNil } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AgentDto, CreateAgentPermissionsRequest } from '@sdk/identity-next/models';
import { useUploadDocuments, useUploadPhoto } from '@hooks/identity-next/mutates/useUploadMedia';
import { MyPermissions } from '@utils/Permissions';
import { STATUS_ERROR } from '@src/types/statusErrors';
import { autoAddDefaultPermissions } from '@utils/defaultPermissions';
import { calculateRemainingDays } from '@src/new/shared/utils/date';
import { rootPaths } from '@src/routers/route';
import { toastErr } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';

import { useActiveRole } from '../../hooks/mutates';
import { getRequest } from '../../Feature';
import { FormPaymentLimit } from './FormPaymentLimit';
import { FormTabsDetail } from './FormTabsDetail';
import { FormUploadAvatar } from './FormUploadAvatar';

interface AgentManagementFormDetailProps {
    form: FormInstance;
    formPaymentLimit: FormInstance;
    data: AgentDto | undefined;
    submittable: boolean;
    isDirty: boolean;
    agentId?: string;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
    setSubmittable: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AgentManagementFormDetail: React.FC<AgentManagementFormDetailProps> = props => {
    const { form, formPaymentLimit, submittable, isDirty, data, setIsDirty, setSubmittable } = props;
    const navigate = useNavigate();
    const isHasPermissionUpdate = useHasAnyPermission([MyPermissions.AgentCreate, MyPermissions.AgentUpdate]);

    // State
    const [avatarUpload, setAvatarUpload] = useState<UploadFile[]>([]);
    const [documentsUpload, setDocumentsUpload] = useState<UploadFile[]>([]);

    // Mutate
    const { mutateAsync: createAgent } = useCreateGroupAgent();
    const { mutateAsync: updateAgent } = useUpdateGroupAgent();
    const { mutateAsync: createAgentPermissions } = useAddPermissionGroupAgent();
    const { mutateAsync: updateAgentPermissions } = useUpdatePermissionGroupAgent();
    const { mutateAsync: uploadPhoto } = useUploadPhoto();
    const { mutateAsync: uploadDocuments } = useUploadDocuments();
    const { mutateAsync: activeRole } = useActiveRole();

    const handleOnValuesChange = () => {
        if (!submittable) {
            setSubmittable(true);
        }
        if (!isDirty) {
            setIsDirty(true);
            setSubmittable(true);
        }
    };

    const handleUploadPhoto = async (id: string, values: AnyObject) => {
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

    const createPermissionAgent = async (id: string, values: AnyObject) => {
        const request = getRequest(id, values);
        if (!isEmpty(request)) {
            await createAgentPermissions(request);
        } else {
            const defaultRequest: CreateAgentPermissionsRequest = {
                groupId: id,
                permissions: [...autoAddDefaultPermissions],
            };
            await createAgentPermissions(defaultRequest);
        }
    };

    const updatePermissionAgent = async (id: string, values: AnyObject) => {
        const request = getRequest(id, values);
        await updateAgentPermissions({ id, request });
    };

    const handleCreateAgent = async (values: AnyObject) => {
        try {
            const response = await createAgent({
                ..._.omit(values, ['permissions', 'employeeId']),
            });
            if (response) {
                form.setFieldValue('id', response.id);
                formPaymentLimit.setFieldValue('agentId', response.id);
                formPaymentLimit.submit();
                await createPermissionAgent(response?.id ?? '', values);
                await handleUploadPhoto(response.id!, values);
                await handleUploadDocuments(response.id!);
                navigate(`${rootPaths.agentForm}/${response?.id}`);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.data?.Errors?.[0]?.ErrorCode?.Id === STATUS_ERROR.EXISTED_EMAIL_CREATE_AGENT) {
                    const errorMsg = `Email bị trùng với email của đại lý ${
                        error?.response?.data?.Errors?.[0]?.ReferenceTo ?? ''
                    }, vui lòng kiểm tra lại`;
                    form.setFields([
                        {
                            name: 'email',
                            errors: [errorMsg],
                        },
                    ]);

                    toastErr('Thông báo', errorMsg);
                }
            }
        }
    };

    const handleUpdateAgent = async (values: AnyObject) => {
        const resPhoto = await handleUploadPhoto(values.id!, values);
        formPaymentLimit.submit();
        await updatePermissionAgent(values?.id ?? '', values);
        await handleUploadDocuments(values.id!);
        await updateAgent({
            id: values.id ?? '',
            updateAgentRequest: {
                ..._.omit(values, ['permissions', 'employeeId']),
                logo: resPhoto,
            },
        });

        const isInContractDate =
            calculateRemainingDays(values.effectiveDate) < 0 && calculateRemainingDays(values.expirationDate) > 0;
        if (values.isActive && !isNil(values.effectiveDate) && isInContractDate) {
            await activeRole(values.id);
        }
    };

    const onFinish = (values: AnyObject) => {
        if (!values.id) {
            handleCreateAgent(values);
        } else {
            handleUpdateAgent(values);
        }

        setSubmittable(false);
    };

    return (
        <div className="flex flex-col relative">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-4 xl:col-span-3 lg:h-[calc(100vh_-_165px)] overflow-auto rounded-lg">
                    <FormUploadAvatar
                        avatarUpload={avatarUpload}
                        setAvatarUpload={setAvatarUpload}
                        data={data}
                        setSubmittable={setSubmittable}
                        disabled={!isHasPermissionUpdate}
                    />
                    <FormPaymentLimit
                        form={formPaymentLimit}
                        formInfo={form}
                        setSubmittable={setSubmittable}
                        isHasPermissionUpdate={isHasPermissionUpdate}
                    />
                </div>
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 lg:h-[calc(100vh_-_165px)] overflow-auto w-full rounded-lg">
                    <Form
                        form={form}
                        layout="vertical"
                        onValuesChange={handleOnValuesChange}
                        onFinish={onFinish}
                        disabled={!isHasPermissionUpdate}
                    >
                        <FormTabsDetail
                            form={form}
                            data={data}
                            setSubmittable={setSubmittable}
                            documentsUpload={documentsUpload}
                            setDocumentsUpload={setDocumentsUpload}
                            isHasPermissionUpdate={isHasPermissionUpdate}
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
};
