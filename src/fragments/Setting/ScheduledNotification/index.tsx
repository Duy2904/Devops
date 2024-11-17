import { Button, Col, Form } from 'antd';
import { useCallback, useState } from 'react';

import Can from '@components/common/Can';
import { HeadContent } from '@components/ui/HeadContent';
import { Header } from './components/Header';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { SaveOutlined } from '@ant-design/icons';
import { ScheduledNotificationForm } from './components/Form';
import { TitleHeader } from '@components/ui/TitleHeader';
import debounce from 'lodash/debounce';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';

export const ScheduledNotification: React.FC = () => {
    const navigate = useNavigate();
    const [scheduledNotificationForm] = Form.useForm();

    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);

    const onSubmit = debounce(
        async () => {
            let isSuccess = true;

            await scheduledNotificationForm.validateFields().catch(() => {
                isSuccess = false;
            });
            if (isSuccess) {
                scheduledNotificationForm.submit();
            }
        },
        1000,
        { leading: true, trailing: false },
    );

    const onBack = useCallback(() => navigate(`${rootPaths.dashboard}`), [navigate]);

    return (
        <Col>
            <HeadContent
                slugContent={<Header />}
                titleContent={
                    <Col>
                        <TitleHeader title={i18n.t('setting.scheduledNotification.table.tableName')} />
                        <p className="pt-2 text-xs">Thiết lập thời gian nhắc trước các ngày đến hạn</p>
                    </Col>
                }
                buttonActionList={
                    <>
                        <Can permissions={[MyPermissions.NotificationSettingUpdate]}>
                            <Button
                                className="text-xs"
                                type="primary"
                                onClick={onSubmit}
                                icon={<SaveOutlined />}
                                disabled={!isEnableEdit}
                            >
                                {i18n.t('action.save')}
                            </Button>
                        </Can>
                        <Button className="text-xs" onClick={onBack}>
                            {i18n.t('action.back')}
                        </Button>
                    </>
                }
            />
            <ScheduledNotificationForm
                form={scheduledNotificationForm}
                isEnableEdit={isEnableEdit}
                setIsEnableEdit={setIsEnableEdit}
            />
        </Col>
    );
};
