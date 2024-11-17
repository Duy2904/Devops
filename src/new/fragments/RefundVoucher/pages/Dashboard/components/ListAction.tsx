import { useConfirmRefund, useSendForApprove, useSendForConfirmation } from '../../../hooks/useRefundList';

import { ApproveBtn } from '@src/new/components/customs/Buttons/ApproveBtn';
import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RequestApproveAccountantBtn } from '@src/new/components/customs/Buttons/RequestApproveAccountantBtn';
import { RequestApproveBtn } from '@src/new/components/customs/Buttons/RequestApproveBtn';
import { Space } from 'antd';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useTranslation } from 'react-i18next';

interface ListActionProps {
    rowSelected: React.Key[];
    setIsRefectData: React.Dispatch<React.SetStateAction<boolean>>;
    isShowRequestApproveButton: boolean;
    isShowRequestConfirm: boolean;
    isShowConfirm: boolean;
}

export const ListAction: React.FC<ListActionProps> = props => {
    const { isShowRequestApproveButton, isShowRequestConfirm, isShowConfirm, rowSelected, setIsRefectData } = props;

    const { t } = useTranslation();

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
            toastSuccess('', t(`Đã gửi duyệt ${rowSelected.length} phiếu hoàn`));
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
            toastSuccess('', t(`Đã gửi kế toán ${rowSelected.length} phiếu hoàn`));
        }
    };

    const handleConfirm = async () => {
        const res = await confirmRefund({
            receivableVoucherIds: rowSelected as string[],
        });
        if (res) {
            setIsRefectData(true);
            toastSuccess('', t(`Đã xác nhận ${rowSelected.length} phiếu hoàn`));
        }
    };

    return (
        <Space className="h-6">
            {isShowRequestApproveButton && (
                <Can permissions={[MyPermissions.RefundVoucherUpdate, MyPermissions.AgencyRefundVoucherUpdate]}>
                    <RequestApproveBtn
                        onClick={requestApprove}
                        disabled={loadingSentApproval}
                        loading={loadingSentApproval}
                    />
                </Can>
            )}
            {isShowRequestConfirm && (
                <Can permissions={[MyPermissions.RefundVoucherUpdate, MyPermissions.AgencyRefundVoucherUpdate]}>
                    <RequestApproveAccountantBtn
                        onClick={requestConfirm}
                        loading={loadingSentConfirm}
                        disabled={loadingSentConfirm}
                    />
                </Can>
            )}
            {isShowConfirm && (
                <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                    <ApproveBtn
                        onClick={handleConfirm}
                        loading={loadingConfirmRefund}
                        disabled={loadingConfirmRefund}
                    />
                </Can>
            )}
        </Space>
    );
};
