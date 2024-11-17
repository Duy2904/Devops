import { Modal } from 'antd';

interface ConfirmBackModal {
    title?: string;
    content?: string;
    isOpenModal: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleBack: () => void;
}

export const ConfirmBackModal: React.FC<ConfirmBackModal> = props => {
    const { isOpenModal, content, title, setIsModalOpen, handleBack } = props;

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        handleBack();
    };

    return (
        <Modal
            title={title}
            open={isOpenModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Xác nhận"
            cancelText="Hủy"
            destroyOnClose
        >
            <p>{content}</p>
        </Modal>
    );
};
