import { Button, Space } from 'antd';
import { ClockCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import { useConfirmReceivaleVoucher, useSendForConfirmation } from '../hook/useReceivableVoucher';

import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';

interface ListActionProps {
    isShowRequestApproveButton: boolean;
    isShowApprovalButton: boolean;
    rowSelected: React.Key[];
    setIsRefectData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListAction: React.FC<ListActionProps> = props => {
    const { isShowRequestApproveButton, isShowApprovalButton, rowSelected, setIsRefectData } = props;

    const { mutateAsync: sendForConfirmation, isLoading } = useSendForConfirmation();
    const { mutateAsync: approvalReceivaleVoucher, isLoading: loadingApprovalVoucher } = useConfirmReceivaleVoucher();

    const requestApprove = async () => {
        const reqApproveList = rowSelected.map(item => {
            return sendForConfirmation(item.toString() ?? '');
        });
        try {
            await Promise.all(reqApproveList);
        } finally {
            setIsRefectData(true);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu thu đã được gửi đến kế toán'));
        }
    };

    const handleApproval = async () => {
        const res = await approvalReceivaleVoucher({
            receivableVoucherIds: rowSelected as string[],
        });
        if (res) {
            setIsRefectData(true);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu thu được xác nhận'));
        }
    };

    return (
        <Space className="h-6">
            {isShowRequestApproveButton && (
                <Can permissions={[MyPermissions.ReceivableVoucherUpdate, MyPermissions.AgencyReceivableVoucherUpdate]}>
                    <Button
                        className="!text-xs"
                        type="default"
                        size="small"
                        icon={<ClockCircleOutlined />}
                        onClick={requestApprove}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {i18n.t('action.sentRequest')}
                    </Button>
                </Can>
            )}
            {isShowApprovalButton && (
                <Can permissions={[MyPermissions.ReceivableVoucherApprove]}>
                    <Button
                        className="!text-xs"
                        type="default"
                        size="small"
                        icon={<IssuesCloseOutlined />}
                        onClick={handleApproval}
                        loading={loadingApprovalVoucher}
                        disabled={loadingApprovalVoucher}
                    >
                        {i18n.t('action.acceptOpenSale')}
                    </Button>
                </Can>
            )}
        </Space>
    );
};
