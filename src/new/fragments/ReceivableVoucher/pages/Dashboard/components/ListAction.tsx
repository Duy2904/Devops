import {
    useConfirmReceivaleVoucher,
    useSendForConfirmation,
} from '@fragments/ReceivableVoucher/hook/useReceivableVoucher';

import { ApproveBtn } from '@src/new/components/customs/Buttons/ApproveBtn';
import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RequestApproveAccountantBtn } from '@src/new/components/customs/Buttons/RequestApproveAccountantBtn';
import { Space } from 'antd';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useTranslation } from 'react-i18next';

interface ListActionProps {
    isShowRequestApproveButton: boolean;
    isShowApprovalButton: boolean;
    rowSelected: React.Key[];
    setIsRefectData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListAction: React.FC<ListActionProps> = props => {
    const { isShowRequestApproveButton, isShowApprovalButton, rowSelected, setIsRefectData } = props;
    const { t } = useTranslation();

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
            toastSuccess('', t(`Đã gửi kế toán ${rowSelected.length} phiếu thu`));
        }
    };

    const handleApproval = async () => {
        const res = await approvalReceivaleVoucher({
            receivableVoucherIds: rowSelected as string[],
        });
        if (res) {
            setIsRefectData(true);
            toastSuccess('', t(`Đã xác nhận ${rowSelected.length} phiếu thu`));
        }
    };

    return (
        <Space className="h-6">
            {isShowRequestApproveButton && (
                <Can permissions={[MyPermissions.ReceivableVoucherUpdate, MyPermissions.AgencyReceivableVoucherUpdate]}>
                    <RequestApproveAccountantBtn onClick={requestApprove} loading={isLoading} disabled={isLoading} />
                </Can>
            )}
            {isShowApprovalButton && (
                <Can permissions={[MyPermissions.ReceivableVoucherApprove]}>
                    <ApproveBtn
                        onClick={handleApproval}
                        loading={loadingApprovalVoucher}
                        disabled={loadingApprovalVoucher}
                    />
                </Can>
            )}
        </Space>
    );
};
