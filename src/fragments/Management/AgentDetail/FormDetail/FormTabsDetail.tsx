import { Tabs, TabsProps, UploadFile } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { AgentDto } from '@sdk/identity-next/models';
import i18n from '@src/i18n';

import { FormAttachment } from './FormAttachment';
import { FormInfo } from './FormInfo';

interface FormTabsDetailProps {
    data?: AgentDto;
    documentsUpload: UploadFile[];
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setDocumentsUpload: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

export const FormTabsDetail: React.FC<FormTabsDetailProps> = props => {
    const { data, documentsUpload, setIsEnableEdit, setDocumentsUpload } = props;
    const itemTab: TabsProps['items'] = [
        {
            forceRender: true,
            label: i18n.t('Thông tin'),
            key: 'information',
            children: <FormInfo />,
        },
        {
            forceRender: true,
            label: i18n.t('Tài liệu'),
            key: 'attachment',
            children: (
                <FormAttachment
                    data={data}
                    setIsEnableEdit={setIsEnableEdit}
                    documentsUpload={documentsUpload}
                    setDocumentsUpload={setDocumentsUpload}
                />
            ),
        },
    ];

    return (
        <div>
            <Tabs type="card" items={itemTab} />
        </div>
    );
};
