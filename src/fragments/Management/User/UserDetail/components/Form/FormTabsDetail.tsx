import { Form, FormInstance, Tabs, TabsProps } from 'antd';

import { AnyObject } from 'antd/es/_util/type';
import { FormInfo } from './FormInfo';
import { GetAccountDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

interface FormTabsDetailProps {
    form: FormInstance;
    onValuesChange: () => void;
    // eslint-disable-next-line no-unused-vars
    onFinish: (values: AnyObject) => void;
    isOwner?: boolean;
    userId?: string;
    dataAccount?: GetAccountDto;
    canChangeData?: boolean;
}

export const FormTabsDetail: React.FC<FormTabsDetailProps> = props => {
    const { form, onValuesChange, onFinish, isOwner, userId, dataAccount, canChangeData } = props;

    const itemTab: TabsProps['items'] = [
        {
            forceRender: true,
            label: i18n.t('Thông tin'),
            key: 'information',
            children: (
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                    disabled={!canChangeData}
                >
                    <FormInfo
                        form={form}
                        isOwner={isOwner}
                        userId={userId}
                        dataAccount={dataAccount}
                        canChangeData={canChangeData}
                    />
                </Form>
            ),
        },
    ];

    return <Tabs type="card" items={itemTab} />;
};
