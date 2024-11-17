import { Button, Space } from 'antd';
import { ClockCircleOutlined, DiffOutlined, PlusOutlined } from '@ant-design/icons';
import { MouseEventHandler, ReactNode } from 'react';

import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { SearchSaleOrderViewDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchTableStore } from '@store/searchTableStore';

interface ListActionProps {
    isShowApproveButton?: boolean;
    isShowRequestButton?: boolean;
    isShowCreateReceivableVoucher?: boolean;
    isShowCreateRefundVoucher?: boolean;
    isShowRequestRefundButton?: boolean;
    isShowApproveRefundButton?: boolean;
    setIsOpenConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    tourInfo?: SearchSaleOrderViewDto;
    soId: string;
}

interface ButtonProps {
    handleButton: MouseEventHandler<HTMLElement> | undefined;
    icon: ReactNode;
    content: string;
    isLoading: boolean;
}

const ButtonAction: React.FC<ButtonProps> = props => {
    return (
        <Button
            className="!text-xs"
            type="default"
            size="small"
            icon={props.icon}
            onClick={props.handleButton}
            loading={props.isLoading}
        >
            {props.content}
        </Button>
    );
};

export const ListAction = (props: ListActionProps) => {
    const navigate = useNavigate();
    const {
        actions: { setItemReceivable },
    } = useSaleOrderStore(state => state);
    const {
        actions: { resetParams },
    } = useSearchTableStore(state => state);

    const handleCreateVoucher = (navigateUrl: string) => {
        setItemReceivable({
            orderData: props.tourInfo ?? {},
        });
        navigate(navigateUrl);
        resetParams();
    };

    return (
        <Space className="h-6">
            {props.isShowApproveButton && (
                <Can permissions={[MyPermissions.SaleOrderApprove]}>
                    <ButtonAction
                        handleButton={() => props.setIsOpenConfirmationModal(true)}
                        icon={<ClockCircleOutlined />}
                        content={i18n.t('action.acceptOpenSale')}
                        isLoading={false}
                    />
                </Can>
            )}
            {props.isShowRequestButton && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <ButtonAction
                        handleButton={() => props.setIsOpenConfirmationModal(true)}
                        icon={<DiffOutlined />}
                        content={i18n.t('action.sentRequest')}
                        isLoading={false}
                    />
                </Can>
            )}
            {props.isShowRequestRefundButton && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <ButtonAction
                        handleButton={() => props.setIsOpenConfirmationModal(true)}
                        icon={<DiffOutlined />}
                        content={i18n.t('Gửi hoàn')}
                        isLoading={false}
                    />
                </Can>
            )}
            {props.isShowApproveRefundButton && (
                <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                    <ButtonAction
                        handleButton={() => props.setIsOpenConfirmationModal(true)}
                        icon={<DiffOutlined />}
                        content={i18n.t('action.acceptOpenSale')}
                        isLoading={false}
                    />
                </Can>
            )}
            {props.isShowCreateReceivableVoucher && (
                <Can permissions={[MyPermissions.ReceivableVoucherCreate]}>
                    <ButtonAction
                        handleButton={() => handleCreateVoucher(rootPaths.receivableVoucherForm)}
                        icon={<PlusOutlined />}
                        content={i18n.t('Tạo phiếu thu')}
                        isLoading={false}
                    />
                </Can>
            )}
            {props.isShowCreateRefundVoucher && (
                <Can permissions={[MyPermissions.RefundVoucherCreate]}>
                    <ButtonAction
                        handleButton={() => handleCreateVoucher(rootPaths.refundVoucherForm)}
                        icon={<PlusOutlined />}
                        content={i18n.t('Tạo phiếu hoàn')}
                        isLoading={false}
                    />
                </Can>
            )}
        </Space>
    );
};
