import { Button, Space } from 'antd';
import { ClockCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import { useConfirmRefund, useSendForApprove, useSendForConfirmation } from '../hook/useRefundVoucher';

import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RequestApproveModal } from '../Components/ApproveModal';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';

interface ListActionProps {
    rowSelected: React.Key[];
    setIsRefectData: React.Dispatch<React.SetStateAction<boolean>>;
    isShowRequestApproveButton: boolean;
    isShowApprovalButton: boolean;
    isShowRequestConfirm: boolean;
    isShowConfirm: boolean;
}

export const ListAction: React.FC<ListActionProps> = props => {
    const {
        isShowRequestApproveButton,
        isShowApprovalButton,
        isShowRequestConfirm,
        isShowConfirm,
        rowSelected,
        setIsRefectData,
    } = props;

    const { mutateAsync: sendForApproval, isLoading: loadingSentApproval } = useSendForApprove();
    const { mutateAsync: sendForConfirmation, isLoading: loadingSentConfirm } = useSendForConfirmation();
    const { mutateAsync: confirmRefund, isLoading: loadingConfirmRefund } = useConfirmRefund();

    const requestApprove = async () => {
        const reqApproveList = rowSelected.map(item => {
            return sendForApproval(item.toString() ?? '');
        });
        try {
            await Promise.all(reqApproveList);
        } finally {
            setIsRefectData(true);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu hoàn đã được gửi duyệt'));
        }
    };

    const requestConfirm = async () => {
        const reqConfirmList = rowSelected.map(item => {
            return sendForConfirmation(item.toString() ?? '');
        });
        try {
            await Promise.all(reqConfirmList);
        } finally {
            setIsRefectData(true);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu hoàn đã được gửi đến kế toán'));
        }
    };

    const handleConfirm = async () => {
        const res = await confirmRefund({
            receivableVoucherIds: rowSelected as string[],
        });
        if (res) {
            setIsRefectData(true);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu hoàn đã được KT xác nhận'));
        }
    };

    return (
        <Space className="h-6">
            {isShowRequestApproveButton && (
                <Can permissions={[MyPermissions.RefundVoucherUpdate, MyPermissions.AgencyRefundVoucherUpdate]}>
                    <Button
                        className="!text-xs"
                        type="default"
                        size="small"
                        icon={<ClockCircleOutlined />}
                        onClick={requestApprove}
                        loading={loadingSentApproval}
                        disabled={loadingSentApproval}
                    >
                        {i18n.t('action.sentRequest')}
                    </Button>
                </Can>
            )}
            {isShowRequestConfirm && (
                <Can permissions={[MyPermissions.RefundVoucherUpdate, MyPermissions.AgencyRefundVoucherUpdate]}>
                    <Button
                        className="!text-xs"
                        type="default"
                        size="small"
                        icon={<ClockCircleOutlined />}
                        onClick={requestConfirm}
                        loading={loadingSentConfirm}
                        disabled={loadingSentConfirm}
                    >
                        {i18n.t('Gửi KT duyệt')}
                    </Button>
                </Can>
            )}
            {isShowApprovalButton && (
                <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                    <RequestApproveModal
                        icon={<IssuesCloseOutlined />}
                        content={i18n.t('action.acceptOpenSale')}
                        refundId={rowSelected[0] as string}
                        size="small"
                        setIsRefectData={setIsRefectData}
                        isEnableApprove={true}
                    />
                </Can>
            )}
            {isShowConfirm && (
                <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                    <Button
                        className="!text-xs"
                        type="default"
                        size="small"
                        icon={<IssuesCloseOutlined />}
                        onClick={handleConfirm}
                        loading={loadingConfirmRefund}
                        disabled={loadingConfirmRefund}
                    >
                        {i18n.t('action.acceptOpenSale')}
                    </Button>
                </Can>
            )}
        </Space>
    );
};
