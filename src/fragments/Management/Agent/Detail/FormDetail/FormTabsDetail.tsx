import { FormInstance, Tabs, TabsProps, UploadFile } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { AgentDto } from '@sdk/identity-next/models';
import i18n from '@src/i18n';
import { MyPermissions } from '@utils/Permissions';

import { FormAccounts } from './FormAccounts';
import { FormAttachment } from './FormAttachment';
import { FormInfo } from './FormInfo';
import { FormSettingPermission } from './FormSettingPermission';

interface FormTabsDetailProps {
    form: FormInstance;
    data?: AgentDto;
    documentsUpload: UploadFile[];
    isHasPermissionUpdate: boolean;
    setSubmittable: Dispatch<SetStateAction<boolean>>;
    setDocumentsUpload: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

export const FormTabsDetail: React.FC<FormTabsDetailProps> = props => {
    const { form, data, documentsUpload, isHasPermissionUpdate, setSubmittable, setDocumentsUpload } = props;
    const isShowAccountList = useHasAnyPermission([MyPermissions.AgentAccountView]);
    const itemTab: TabsProps['items'] = [
        {
            forceRender: true,
            label: i18n.t('Thông tin'),
            key: 'information',
            children: <FormInfo form={form} isHasPermissionUpdate={isHasPermissionUpdate} />,
        },
        {
            forceRender: true,
            label: i18n.t('Cài đặt'),
            key: 'setting',
            children: <FormSettingPermission form={form} setSubmittable={setSubmittable} />,
        },
        {
            forceRender: true,
            label: i18n.t('Tài liệu'),
            key: 'attachment',
            children: (
                <FormAttachment
                    data={data}
                    setSubmittable={setSubmittable}
                    documentsUpload={documentsUpload}
                    setDocumentsUpload={setDocumentsUpload}
                />
            ),
        },
    ];

    if (data && isShowAccountList) {
        itemTab.push({
            forceRender: true,
            label: i18n.t('Tài khoản'),
            key: 'accounts',
            children: <FormAccounts groupId={data?.id} />,
        });
    }

    return (
        <div>
            <Tabs type="card" items={itemTab} />
        </div>
    );
};
