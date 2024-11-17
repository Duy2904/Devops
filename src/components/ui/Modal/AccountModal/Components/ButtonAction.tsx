import { Button, Flex, FormInstance } from 'antd';

import { ConfirmBackModal } from '../../ConfirmBackModal';
import { SaveOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';
import { useState } from 'react';

export interface ButtonActionProps {
    form: FormInstance;
    updateLoading?: boolean;
    isDataChange?: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDataChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonAction: React.FC<ButtonActionProps> = props => {
    const { form, updateLoading, isDataChange, setIsModalOpen, setIsDataChange } = props;

    const [isOpenConfirmBack, setIsOpenConfirmBack] = useState<boolean>(false);

    const handleClickBackBtn = () => {
        if (isDataChange) {
            setIsOpenConfirmBack(true);
        } else {
            handleBack();
        }
    };

    const handleBack = () => {
        setIsModalOpen(false);
        setIsDataChange(false);
        form.resetFields();
    };

    return (
        <Flex className="mt-4" align="center" justify="end" gap={8}>
            <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
                loading={updateLoading}
                disabled={updateLoading || !isDataChange}
            >
                {i18n.t('action.save')}
            </Button>
            <Button type="default" onClick={handleClickBackBtn}>
                {i18n.t('action.back')}
            </Button>
            <ConfirmBackModal
                title={i18n.t(`quote.modal.backModal.title`)}
                content={i18n.t(`quote.modal.backModal.content`)}
                isOpenModal={isOpenConfirmBack}
                setIsModalOpen={setIsOpenConfirmBack}
                handleBack={handleBack}
            />
        </Flex>
    );
};
