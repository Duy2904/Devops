import { Button, FormInstance } from 'antd';
import {
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    IssuesCloseOutlined,
    PrinterOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import { DocumentType, VoucherStatus } from '@sdk/tour-operations';
import { useCallback, useEffect } from 'react';
import {
    useConfirmReceivaleVoucher,
    useDownloadFile,
    useGetReceivable,
    useSendForConfirmation,
} from '../hook/useReceivableVoucher';

import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
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

interface ButtonReceivableVoucherDetailProps {
    infoForm: FormInstance;
    personContactForm: FormInstance;
    recId: string | undefined;
    submittable: boolean;
}

export const ButtonReceivableVoucherDetail: React.FC<ButtonReceivableVoucherDetailProps> = props => {
    const { infoForm, recId, submittable, personContactForm } = props;
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Store
    const {
        personContactDetail,
        isCreatingPersonContact,
        actions: { setIsCreatingPersonContact },
    } = usePersonContactStore(state => state);

    const { mutateAsync: sendForConfirmation, isLoading } = useSendForConfirmation();
    const { mutateAsync: approvalReceivaleVoucher, isLoading: loadingApprovalVoucher } = useConfirmReceivaleVoucher();
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();
    const { data } = useGetReceivable(recId ?? '');

    const handleBack = () => {
        if (submittable) {
            modal.confirm({
                title: `${i18n.t('message.default.warning')}`,
                icon: <ExclamationCircleOutlined />,
                content: i18n.t('Bạn chưa lưu dữ liệu, bạn có muốn thoát không?'),
                cancelText: i18n.t('action.back'),
                onOk: () => {
                    navigate(rootPathsNew.receivableList);
                },
            });
        } else {
            navigate(rootPathsNew.receivableList);
        }
    };

    const handleSendForConfirm = async () => {
        const res = await sendForConfirmation(recId ?? '');
        if (res) {
            queryClient.invalidateQueries(['fetchReceivableVoucher', recId ?? '']);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu thu đã được gửi đến kế toán'));
        }
    };

    const handleApproval = async () => {
        if (isNil(recId)) return;
        const dataFetch: string[] = [recId];
        const res = await approvalReceivaleVoucher({
            receivableVoucherIds: dataFetch,
        });
        if (res) {
            queryClient.invalidateQueries(['fetchReceivableVoucher', recId ?? '']);
            toastSuccess(i18n.t('Thông báo'), i18n.t('Phiếu thu được xác nhận'));
        }
    };

    const handleDownload = async () => {
        const request = {
            id: recId ?? '',
            type: DocumentType.Pdf,
        };
        const res = await downloadFile(request);
        window.open(res, '_blank');
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
            {data?.status != VoucherStatus.Confirmed && (
                <Can
                    permissions={[
                        MyPermissions.ReceivableVoucherCreate,
                        MyPermissions.ReceivableVoucherUpdate,
                        MyPermissions.AgencyReceivableVoucherCreate,
                        MyPermissions.AgencyReceivableVoucherUpdate,
                    ]}
                >
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
            )}
            {!!recId && (
                <>
                    {data?.status === VoucherStatus.Received && (
                        <Button
                            className="text-xs"
                            type="default"
                            icon={<ClockCircleOutlined />}
                            disabled={isLoading}
                            onClick={handleSendForConfirm}
                            loading={isLoading}
                        >
                            {i18n.t('Gửi KT')}
                        </Button>
                    )}
                    {data?.status === VoucherStatus.WaitingForConfirmation && (
                        <Can permissions={[MyPermissions.ReceivableVoucherApprove]}>
                            <Button
                                className="text-xs"
                                type="default"
                                icon={<IssuesCloseOutlined />}
                                disabled={loadingApprovalVoucher}
                                loading={loadingApprovalVoucher}
                                onClick={handleApproval}
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
