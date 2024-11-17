import { Dispatch, Fragment, SetStateAction } from 'react';
import { Form, FormInstance, Tabs, TabsProps, UploadFile } from 'antd';

import { AnyObject } from 'antd/es/_util/type';
import { BranchDto } from '@sdk/identity-next/models';
import { FormAttachment } from './FormAttachment';
import { FormInfo } from './FormInfo';
import i18n from '@src/i18n';

interface FormTabsDetailProps {
    form: FormInstance;
    dataBranch?: BranchDto;
    documentsUpload: UploadFile[];
    onValuesChange: () => void;
    // eslint-disable-next-line no-unused-vars
    onFinish: (values: AnyObject) => void;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setDocumentsUpload: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    canChangeData?: boolean;
}

export const FormTabsDetail: React.FC<FormTabsDetailProps> = props => {
    const {
        form,
        dataBranch,
        documentsUpload,
        onValuesChange,
        onFinish,
        setIsEnableEdit,
        setDocumentsUpload,
        canChangeData,
    } = props;

    const itemTab: TabsProps['items'] = [
        {
            forceRender: true,
            label: <Fragment>{i18n.t('Thông tin')}</Fragment>,
            key: 'information',
            children: (
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                    disabled={!canChangeData}
                >
                    <FormInfo form={form} dataBranch={dataBranch} setIsEnableEdit={setIsEnableEdit} />
                </Form>
            ),
        },
        {
            forceRender: true,
            label: i18n.t('Tài liệu'),
            key: 'attachment',
            children: (
                <FormAttachment
                    dataBranch={dataBranch}
                    setIsEnableEdit={setIsEnableEdit}
                    documentsUpload={documentsUpload}
                    setDocumentsUpload={setDocumentsUpload}
                    canChangeData={canChangeData}
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
