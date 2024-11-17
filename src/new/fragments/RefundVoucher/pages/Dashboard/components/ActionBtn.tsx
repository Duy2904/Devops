import { DocumentType, ReceivableVoucherDto, VoucherStatus } from '@sdk/tour-operations';
import React, { useCallback } from 'react';
import {
    useConfirmRefund,
    useDeleteRefund,
    useDownloadFile,
    useSendForApprove,
    useSendForConfirmation,
} from '../../../hooks/useRefundList';

import { ApproveBtn } from '@src/new/components/customs/Buttons/ApproveBtn';
import Can from '@src/new/components/common/Can';
import { DeleteButton } from '@src/new/components/customs/Buttons/DeleteButton';
import { Flex } from 'antd';
import { MyPermissions } from '@utils/Permissions';
import { PrintButton } from '@src/new/components/customs/Buttons/PrintButton';
import { QueriesKey } from '../../../features/QueriesKey';
import { RequestApproveAccountantBtn } from '@src/new/components/customs/Buttons/RequestApproveAccountantBtn';
import { RequestApproveBtn } from '@src/new/components/customs/Buttons/RequestApproveBtn';
import { RequestApproveModal } from '../../../components/ApproveModal';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { EditBtn } from '@src/new/components/customs/Buttons/EditBtn';
import { useNavigate } from 'react-router-dom';
import { rootPathsNew } from '@src/routers/newRoute';

interface ActionBtnProps {
    data: ReceivableVoucherDto;
}

export const ActionBtn: React.FC<ActionBtnProps> = props => {
    const { data } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: sendForApproval, isLoading: loadingSentApproval } = useSendForApprove();
    const { mutateAsync: sendForConfirmation, isLoading: loadingSentConfirm } = useSendForConfirmation();
    const { mutateAsync: confirmRefund, isLoading: loadingConfirmRefund } = useConfirmRefund();
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();
    const { mutateAsync: deleteRefund } = useDeleteRefund();

    const setInvalidQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: [QueriesKey.GetList] });
    }, [queryClient]);

    const navigateToFormEdit = () => {
        navigate(`${rootPathsNew.refundFormDetail}/${data?.id}`);
    };

    const requestApprove = async () => {
        const res = await sendForApproval(data.id!);
        if (res) {
            toastSuccess('', t(`Đã gửi duyệt phiếu hoàn ${data.voucherNo}`));
            setInvalidQuery();
        }
    };

    const requestConfirm = async () => {
        const res = await sendForConfirmation(data.id!);
        if (res) {
            toastSuccess('', t(`Đã gửi kế toán phiếu hoàn ${data.voucherNo}`));
            setInvalidQuery();
        }
    };

    const handleConfirm = async () => {
        const res = await confirmRefund({
            receivableVoucherIds: [data.id!],
        });
        if (res) {
            toastSuccess('', t(`Đã xác nhận phiếu hoàn ${data.voucherNo}`));
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
        <Flex className="gap-2 flex-wrap" justify="right">
            {data?.status !== VoucherStatus.Confirmed && (
                <Can permissions={[MyPermissions.ReceivableVoucherUpdate, MyPermissions.AgencyReceivableVoucherUpdate]}>
                    <EditBtn isSmall onClick={navigateToFormEdit} />
                </Can>
            )}
            {[VoucherStatus.Draft, VoucherStatus.Rejected].includes(data.status!) && (
                <RequestApproveBtn
                    onClick={requestApprove}
                    disabled={loadingSentApproval}
                    loading={loadingSentApproval}
                    isSmall
                />
            )}
            {data.status == VoucherStatus.Refunded && (
                <Can permissions={[MyPermissions.RefundVoucherUpdate, MyPermissions.AgencyRefundVoucherUpdate]}>
                    <RequestApproveAccountantBtn
                        onClick={requestConfirm}
                        loading={loadingSentConfirm}
                        disabled={loadingSentConfirm}
                        isSmall
                    />
                </Can>
            )}

            {data.status == VoucherStatus.WaitingForApproval && (
                <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                    <RequestApproveModal data={data} queriesKey={[QueriesKey.GetList]} />
                </Can>
            )}

            {data.status == VoucherStatus.WaitingForConfirmation && (
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
                        handleDownload(data.id!);
                    }}
                    isLoading={loadingDownload}
                    tooltip={t('In phiếu xác nhận')}
                />
            </Can>

            {data.status === VoucherStatus.Draft && (
                <Can permissions={[MyPermissions.RefundVoucherDelete, MyPermissions.AgencyRefundVoucherDelete]}>
                    <DeleteButton
                        titleName={t('menu.refundVoucher')}
                        content={`Mã ${t('menu.refundVoucher')}: ${data.voucherNo}`}
                        onOk={async () => {
                            await deleteRefund(data.id!);
                            toastSuccess('', t('Xoá Phiếu hoàn thành công!'));
                            setInvalidQuery();
                        }}
                    />
                </Can>
            )}
        </Flex>
    );
};
