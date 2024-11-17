import {
    ApproveSaleOrderGuaranteeRequest,
    ApproveStatus,
    ConfirmSaleOrderOverloadRequest,
    ConfirmSaleOrderRequest,
    OrderStatus,
    RefundRequest,
    SaleOrderDto,
    SaleOrderHistoryStatus,
} from '@sdk/tour-operations';
import { Button, Col, Flex, Form, Modal, Radio } from 'antd';
import { toastErr, toastSuccess } from '@components/ui/Toast/Toast';
import {
    useApproveSaleOrder,
    useApproveSaleOrderGuarantee,
    useRequestApproveSaleOrderGuarantee,
    useRequestRefund,
} from '../../hooks/useApproval';
import { useCallback, useMemo } from 'react';

import { InfoCircleFilled } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useApproveSaleOrderOverload } from '@hooks/queries/useSaleOrders';
import { useDebouncedCallback } from 'use-debounce';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';

interface ConfirmStatusComponent {
    soIds: React.Key[];
    isOpenModal: boolean;
    isConfirming?: boolean;
    isOverload?: boolean;
    isRequestRefund?: boolean;
    isWaitingRefundApprove?: boolean;
    saleOrders: SaleOrderDto[];
    statusModal: OrderStatus | null | undefined;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchNewDataSaleOrder: () => void;
}

