import { Button } from 'antd';
import isNil from 'lodash/isNil';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DebouncedState } from 'use-debounce';

import {
    ClockCircleOutlined,
    FileSyncOutlined,
    IssuesCloseOutlined,
    PrinterOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import Can from '@components/common/Can';
import { ButtonPrint } from '@fragments/SaleOrders/components/ButtonPrint';
import { ConfirmStatusComponent } from '@fragments/SaleOrders/components/ConfirmStatusComponent';
import { DrawerVoucher } from '@fragments/SaleOrders/components/DrawerVoucher';
import { RouteChangeTourSOState, TypeButton } from '@fragments/SaleOrders/features';
import { useCheckSOTN } from '@fragments/SaleOrders/hooks/useCheckSOTN';
import { useSaleOrderDetailStore } from '@fragments/SaleOrders/store/saleOrderDetailStore';
import { useGetSaleOrder } from '@hooks/queries/useSaleOrders';
import { OrderStatus, SaleOrderDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { MyPermissions } from '@utils/Permissions/index.ts';

interface ListActionProps {
    soId: string;
    onSubmit: DebouncedState<() => void>;
    isEnableEdit: boolean;
    isSubmitting: boolean;
    setIsOpenConfirmationModal: Dispatch<SetStateAction<boolean>>;
    isOpenConfirmationModal: boolean;
    setInvalidQuerySOList: () => void;
    dataChangeTour: SaleOrderDto | undefined;
}

const statusShouldDisableFields = [OrderStatus.Canceled];
const StatusShowRefundRequestBtn = [OrderStatus.Deposited, OrderStatus.Paid, OrderStatus.Confirmed];
const StatusShowApproveBtn = [OrderStatus.Confirming, OrderStatus.Overload];

export const ListAction: React.FC<ListActionProps> = props => {
    const {
        soId,
        onSubmit,
        isEnableEdit,
        isSubmitting,
        setIsOpenConfirmationModal,
        isOpenConfirmationModal,
        setInvalidQuerySOList,
        dataChangeTour,
    } = props;

    const navigate = useNavigate();
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const isSOTN = useCheckSOTN();

    // Store
    const { tourId } = useSaleOrderDetailStore(state => state);

    // State
    const [disableFields, setDisableFields] = useState<string[]>([]);

    // Query
    const { data: saleOrder } = useGetSaleOrder(soId ?? '');

    const handleDisableFields = useCallback(() => {
        if (isSOTN) {
            setDisableFields(['btnSave', 'btnConfirm']);
            return;
        }

        if (saleOrder?.status) {
            if (statusShouldDisableFields.includes(saleOrder.status)) {
                setDisableFields(['btnSave', 'btnConfirm']);
            }
        }
    }, [isSOTN, saleOrder?.status]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    const soIdMemo = useMemo(() => (soId ? [soId] : []), [soId]);
    const saleOrderMemo = useMemo(() => (saleOrder ? [saleOrder] : []), [saleOrder]);
    const disableSaveChangeTour = !!changeTourSOId && dataChangeTour?.tourScheduleId === tourId;

    return (
        <>
            <div className=" flex flex-wrap gap-2">
                {!isSOTN && (
                    <Can
                        permissions={[
                            MyPermissions.SaleOrderCreate,
                            MyPermissions.SaleOrderUpdate,
                            MyPermissions.AgencySaleOrderCreate,
                            MyPermissions.AgencySaleOrderUpdate,
                        ]}
                    >
                        <Button
                            className="text-xs"
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={onSubmit}
                            disabled={disableFields.includes('btnSave') || !isEnableEdit || disableSaveChangeTour}
                            loading={isSubmitting}
                        >
                            {i18n.t(`action.save`)}
                        </Button>
                    </Can>
                )}
                {soId && (
                    <Can
                        permissions={[
                            MyPermissions.SaleOrderUpdate,
                            MyPermissions.SaleOrderView,
                            MyPermissions.AgencySaleOrderView,
                            MyPermissions.AgencySaleOrderUpdate,
                        ]}
                    >
                        <ButtonPrint
                            soId={soId ?? ''}
                            text={i18n.t('In Đơn')}
                            className="text-xs"
                            icon={<PrinterOutlined />}
                        />
                    </Can>
                )}
                {!isNil(saleOrder) &&
                    !isNil(saleOrder?.status) &&
                    StatusShowApproveBtn.includes(saleOrder?.status) &&
                    !isSOTN && (
                        <Can permissions={[MyPermissions.SaleOrderApprove]}>
                            <Button
                                className="text-xs"
                                onClick={() => setIsOpenConfirmationModal(true)}
                                disabled={!soId || disableFields.includes('btnConfirm')}
                                icon={<IssuesCloseOutlined />}
                            >
                                {i18n.t(`action.acceptOpenSale`)}
                            </Button>
                        </Can>
                    )}
                {saleOrder?.status === OrderStatus.SendRefund && (
                    <Can permissions={[MyPermissions.RefundVoucherApprove]}>
                        <Button
                            className="text-xs"
                            onClick={() => setIsOpenConfirmationModal(true)}
                            icon={<IssuesCloseOutlined />}
                        >
                            {i18n.t(`action.acceptOpenSale`)}
                        </Button>
                    </Can>
                )}
                {saleOrder?.status === OrderStatus.New && !(isSOTN && saleOrder.paymentAmt === 0) && (
                    <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                        <Button
                            className="text-xs"
                            onClick={() => setIsOpenConfirmationModal(true)}
                            disabled={!soId || disableFields.includes('btnConfirm')}
                            icon={<ClockCircleOutlined />}
                        >
                            {i18n.t(`action.sentRequest`)}
                        </Button>
                    </Can>
                )}
                {!isNil(saleOrder) &&
                    !isNil(saleOrder?.status) &&
                    StatusShowRefundRequestBtn.includes(saleOrder?.status) && (
                        <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                            <Button
                                className="text-xs"
                                onClick={() => setIsOpenConfirmationModal(true)}
                                disabled={false}
                                icon={<FileSyncOutlined />}
                            >
                                {i18n.t(`action.refundRequest`)}
                            </Button>
                        </Can>
                    )}
                {soId && (
                    <Can
                        permissions={[
                            MyPermissions.ReceivableVoucherView,
                            MyPermissions.RefundVoucherView,
                            MyPermissions.AgencyReceivableVoucherView,
                            MyPermissions.AgencyRefundVoucherView,
                        ]}
                    >
                        <DrawerVoucher soId={soId} typeButton={TypeButton.Full} />
                    </Can>
                )}
                <Button className="text-xs" onClick={() => navigate(`${rootPathsNew.saleOrders}`)}>
                    {i18n.t(`action.back`)}
                </Button>
            </div>

            <ConfirmStatusComponent
                soIds={soIdMemo}
                saleOrders={saleOrderMemo}
                isOpenModal={isOpenConfirmationModal}
                setIsModalOpen={setIsOpenConfirmationModal}
                fetchNewDataSaleOrder={setInvalidQuerySOList}
                statusModal={saleOrder?.status}
                isConfirming={saleOrder?.status === OrderStatus.Confirming}
                isOverload={saleOrder?.status === OrderStatus.Overload}
                isRequestRefund={
                    !isNil(saleOrder) &&
                    !isNil(saleOrder?.status) &&
                    StatusShowRefundRequestBtn.includes(saleOrder?.status)
                }
                isWaitingRefundApprove={saleOrder?.status === OrderStatus.SendRefund}
            />
        </>
    );
};
