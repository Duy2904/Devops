import Can from "@components/common/Can";
import { DocumentType, ReceivableVoucherDto, VoucherStatus } from "@sdk/tour-operations";
import { RequestApproveAccountantBtn } from "@src/new/components/customs/Buttons/RequestApproveAccountantBtn";
import { MyPermissions } from "@utils/Permissions";
import { Flex } from "antd";

import { toastSuccess } from "@components/ui/Toast/Toast";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { ApproveBtn } from "@src/new/components/customs/Buttons/ApproveBtn";
import { PrintButton } from "@src/new/components/customs/Buttons/PrintButton";
import { EditBtn } from "@src/new/components/customs/Buttons/EditBtn";
import { RequestApproveBtn } from "@src/new/components/customs/Buttons/RequestApproveBtn";
import { useConfirmRefund, useDownloadFile, useSendForApprove, useSendForConfirmation } from "@src/new/fragments/RefundVoucher/hooks/useRefundList";
import { RequestApproveModal } from "@src/new/fragments/RefundVoucher/components/ApproveModal";
import { QueriesKey } from "@src/new/fragments/RefundVoucher/features/QueriesKey";
import { rootPathsNew } from "@src/routers/newRoute";

interface ButtonActionListProps {
    data?: ReceivableVoucherDto;
}

export const ButtonActionList: React.FC<ButtonActionListProps> = ({ data }) => {
    const { refundId } = useParams<string>();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: sendForApproval, isLoading: loadingSentApproval } = useSendForApprove();
    const { mutateAsync: sendForConfirmation, isLoading: loadingSentConfirm } = useSendForConfirmation();
    const { mutateAsync: confirmRefund, isLoading: loadingConfirmRefund } = useConfirmRefund();
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();

    const setInvalidQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: [QueriesKey.GetDetail, refundId] });
    }, [queryClient, refundId]);

    const navigateToFormEdit = () => {
        navigate(`${rootPathsNew.refundFormDetail}/${refundId}`);
    };

    const requestApprove = async () => {
        const res = await sendForApproval(refundId!);
        if (res) {
            toastSuccess('', t(`Đã gửi duyệt phiếu hoàn ${data?.voucherNo}`));
            setInvalidQuery();
        }
    };

    const requestConfirm = async () => {
        const res = await sendForConfirmation(refundId!);
        if (res) {
            toastSuccess('', t(`Đã gửi kế toán phiếu hoàn ${data?.voucherNo}`));
            setInvalidQuery();
        }
    };

    const handleConfirm = async () => {
        const res = await confirmRefund({
            receivableVoucherIds: [refundId!],
        });
        if (res) {
            toastSuccess('', t(`Đã xác nhận phiếu hoàn ${data?.voucherNo}`));
            setInvalidQuery();
        }
    };

    const handleDownload = async (recId: string) => {
        const request = {
            id: recId ?? '',
            type: DocumentType.Pdf,
        };
        const res = await downloadFile(request);
        window.open(res, '_blank');
    };

    return (
        <Flex align="center" gap={8}>
            {data?.status !== VoucherStatus.Confirmed && (
                <Can permissions={[MyPermissions.ReceivableVoucherUpdate, MyPermissions.AgencyReceivableVoucherUpdate]}>
                    <EditBtn onClick={navigateToFormEdit} />
                </Can>
            )}
            {data?.status && [VoucherStatus.Draft, VoucherStatus.Rejected].includes(data.status!) && (
                <RequestApproveBtn
                    onClick={requestApprove}
                    disabled={loadingSentApproval}
                    loading={loadingSentApproval}
                    isSmall
                />
            )}
            {data?.status == VoucherStatus.Refunded && (
                <Can permissions={[MyPermissions.RefundVoucherUpdate, MyPermissions.AgencyRefundVoucherUpdate]}>
                    <RequestApproveAccountantBtn
                        onClick={requestConfirm}
                        loading={loadingSentConfirm}
                        disabled={loadingSentConfirm}
                        isSmall
                    />
                </Can>
            )}

            {data?.status == VoucherStatus.WaitingForApproval && (
                <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                    <RequestApproveModal data={data} queriesKey={[QueriesKey.GetDetail, refundId]} />
                </Can>
            )}

            {data?.status == VoucherStatus.WaitingForConfirmation && (
                <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                    <ApproveBtn
                        onClick={handleConfirm}
                        loading={loadingConfirmRefund}
                        disabled={loadingConfirmRefund}
                        isSmall
                    />
                </Can>
            )}
            <Can permissions={[MyPermissions.RefundVoucherView, MyPermissions.AgencyRefundVoucherView]}>
                <PrintButton
                    onClick={() => {
                        handleDownload(refundId!);
                    }}
                    isLoading={loadingDownload}
                    tooltip={t('In phiếu xác nhận')}
                />
            </Can>
        </Flex>
    );
};
