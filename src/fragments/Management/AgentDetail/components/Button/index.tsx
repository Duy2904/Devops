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
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useNavigate } from 'react-router-dom';
import { usePersonContactStore } from '@fragments/PersonContactForm/store/personContactStore';

interface ButtonAgentManagementFormProps {
    form: FormInstance;
    agentId?: string;
    submittable?: boolean;
    isEnableEdit?: boolean;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonAgentManagementForm: React.FC<ButtonAgentManagementFormProps> = props => {
    const { form, submittable, isEnableEdit, agentId, setIsOpenHistory } = props;
    const navigate = useNavigate();

    const { data: fetchPersonal } = useFetchPersonalIdentityInfo();

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
                    navigate(rootPaths.dashboard);
                },
            });
        } else {
            navigate(rootPaths.dashboard);
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

    return (
        <Flex gap={8} className="flex-wrap">
            <Can permissions={[MyPermissions.OwnerGroupUpdate]}>
                <>
                    {agentId && fetchPersonal?.isGlobal && (
                        <Button
                            className="text-xs"
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={handleSubmitForm}
                            disabled={!isEnableEdit}
                        >
                            {i18n.t('action.save')}
                        </Button>
                    )}
                </>
            </Can>
            {agentId && fetchPersonal?.isGlobal && (
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