export const ConfirmStatusComponent: React.FC<ConfirmStatusComponent> = props => {
    const { isConfirming, isOverload, isRequestRefund, isWaitingRefundApprove } = props;
    const { soIds, saleOrders, fetchNewDataSaleOrder, setIsModalOpen, statusModal } = props;

    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const approveStatusWatch = Form.useWatch('approveStatus', form);

    // Mutate
    const { mutateAsync: approveSaleOrder, isLoading: loadingApproveSO } = useApproveSaleOrder();
    const { mutateAsync: approveSaleOrderGuarantee, isLoading: loadingApproveSOGuarantee } =
        useApproveSaleOrderGuarantee();
    const { mutateAsync: requestApproveSaleOrderGuarantee, isLoading: loadingRequestSOGuarantee } =
        useRequestApproveSaleOrderGuarantee();
    const { mutateAsync: approveSaleOrderOverload, isLoading: loadingRequestSO } = useApproveSaleOrderOverload();
    const { mutateAsync: requestRefund, isLoading: loadingRequestRefundSO } = useRequestRefund();

    const refetchSO = useCallback(() => {
        if (soIds.length > 0) {
            soIds.forEach(soId => queryClient.invalidateQueries({ queryKey: ['getSaleOrder', soId] }));
        }
    }, [queryClient, soIds]);

    // SO confirming has depositAmt only allow option
    const onlyApprove = useMemo(
        () => soIds?.length === 1 && !isEmpty(saleOrders.find(x => x.id === soIds[0] && (x.paymentAmt ?? 0) > 0)),
        [saleOrders, soIds],
    );

    const submitConfirmSO = useCallback(
        async (value: ConfirmSaleOrderRequest) => {
            // Validate
            let isSuccess = true;
            let isGuarantee = false;

            saleOrders.forEach(item => {
                if (!soIds.includes(item.id ?? '')) {
                    return;
                }

                if (!isConfirming && !isOverload) {
                    toastErr('', `Trạng thái đơn hàng ${item.orderNo} không hợp lệ.`);
                    isSuccess = false;
                    return;
                }

                if ((item.paymentAmt ?? 0) <= 0 && !isOverload) {
                    isGuarantee = true;
                }
            });

            if (!isSuccess) return;

            // approve SO guarantee
            if (isGuarantee) {
                await approveSaleOrderGuarantee({
                    ids: soIds,
                    approveGuaranteeStatus: value.approveStatus,
                    approveGuaranteeReason: value.reason,
                } as ApproveSaleOrderGuaranteeRequest);
            } else if (isOverload) {
                await approveSaleOrderOverload({
                    ids: soIds,
                    approveOverloadStatus: value.approveStatus,
                    reasonOverload: value.reason,
                } as ConfirmSaleOrderOverloadRequest);
            } else {
                await approveSaleOrder({
                    ids: soIds,
                    approveStatus: value.approveStatus,
                    reason: value.reason,
                } as ConfirmSaleOrderRequest);
            }

            toastSuccess(
                '',
                <p className="font-bold text-sm">
                    <span
                        className={`${
                            value.approveStatus == ApproveStatus.Allow ? ' text-state-success' : 'text-state-error'
                        }`}
                    >
                        {value.approveStatus == ApproveStatus.Allow ? t('Đã duyệt ') : t('Đã từ chối ')}
                    </span>
                    {t('đơn')} {saleOrders?.[0]?.orderNo}
                </p>,
            );
            fetchNewDataSaleOrder();
            setIsModalOpen(false);
            refetchSO();
        },
        [
            approveSaleOrder,
            approveSaleOrderGuarantee,
            approveSaleOrderOverload,
            fetchNewDataSaleOrder,
            isConfirming,
            isOverload,
            refetchSO,
            saleOrders,
            setIsModalOpen,
            soIds,
            t,
        ],
    );

    const submitApproveRefundSO = useCallback(
        async (value: ConfirmSaleOrderRequest) => {
            await requestRefund({
                id: soIds[0],
                reason: value.reason,
                status: value.approveStatus,
            } as RefundRequest);

            toastSuccess(
                '',
                <p className="font-bold text-sm">
                    <span
                        className={`${
                            value.approveStatus == ApproveStatus.Allow ? ' text-state-success' : 'text-state-error'
                        }`}
                    >
                        {value.approveStatus == ApproveStatus.Allow ? t('Đã duyệt hoàn ') : t('Đã từ chối hoàn ')}
                    </span>
                    {t('đơn')} {saleOrders?.[0]?.orderNo}
                </p>,
            );
            fetchNewDataSaleOrder();
            setIsModalOpen(false);
            refetchSO();
        },
        [fetchNewDataSaleOrder, refetchSO, requestRefund, saleOrders, setIsModalOpen, soIds, t],
    );

    const submitRequestApproveSO = useCallback(
        async (value: ConfirmSaleOrderRequest) => {
            await requestApproveSaleOrderGuarantee({
                ids: soIds,
                requestGuaranteeReason: value.reason,
            } as ConfirmSaleOrderRequest);

            toastSuccess('', i18n.t('saleorder.modal.sendRequestSuccess'));
            fetchNewDataSaleOrder();
            setIsModalOpen(false);
            refetchSO();
        },
        [fetchNewDataSaleOrder, refetchSO, requestApproveSaleOrderGuarantee, setIsModalOpen, soIds],
    );

    const submitRequestRefundSO = useCallback(
        async (value: RefundRequest) => {
            await requestRefund({
                id: soIds[0],
                reason: value.reason,
                status: SaleOrderHistoryStatus.Send,
            } as RefundRequest);

            toastSuccess('', i18n.t('saleorder.modal.sendRequestSuccess'));
            fetchNewDataSaleOrder();
            setIsModalOpen(false);
            refetchSO();
        },
        [fetchNewDataSaleOrder, refetchSO, requestRefund, setIsModalOpen, soIds],
    );

    // Events
    const onFinish = useDebouncedCallback(
        (value: ConfirmSaleOrderRequest) => {
            if (statusModal === OrderStatus.New) {
                submitRequestApproveSO(value);
            } else if (isConfirming || isOverload) {
                submitConfirmSO(value);
            } else if (isRequestRefund) {
                submitRequestRefundSO(value);
            } else if (isWaitingRefundApprove) {
                submitApproveRefundSO(value);
            }
        },
        2000,
        { leading: true, trailing: false },
    );

    const renderTitle = useCallback(() => {
        if (isConfirming || isOverload) {
            // status: Chờ xác nhận / Quá tải
            return i18n.t('saleorder.modal.approveTitle');
        } else if (isWaitingRefundApprove) {
            // status: Gửi hoàn
            return i18n.t('saleorder.modal.waitingRefund');
        } else if (isRequestRefund) {
            // status: Đã thanh toán
            return i18n.t('saleorder.modal.sendRefundRequestTitle');
        } else {
            // status: Đang đặt chỗ
            return i18n.t('saleorder.modal.sendRequestTitle');
        }
    }, [isConfirming, isOverload, isRequestRefund, isWaitingRefundApprove]);

    return (
        <Modal width={480} open={props.isOpenModal} closeIcon={false} footer={null} destroyOnClose={true}>
            <Col className="grid grid-cols-12 items-center">
                <Flex align="center" className="col-span-1">
                    <InfoCircleFilled className="text-lg text-state-info" />
                </Flex>
                <Col className="col-span-11">
                    <p className="text-base font-semibold">
                        {renderTitle()}: {saleOrders?.[0]?.orderNo}
                    </p>
                </Col>
            </Col>
            <Col className="grid grid-cols-12 items-center">
                <Col className="col-span-1"></Col>
                <Form className="col-span-11" form={form} layout="vertical" preserve={false} onFinish={onFinish}>
                    <div className="mt-6">
                        {(isConfirming || isOverload || isWaitingRefundApprove) && (
                            <Form.Item
                                name="approveStatus"
                                initialValue={ApproveStatus.Allow}
                                hidden={onlyApprove && !isWaitingRefundApprove}
                                className="mb-1"
                            >
                                <Radio.Group
                                    className="grid grid-cols-2"
                                    onChange={() => form.setFieldValue('reason', undefined)}
                                >
                                    <Radio value={ApproveStatus.Allow}>{t(`OrderStatus.${ApproveStatus.Allow}`)}</Radio>
                                    <Radio value={ApproveStatus.Deny}>{t(`OrderStatus.${ApproveStatus.Deny}`)}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}
                        <Form.Item
                            className="mb-0"
                            name="reason"
                            rules={[
                                {
                                    required: approveStatusWatch == ApproveStatus.Deny,
                                    message: i18n.t('saleorder.modal.validAction'),
                                },
                            ]}
                            label={
                                <p className="mb-1 text-sm">
                                    {approveStatusWatch == ApproveStatus.Deny
                                        ? t('saleorder.modal.reason')
                                        : t('saleorder.modal.note')}
                                </p>
                            }
                        >
                            <TextArea rows={4} placeholder={i18n.t('saleorder.modal.messageReason')} />
                        </Form.Item>
                    </div>
                    <Flex className="mt-4" justify="end" gap={12}>
                        <Button onClick={() => props.setIsModalOpen(false)}>{i18n.t('action.cancel')}</Button>
                        <Button
                            type="primary"
                            onClick={() => form.submit()}
                            loading={
                                loadingApproveSO ||
                                loadingApproveSOGuarantee ||
                                loadingRequestSO ||
                                loadingRequestSOGuarantee ||
                                loadingRequestRefundSO
                            }
                        >
                            {i18n.t('action.acceptOpenSale')}
                        </Button>
                    </Flex>
                </Form>
            </Col>
        </Modal>
    );
};
