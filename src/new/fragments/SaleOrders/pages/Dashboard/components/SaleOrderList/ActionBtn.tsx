import { DocumentType, OrderStatus, SearchSaleOrderViewDto } from '@sdk/tour-operations';
import { Key, useCallback } from 'react';
import {
    RouteCloneSOState,
    TypeButton,
    canChangeTour,
    canClone,
    canCreateVisaDocument,
    forbiddenUpdateContent,
} from '@src/new/fragments/SaleOrders/features';

import { ApproveBtn } from '@src/new/components/customs/Buttons/ApproveBtn';
import Can from '@src/new/components/common/Can';
import { CancelButton } from '@src/new/components/customs/Buttons/CancelButton';
import { ChangeTourButton } from '@src/new/components/customs/Buttons/ChangeTourButton';
import { CloneButton } from '@src/new/components/customs/Buttons/CloneButton';
import { CreateReceivableVoucherButton } from '@src/new/components/customs/Buttons/CreateReceivableVoucherButton';
import { CreateRefundVoucherButton } from '@src/new/components/customs/Buttons/CreateRefundVoucherButton';
import { DocumentReceiptVisaButton } from '@src/new/components/customs/Buttons/DocumentReceiptVisaButton';
import { DrawerVoucher } from '@src/new/fragments/SaleOrders/components/DrawerVoucher';
import { EditBtn } from '@src/new/components/customs/Buttons/EditBtn';
import { Flex } from 'antd';
import { MyPermissions } from '@utils/Permissions';
import { PrintButton } from '@src/new/components/customs/Buttons/PrintButton';
import { RequestApproveBtn } from '@src/new/components/customs/Buttons/RequestApproveBtn';
import { RequestRefundSoBtn } from '@src/new/components/customs/Buttons/RequestRefundSoBtn';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { rootPaths } from '@src/routers/route';
import { rootPathsNew } from '@src/routers/newRoute';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useCancelSaleOrder } from '@src/new/fragments/SaleOrders/hooks/useSaleOrder';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useSODownload } from '@hooks/queries/useSaleOrders';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';

