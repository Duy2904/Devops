import { Button, Flex } from 'antd';
import modal from 'antd/es/modal';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';

import { ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { rootPathsNew } from '@src/routers/newRoute';

interface ButtonActionProps {
    isEnableEdit: boolean;
    handleSubmit: () => void;
}

export const ButtonAction: React.FC<ButtonActionProps> = props => {
    const { isEnableEdit, handleSubmit } = props;

    const navigate = useNavigate();
    const { refundId } = useParams<string>();

    const handleBack = () => {
        modal.confirm({
            title: `${i18n.t('message.default.warning')}`,
            icon: <ExclamationCircleOutlined />,
            content: i18n.t('Bạn chưa lưu dữ liệu, bạn có muốn hủy thay đổi không?'),
            cancelText: i18n.t('action.back'),
            onOk: () => {
                if (refundId) {
                    navigate(`${rootPathsNew.refundViewDetail}/${refundId}`);
                } else {
                    navigate(rootPathsNew.refundList);
                }
            },
        });
    };

    return (
        <Flex align="center" justify="flex-end" gap={8}>
            {isEnableEdit && <p className={clsx('text-xs', Color.text_626262)}>{i18n.t('Thay đổi chưa được lưu')}</p>}
            <Button type="primary" onClick={handleSubmit} disabled={!isEnableEdit} icon={<SaveOutlined />}>
                {i18n.t('Lưu')}
            </Button>
            {isEnableEdit && <Button onClick={handleBack}>{i18n.t('Hủy thay đổi')}</Button>}
        </Flex>
    );
};
