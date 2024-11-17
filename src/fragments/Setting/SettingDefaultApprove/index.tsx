import { Button, Col, Form } from 'antd';
import React, { useCallback, useState } from 'react';

import Can from '@components/common/Can';
import { HeadContent } from '@components/ui/HeadContent';
import { Header } from './components/Header';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { SaveOutlined } from '@ant-design/icons';
import { SettingDefaultApproveForm } from './components/Form';
import { TitleHeader } from '@components/ui/TitleHeader';
import debounce from 'lodash/debounce';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';

export const SettingDefaultApprove: React.FC = () => {
    const navigate = useNavigate();
    const [defaultApproveForm] = Form.useForm();

    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);

    const onSubmit = debounce(
        async () => {
            let isSuccess = true;

            await defaultApproveForm.validateFields().catch(() => {
                isSuccess = false;
            });

            if (isSuccess) {
                defaultApproveForm.submit();
            }
        },
        2000,
        { leading: true, trailing: false },
    );

    const onBack = useCallback(() => navigate(`${rootPaths.dashboard}`), [navigate]);

    return (
        <Col>
            <HeadContent
                slugContent={<Header />}
                titleContent={<TitleHeader title={'Thiết lập mặc định duyệt'} />}
                buttonActionList={
                    <>
                        <Can permissions={[MyPermissions.ApprovalUpdate]}>
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
            <SettingDefaultApproveForm
                form={defaultApproveForm}
                isEnableEdit={isEnableEdit}
                setIsEnableEdit={setIsEnableEdit}
            />
        </Col>
    );
};
