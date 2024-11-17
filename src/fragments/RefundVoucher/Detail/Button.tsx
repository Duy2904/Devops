import { Button, FormInstance } from 'antd';
import {
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    IssuesCloseOutlined,
    PrinterOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import { DocumentType, ReceivableVoucherDto, VoucherStatus } from '@sdk/tour-operations';
import { useCallback, useEffect } from 'react';
import { useConfirmRefund, useDownloadFile, useSendForApprove, useSendForConfirmation } from '../hook/useRefundVoucher';

import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RequestApproveModal } from '../Components/ApproveModal';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import modal from 'antd/es/modal';
import { rootPathsNew } from '@src/routers/newRoute';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { usePersonContactStore } from '@fragments/PersonContactForm/store/personContactStore';
import { useQueryClient } from 'react-query';

interface ButtonRefundVoucherDetailProps {
    infoForm: FormInstance;
    personContactForm: FormInstance;
    refundId: string | undefined;
    submittable: boolean;
    isEnableApprove: boolean;
    data?: ReceivableVoucherDto;
}

export const ButtonRefundVoucherDetail: React.FC<ButtonRefundVoucherDetailProps> = props => {
    const { infoForm, submittable, refundId, data, isEnableApprove, personContactForm } = props;
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Store
    const {
        personContactDetail,
        isCreatingPersonContact,
        actions: { setIsCreatingPersonContact },
    } = usePersonContactStore(state => state);

    // Mutate
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();
    const { mutateAsync: sendForApproval, isLoading: loadingApprove } = useSendForApprove();
    const { mutateAsync: sendForConfirm, isLoading: loadingSendConfirm } = useSendForConfirmation();
    const { mutateAsync: confirmRefund, isLoading: loadingConfirm } = useConfirmRefund();

    const handleBack = () => {
        if (submittable) {
            modal.confirm({
                title: `${i18n.t('message.default.warning')}`,
                icon: <ExclamationCircleOutlined />,
                content: i18n.t('Bạn chưa lưu dữ liệu, bạn có muốn thoát không?'),
                cancelText: i18n.t('action.back'),
                onOk: () => {
                    navigate(rootPathsNew.refundList);
                },
            });
        } else {
            navigate(rootPathsNew.refundList);
        }
    };

    const handleDownload = async () => {
        const request = {
            id: refundId ?? '',
            type: DocumentType.Pdf,
        };
        const res = await downloadFile(request);
        window.open(res, '_blank');
    };

    const handleApproval = async () => {
        if (isNil(refundId)) return;
        await sendForApproval(refundId);
        queryClient.invalidateQueries(['fetchRefundVoucher', refundId ?? '']);
        toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu hoàn đã được gửi duyệt'));
    };

    const handleSendForConfirm = async () => {
        const res = await sendForConfirm(refundId ?? '');
        if (res) {
            queryClient.invalidateQueries(['fetchRefundVoucher', refundId ?? '']);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu hoàn đã được gửi đến kế toán'));
        }
    };

    const handleConfirm = async () => {
        const dataFetch: string[] = [refundId ?? ''];
        const res = await confirmRefund({
            receivableVoucherIds: dataFetch,
        });
        if (res) {
            queryClient.invalidateQueries(['fetchRefundVoucher', refundId ?? '']);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu hoàn đã được KT xác nhận'));
        }
    };

    const submitPersonContactForm = async () => {
        let isSuccess = true;

        await personContactForm.validateFields().catch(() => {
            isSuccess = false;
        });

        if (isSuccess) {
            personContactForm.submit();
        }
    };

    const handleSubmitForm = useCallback(() => {
        infoForm.submit();
    }, [infoForm]);

    const onSubmit = useDebouncedCallback(
        () => {
            if (isEmpty(personContactDetail)) {
                submitPersonContactForm();
                setIsCreatingPersonContact(true);
            } else {
                handleSubmitForm();
            }
        },
        2000,
        { leading: true, trailing: false },
    );

    // submit form after create person contact success in personContactForm
    useEffect(() => {
        if (isCreatingPersonContact && !isEmpty(personContactDetail)) {
            handleSubmitForm();
            setIsCreatingPersonContact(false);
        }
    }, [handleSubmitForm, isCreatingPersonContact, personContactDetail, setIsCreatingPersonContact]);

    return (
        <>
            <Can permissions={[MyPermissions.RefundVoucherCreate, MyPermissions.AgencyRefundVoucherCreate]}>
                <Button
                    className="text-xs"
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={onSubmit}
                    disabled={!submittable}
                >
                    {i18n.t('action.save')}
                </Button>
            </Can>
            {!!refundId && (
                <>
                    {data?.status && [VoucherStatus.Draft, VoucherStatus.Rejected].includes(data?.status) && (
                        <Button
                            className="text-xs"
                            type="default"
                            icon={<ClockCircleOutlined />}
                            disabled={loadingApprove}
                            onClick={handleApproval}
                            loading={loadingApprove}
                        >
                            {i18n.t('action.sentRequest')}
                        </Button>
                    )}
                    {/* Xác nhận chuyển trạng thái -> Đã hoàn */}
                    {data?.status === VoucherStatus.WaitingForApproval && (
                        <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                            <RequestApproveModal
                                icon={<IssuesCloseOutlined />}
                                content={i18n.t('action.acceptOpenSale')}
                                refundId={refundId}
                                isEnableApprove={isEnableApprove}
                            />
                        </Can>
                    )}
                    {data?.status === VoucherStatus.Refunded && (
                        <Button
                            className="text-xs"
                            type="default"
                            icon={<ClockCircleOutlined />}
                            disabled={loadingSendConfirm}
                            onClick={handleSendForConfirm}
                            loading={loadingSendConfirm}
                        >
                            {i18n.t('Gửi KT')}
                        </Button>
                    )}
                    {/* Kế toán xác nhận */}
                    {data?.status === VoucherStatus.WaitingForConfirmation && (
                        <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                            <Button
                                className="text-xs"
                                type="default"
                                icon={<IssuesCloseOutlined />}
                                disabled={loadingConfirm}
                                loading={loadingConfirm}
                                onClick={handleConfirm}
                            >
                                {i18n.t('action.acceptOpenSale')}
                            </Button>
                        </Can>
                    )}
                    <Button
                        className="text-xs"
                        type="default"
                        icon={<PrinterOutlined />}
                        onClick={handleDownload}
                        disabled={loadingDownload}
                        loading={loadingDownload}
                    >
                        {i18n.t('In Phiếu')}
                    </Button>
                </>
            )}
            <Button className="text-xs" onClick={handleBack}>
                {i18n.t('Quay lại')}
            </Button>
        </>
    );
};
