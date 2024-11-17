import { DocumentType, ReceivableVoucherDto, VoucherStatus } from '@sdk/tour-operations';
import React, { useCallback } from 'react';
import {
    useConfirmReceivaleVoucher,
    useDownloadFile,
    useSendForConfirmation,
} from '../../../hooks/useReceivableVoucher';

import { ApproveBtn } from '@src/new/components/customs/Buttons/ApproveBtn';
import Can from '@src/new/components/common/Can';
import { Flex } from 'antd';
import { MyPermissions } from '@utils/Permissions';
import { PrintButton } from '@src/new/components/customs/Buttons/PrintButton';
import { QueriesKey } from '../../../features/QueriesKey';
import { RequestApproveAccountantBtn } from '@src/new/components/customs/Buttons/RequestApproveAccountantBtn';
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

    const { mutateAsync: sendForConfirmation, isLoading: loadingRequestApprove } = useSendForConfirmation();
    const { mutateAsync: approvalReceivaleVoucher, isLoading: loadingConfirmApprove } = useConfirmReceivaleVoucher();
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();

    const setInvalidQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: [QueriesKey.GetList] });
    }, [queryClient]);

    const navigateToFormEdit = () => {
        navigate(`${rootPathsNew.receivableFormDetail}/${data?.id}`);
    };

    const requestApprove = async () => {
        const res = await sendForConfirmation(data.id!);
        if (res) {
            toastSuccess('', t(`Đã gửi kế toán phiếu thu ${data.voucherNo}`));
            setInvalidQuery();
        }
    };

    const handleApproval = async () => {
        const res = await approvalReceivaleVoucher({
            receivableVoucherIds: [data.id!],
        });
        if (res) {
            toastSuccess('', t(`Đã xác nhận phiếu thu ${data.voucherNo}`));
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
            {data.status == VoucherStatus.Received && (
                <Can permissions={[MyPermissions.ReceivableVoucherUpdate, MyPermissions.AgencyReceivableVoucherUpdate]}>
                    <RequestApproveAccountantBtn
                        onClick={requestApprove}
                        loading={loadingRequestApprove}
                        disabled={loadingRequestApprove}
                        isSmall
                    />
                </Can>
            )}
            {data.status == VoucherStatus.WaitingForConfirmation && (
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
                        handleDownload(data.id!);
                    }}
                    isLoading={loadingDownload}
                    tooltip={t('In phiếu xác nhận')}
                />
            </Can>
        </Flex>
    );
};
