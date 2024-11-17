import { Button, Flex, FormInstance } from 'antd';
import { ExclamationCircleOutlined, FieldTimeOutlined, SaveOutlined } from '@ant-design/icons';

import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import modal from 'antd/es/modal';
import { rootPaths } from '@src/routers/route';
import { toastWarning } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonContactStore } from '@fragments/PersonContactForm/store/personContactStore';

interface ButtonAgentManagementFormProps {
    form: FormInstance;
    agentId?: string;
    submittable?: boolean;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonAgentManagementForm: React.FC<ButtonAgentManagementFormProps> = props => {
    const { form, agentId, submittable, setIsOpenHistory } = props;
    const navigate = useNavigate();

    // Store
    const {
        personContactDetail,
        isCreatingPersonContact,
        actions: { setIsCreatingPersonContact },
    } = usePersonContactStore(state => state);

    const handleBack = () => {
        if (submittable) {
            modal.confirm({
                title: `${i18n.t('message.default.warning')}`,
                icon: <ExclamationCircleOutlined />,
                content: i18n.t('Bạn chưa lưu dữ liệu, bạn có muốn thoát không?'),
                cancelText: i18n.t('action.back'),
                onOk: () => {
                    navigate(rootPaths.agentList);
                },
            });
        } else {
            navigate(rootPaths.agentList);
        }
    };

    const handleSubmitForm = useDebouncedCallback(
        () => {
            form.validateFields({ validateOnly: true }).then(
                () => {
                    form.submit();
                },
                () => {
                    form.submit();
                    toastWarning(i18n.t('message.default.warning'), i18n.t('validation.default.validDefault'));
                },
            );
        },
        500,
        { leading: true, trailing: false },
    );

    // submit form after create person contact success in personContactForm
    useEffect(() => {
        if (isCreatingPersonContact && !isEmpty(personContactDetail)) {
            handleSubmitForm();
            setIsCreatingPersonContact(false);
        }
    }, [handleSubmitForm, isCreatingPersonContact, personContactDetail, setIsCreatingPersonContact]);

    const needPermissions = agentId ? [MyPermissions.AgentUpdate] : [MyPermissions.AgentCreate];

    return (
        <Flex gap={8} className="flex-wrap">
            <Can permissions={needPermissions}>
                <Button
                    className="text-xs"
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSubmitForm}
                    disabled={!submittable}
                >
                    {i18n.t('action.save')}
                </Button>
            </Can>
            {agentId && (
                <Button className="text-xs" icon={<FieldTimeOutlined />} onClick={() => setIsOpenHistory(true)}>
                    {i18n.t('Lịch sử')}
                </Button>
            )}
            <Button className="text-xs" onClick={handleBack}>
                {i18n.t('Quay lại')}
            </Button>
        </Flex>
    );
};