interface ActionBtnProps {
    data?: SearchSaleOrderViewDto;
    setIsOpenConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    setRowSelected: React.Dispatch<React.SetStateAction<React.Key[]>>;
    setChangeSOId: React.Dispatch<React.SetStateAction<{ orderNo: string; id: string } | undefined>>;
    setIsOpenConfirmChangeTour: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ActionBtn: React.FC<ActionBtnProps> = ({
    data,
    setIsOpenConfirmationModal,
    setRowSelected,
    setChangeSOId,
    setIsOpenConfirmChangeTour,
}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // store
    const {
        actions: { setItemReceivable },
    } = useSaleOrderStore(state => state);

    const {
        actions: { resetParamsNew },
    } = useSearchTableStoreNew(state => state);

    const { mutateAsync: SODownloadFile, isLoading: loadingDownload } = useSODownload();
    const { mutateAsync: cancelSaleOrder, isLoading: loadingCancel } = useCancelSaleOrder();
    const setInvalidQuerySOList = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchSaleOrderList'] });
    }, [queryClient]);
    const navigateToFormEdit = (soId: string) => {
        navigate(`${rootPathsNew.saleOrderFormDetail}/${soId}`);
    };

    const isShowCreateReceivableVoucher = (status: OrderStatus) => {
        const canCreateReceivable = [
            OrderStatus.New,
            OrderStatus.Confirming,
            OrderStatus.Confirmed,
            OrderStatus.Deposited,
        ].includes(status);
        return canCreateReceivable;
    };

    const handleCreateVoucher = (data: SearchSaleOrderViewDto, navigateUrl: string) => {
        setItemReceivable({ orderData: data ?? {} });
        navigate(navigateUrl);
        resetParamsNew();
    };

    const isShowRequestButton = (dataSO: SearchSaleOrderViewDto) => {
        return !dataSO?.tourScheduleHasTourThienNhien && dataSO?.status == OrderStatus.New;
    };

    const isShowApproveButton = (status: OrderStatus) => {
        const canApproveStatus = [OrderStatus.Confirming, OrderStatus.Overload].includes(status);
        return canApproveStatus;
    };

    const isShowApproveRefundButton = (status: OrderStatus) => {
        return status == OrderStatus.SendRefund;
    };

    const isShowRequestRefundButton = (status: OrderStatus) => {
        const canRefund = [OrderStatus.Deposited, OrderStatus.Paid, OrderStatus.Confirmed].includes(status);
        return canRefund;
    };

    const handlePrint = async (id: string) => {
        const request = {
            id: id ?? '',
            type: DocumentType.Pdf,
        };
        const res = await SODownloadFile(request);
        window.open(res, '_blank');
    };

    const handleReverseSO = (id: string) => async () => {
        try {
            const response = await cancelSaleOrder(id);
            setInvalidQuerySOList();
            if (!isEmpty(response)) {
                toastSuccess('', i18n.t('saleorder.dashboard.reverse.success'));
            }
        } catch {
            setInvalidQuerySOList();
        }
    };

    return (
        <Flex className="gap-2 flex-wrap" justify="end">
            {data?.status && !forbiddenUpdateContent(data) && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <EditBtn isSmall onClick={() => navigateToFormEdit(data?.id ?? '')} />
                </Can>
            )}
            {data?.status && isShowCreateReceivableVoucher(data?.status) && (
                <Can permissions={[MyPermissions.ReceivableVoucherCreate, MyPermissions.AgencyReceivableVoucherCreate]}>
                    <CreateReceivableVoucherButton
                        isSmall
                        onClick={() => handleCreateVoucher(data, rootPathsNew.receivableFormDetail)}
                    />
                </Can>
            )}
            {data?.status == OrderStatus.WaitRefund && (
                <Can permissions={[MyPermissions.RefundVoucherCreate, MyPermissions.AgencyRefundVoucherCreate]}>
                    <CreateRefundVoucherButton
                        isSmall
                        onClick={() => handleCreateVoucher(data, rootPathsNew.refundFormDetail)}
                    />
                </Can>
            )}
            {data && isShowRequestButton(data) && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <RequestApproveBtn
                        onClick={() => {
                            setIsOpenConfirmationModal(true);
                            setRowSelected([data?.id as Key]);
                        }}
                        isSmall
                    />
                </Can>
            )}
            {data?.status && isShowApproveButton(data?.status) && (
                <Can permissions={[MyPermissions.SaleOrderApprove]}>
                    <ApproveBtn
                        isSmall
                        onClick={() => {
                            setIsOpenConfirmationModal(true);
                            setRowSelected([data?.id as Key]);
                        }}
                    />
                </Can>
            )}
            {data?.status && isShowApproveRefundButton(data?.status) && (
                <Can permissions={[MyPermissions.SaleOrderApprove]}>
                    <ApproveBtn
                        isSmall
                        onClick={() => {
                            setIsOpenConfirmationModal(true);
                            setRowSelected([data?.id as Key]);
                        }}
                    />
                </Can>
            )}
            {data?.status && isShowRequestRefundButton(data?.status) && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <RequestRefundSoBtn
                        onClick={() => {
                            setIsOpenConfirmationModal(true);
                            setRowSelected([data?.id as Key]);
                        }}
                    />
                </Can>
            )}
            {data && canChangeTour(data) && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <ChangeTourButton
                        tooltip={i18n.t('action.changeTour')}
                        onClick={() => {
                            setIsOpenConfirmChangeTour(true);
                            setChangeSOId({ orderNo: data.orderNo ?? '', id: data.id ?? '' });
                        }}
                    />
                </Can>
            )}
            {data && canClone(data) && (
                <Can permissions={[MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]}>
                    <CloneButton
                        tooltip={i18n.t('action.clone')}
                        onClick={() =>
                            navigate(`${rootPathsNew.saleOrderFormDetail}`, {
                                state: {
                                    clonedId: data.id,
                                } as RouteCloneSOState,
                            })
                        }
                    />
                </Can>
            )}
            {data?.isTourServiceVisa && canCreateVisaDocument(data) && (
                <Can permissions={[MyPermissions.TourVisaCreate]}>
                    <DocumentReceiptVisaButton
                        tooltip={i18n.t('Thu hồ sơ Visa')}
                        onClick={() => {
                            setItemReceivable({ orderData: data });
                            resetParamsNew();
                            navigate(`${rootPaths.documentReceiptForm}`);
                        }}
                    />
                </Can>
            )}
            {data && (
                <Can
                    permissions={[
                        MyPermissions.ReceivableVoucherView,
                        MyPermissions.RefundVoucherView,
                        MyPermissions.AgencyReceivableVoucherView,
                        MyPermissions.AgencyRefundVoucherView,
                    ]}
                >
                    <DrawerVoucher soId={data?.id ?? ''} typeButton={TypeButton.Shorten} data={data} showInfo />
                </Can>
            )}
            <Can permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                <PrintButton
                    onClick={() => {
                        handlePrint(data?.id ?? '');
                    }}
                    isLoading={loadingDownload}
                    tooltip={i18n.t('action.print')}
                />
            </Can>
            {data?.status === OrderStatus.New && (
                <Can permissions={[MyPermissions.SaleOrderCancel, MyPermissions.AgencySaleOrderCancel]}>
                    <CancelButton
                        titleName={i18n.t('saleorder.dashboard.reverse.title')}
                        content={`${i18n.t('saleorder.dashboard.reverse.content')} ${data.orderNo}`}
                        onOk={handleReverseSO(data.id!)}
                        tooltip={i18n.t('action.cancel')}
                        isLoading={loadingCancel}
                    />
                </Can>
            )}
        </Flex>
    );
};
