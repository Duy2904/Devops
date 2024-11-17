import { Button, Flex, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useDebouncedCallback } from 'use-debounce';

import { SaveOutlined } from '@ant-design/icons';
import { ApproveSOSelect } from '@components/customizes/Select/ApproveSOSelect';
import { toastErr, toastSuccess } from '@components/ui/Toast/Toast';
import { useRequestRefund } from '@fragments/SaleOrders/hooks/useRefundSO';
import {
    useApproveSaleOrder,
    useApproveSaleOrderGuarantee,
    useApproveSaleOrderOverload,
    useRequestApproveSaleOrderGuarantee,
} from '@hooks/queries/useSaleOrders';
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
import i18n from '@src/i18n';

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
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const { soIds, saleOrders, fetchNewDataSaleOrder, setIsModalOpen, statusModal } = props;

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

            toastSuccess('', 'Duyệt đơn hàng thành công!');
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
        ],
    );

    const submitApproveRefundSO = useCallback(
        async (value: ConfirmSaleOrderRequest) => {
            await requestRefund({
                id: soIds[0],
                reason: value.reason,
                status: value.approveStatus,
            } as RefundRequest);

            toastSuccess('', i18n.t('saleorder.modal.approveRefundSOSuccess'));
            fetchNewDataSaleOrder();
            setIsModalOpen(false);
            refetchSO();
        },
        [fetchNewDataSaleOrder, refetchSO, requestRefund, setIsModalOpen, soIds],
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
            return i18n.t('saleorder.modal.approveTitle');
        } else if (isWaitingRefundApprove) {
            return i18n.t('saleorder.modal.waitingRefund');
        } else if (isRequestRefund) {
            return i18n.t('saleorder.modal.sendRefundRequestTitle');
        } else {
            return i18n.t('saleorder.modal.sendRequestTitle');
        }
    }, [isConfirming, isOverload, isRequestRefund, isWaitingRefundApprove]);

    return (
        <Modal open={props.isOpenModal} closeIcon={false} footer={null} destroyOnClose={true}>
            <h6>{renderTitle()}</h6>
            <Form form={form} layout="vertical" preserve={false} onFinish={onFinish}>
                <div className="mt-4">
                    {(isConfirming || isOverload || isWaitingRefundApprove) && (
                        <ApproveSOSelect
                            isForm
                            className="w-1/2"
                            name="approveStatus"
                            label={<p className="mb-1 font-semibold">{i18n.t('saleorder.modal.action')}</p>}
                            rules={[{ required: true, message: i18n.t('saleorder.modal.validAction') }]}
                            initialValue={ApproveStatus.Allow}
                            disabled={onlyApprove && !isWaitingRefundApprove}
                        />
                    )}
                    <Form.Item
                        className="mb-0"
                        name="reason"
                        label={<p className="mb-1 font-semibold">{i18n.t('saleorder.modal.reason')}</p>}
                    >
                        <TextArea placeholder={i18n.t('saleorder.modal.messageReason')} />
                    </Form.Item>
                </div>
                <Flex className="mt-12" justify="end" gap={12}>
                    <Button
                        type="primary"
                        onClick={() => form.submit()}
                        icon={<SaveOutlined />}
                        loading={
                            loadingApproveSO ||
                            loadingApproveSOGuarantee ||
                            loadingRequestSO ||
                            loadingRequestSOGuarantee ||
                            loadingRequestRefundSO
                        }
                    >
                        {i18n.t('action.save')}
                    </Button>
                    <Button onClick={() => props.setIsModalOpen(false)}>{i18n.t('action.close')}</Button>
                </Flex>
            </Form>
        </Modal>
    );
};
