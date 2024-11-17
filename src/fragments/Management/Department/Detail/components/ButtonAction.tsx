import { Button, Flex, FormInstance } from 'antd';

import Can from '@components/common/Can';
import { ConfirmBackModal } from '@components/ui/Modal/ConfirmBackModal';
import { MyPermissions } from '@utils/Permissions';
import { SaveOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';
import { useState } from 'react';

export interface ButtonActionProps {
    form: FormInstance;
    updateLoading?: boolean;
    isDataChange?: boolean;
    setIsDataChange: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDepartmentId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ButtonAction: React.FC<ButtonActionProps> = props => {
    const { form, updateLoading, isDataChange, setIsDataChange, setIsModalOpen, setDepartmentId } = props;

    // State
    const [isOpenConfirmBack, setIsOpenConfirmBack] = useState<boolean>(false);

    const handleClickBackBtn = () => {
        if (isDataChange) {
            setIsOpenConfirmBack(true);
        } else {
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setDepartmentId(undefined);
        setIsDataChange(false);
        form.resetFields();
    };

    return (
        <Flex className="mt-4" align="center" justify="end" gap={8}>
            <Can permissions={[MyPermissions.DepartmentCreate, MyPermissions.DepartmentUpdate]}>
                <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => form.submit()}
                    loading={updateLoading}
                    disabled={updateLoading || !isDataChange}
                >
                    {i18n.t('action.save')}
                </Button>
            </Can>
            <Button type="default" onClick={handleClickBackBtn}>
                {i18n.t('action.back')}
            </Button>
            <ConfirmBackModal
                title={i18n.t(`quote.modal.backModal.title`)}
                content={i18n.t(`quote.modal.backModal.content`)}
                isOpenModal={isOpenConfirmBack}
                setIsModalOpen={setIsOpenConfirmBack}
                handleBack={handleCloseModal}
            />
        </Flex>
    );
};
