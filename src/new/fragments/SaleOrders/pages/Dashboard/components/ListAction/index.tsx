import { Button, Space } from 'antd';
import { ClockCircleOutlined, DiffOutlined } from '@ant-design/icons';
import { MouseEventHandler, ReactNode } from 'react';

import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { SearchSaleOrderViewDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

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
    className?: string;
}

const ButtonAction: React.FC<ButtonProps> = props => {
    return (
        <Button
            className={`!text-xs ${props.className}`}
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
                <Can permissions={[MyPermissions.SaleOrderApprove]}>
                    <ButtonAction
                        handleButton={() => props.setIsOpenConfirmationModal(true)}
                        icon={<DiffOutlined />}
                        content={i18n.t('action.acceptOpenSale')}
                        isLoading={false}
                    />
                </Can>
            )}
        </Space>
    );
};
