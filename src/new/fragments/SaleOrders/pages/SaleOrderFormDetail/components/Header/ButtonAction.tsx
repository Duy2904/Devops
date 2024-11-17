import { Button, Flex } from 'antd';
import modal from 'antd/es/modal';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { OrderStatus, SaleOrderDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import Can from '@src/new/components/common/Can';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { MyPermissions } from '@src/new/shared/utils/Permissions';
import { rootPathsNew } from '@src/routers/newRoute';

interface ButtonActionProps {
    dataSO?: SaleOrderDto;
    isEnableEdit: boolean;
    handleSubmit: () => void;
}

export const ButtonAction: React.FC<ButtonActionProps> = props => {
    const { dataSO, isEnableEdit, handleSubmit } = props;

    const navigate = useNavigate();
    const { soId } = useParams<string>();

    const handleBack = () => {
        modal.confirm({
            title: `${i18n.t('message.default.warning')}`,
            icon: <ExclamationCircleOutlined />,
            content: i18n.t('Bạn chưa lưu dữ liệu, bạn có muốn hủy thay đổi không?'),
            cancelText: i18n.t('action.back'),
            onOk: () => {
                if (soId) {
                    navigate(`${rootPathsNew.saleOrderViewDetail}/${soId}`);
                } else {
                    navigate(rootPathsNew.saleOrders);
                }
            },
        });
    };

    const shouldHideSaveBtn = useMemo(
        () =>
            dataSO?.status === OrderStatus.Canceled ||
            dataSO?.status === OrderStatus.WaitRefund ||
            dataSO?.status === OrderStatus.SendRefund ||
            dataSO?.status === OrderStatus.CompletedRefund,
        [dataSO?.status],
    );

    return (
        <Flex align="center" justify="flex-end" gap={8}>
            {isEnableEdit && <p className={clsx('text-xs', Color.text_626262)}>{i18n.t('Thay đổi chưa được lưu')}</p>}
            {!shouldHideSaveBtn && (
                <>
                    <Can
                        permissions={[
                            MyPermissions.SaleOrderCreate,
                            MyPermissions.SaleOrderUpdate,
                            MyPermissions.AgencySaleOrderCreate,
                            MyPermissions.AgencySaleOrderUpdate,
                        ]}
                    >
                        <Button type="primary" onClick={handleSubmit} disabled={!isEnableEdit} icon={<SaveOutlined />}>
                            {i18n.t('Lưu')}
                        </Button>
                    </Can>
                    {isEnableEdit && <Button onClick={handleBack}>{i18n.t('Hủy thay đổi')}</Button>}
                </>
            )}
        </Flex>
    );
};
