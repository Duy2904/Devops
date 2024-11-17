import Can from "@components/common/Can";
import { DocumentType, ReceivableVoucherDto, VoucherStatus } from "@sdk/tour-operations";
import { RequestApproveAccountantBtn } from "@src/new/components/customs/Buttons/RequestApproveAccountantBtn";
import { MyPermissions } from "@utils/Permissions";
import { Flex } from "antd";

import {
    useConfirmReceivaleVoucher,
    useDownloadFile,
    useSendForConfirmation,
} from '../../../../hooks/useReceivableVoucher';
import { toastSuccess } from "@components/ui/Toast/Toast";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { QueriesKey } from "@src/new/fragments/ReceivableVoucher/features/QueriesKey";
import { ApproveBtn } from "@src/new/components/customs/Buttons/ApproveBtn";
import { PrintButton } from "@src/new/components/customs/Buttons/PrintButton";
import { EditBtn } from "@src/new/components/customs/Buttons/EditBtn";
import { rootPathsNew } from "@src/routers/newRoute";

interface ButtonActionListProps {
    data?: ReceivableVoucherDto;
}

export const ButtonActionList: React.FC<ButtonActionListProps> = ({ data }) => {
    const { recId } = useParams<string>();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: sendForConfirmation, isLoading: loadingRequestApprove } = useSendForConfirmation();
    const { mutateAsync: approvalReceivaleVoucher, isLoading: loadingConfirmApprove } = useConfirmReceivaleVoucher();
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();

    const setInvalidQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: [QueriesKey.GetDetail, recId] });
    }, [queryClient, recId]);

    const navigateToFormEdit = () => {
        navigate(`${rootPathsNew.receivableFormDetail}/${data?.id}`);
    };

    const requestApprove = async () => {
        const res = await sendForConfirmation(recId!);
        if (res) {
            toastSuccess('', t(`Đã gửi kế toán phiếu thu ${data?.voucherNo}`));
            setInvalidQuery();
        }
    };

    const handleApproval = async () => {
        const res = await approvalReceivaleVoucher({
            receivableVoucherIds: [recId!],
        });
        if (res) {
            toastSuccess('', t(`Đã xác nhận phiếu thu ${data?.voucherNo}`));
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
            {data?.status == VoucherStatus.Received && (
                <Can permissions={[MyPermissions.ReceivableVoucherUpdate, MyPermissions.AgencyReceivableVoucherUpdate]}>
                    <RequestApproveAccountantBtn
                        onClick={requestApprove}
                        loading={loadingRequestApprove}
                        disabled={loadingRequestApprove}
                        isSmall
                    />
                </Can>
            )}
            {data?.status == VoucherStatus.WaitingForConfirmation && (
                <Can permissions={[MyPermissions.ReceivableVoucherApprove]}>
                    <ApproveBtn
                        onClick={handleApproval}
                        loading={loadingConfirmApprove}
                        disabled={loadingConfirmApprove}
                        isSmall
                    />
                </Can>
            )}
            <Can permissions={[MyPermissions.ReceivableVoucherView, MyPermissions.AgencyReceivableVoucherView]}>
                <PrintButton
                    onClick={() => {
                        handleDownload(recId!);
                    }}
                    isLoading={loadingDownload}
                    tooltip={t('In phiếu xác nhận')}
                />
            </Can>
        </Flex>
    );
};
