import { Modal } from 'antd';
import { ReactNode } from 'react';

interface ModalConfirmProps {
    isOpenModal: boolean;
    handleConfirm: () => void;
    handleCancel: () => void;
    children: ReactNode;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = props => {
    const { isOpenModal, handleConfirm, handleCancel, children } = props;
    return (
        <Modal
            open={isOpenModal}
            cancelText="Quay lại"
            okText="Đồng ý"
            onOk={handleConfirm}
            onCancel={handleCancel}
            destroyOnClose={true}
            maskClosable={false}
        >
            {children}
        </Modal>
    );
};
