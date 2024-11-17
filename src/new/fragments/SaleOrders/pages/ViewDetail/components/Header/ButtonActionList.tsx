import { Flex } from 'antd';
import modal from 'antd/es/modal';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { toastSuccess } from '@components/ui/Toast/Toast';
import { useSODownload } from '@hooks/queries/useSaleOrders';
import { DocumentType, OrderStatus, SaleOrderDto, SearchSaleOrderViewDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import Can from '@src/new/components/common/Can';
import { ApproveBtn } from '@src/new/components/customs/Buttons/ApproveBtn';
import { CancelButton } from '@src/new/components/customs/Buttons/CancelButton';
import { ChangeTourButton } from '@src/new/components/customs/Buttons/ChangeTourButton';
import { CloneButton } from '@src/new/components/customs/Buttons/CloneButton';
import { CreateReceivableVoucherButton } from '@src/new/components/customs/Buttons/CreateReceivableVoucherButton';
import { CreateRefundVoucherButton } from '@src/new/components/customs/Buttons/CreateRefundVoucherButton';
import { DocumentReceiptVisaButton } from '@src/new/components/customs/Buttons/DocumentReceiptVisaButton';
import { EditBtn } from '@src/new/components/customs/Buttons/EditBtn';
import { PrintButton } from '@src/new/components/customs/Buttons/PrintButton';
import { RequestApproveBtn } from '@src/new/components/customs/Buttons/RequestApproveBtn';
import { RequestRefundSoBtn } from '@src/new/components/customs/Buttons/RequestRefundSoBtn';
import { ConfirmStatusComponent } from '@src/new/fragments/SaleOrders/components/ConfirmStatusComponent';
import { DrawerVoucher } from '@src/new/fragments/SaleOrders/components/DrawerVoucher';
import { forbiddenUpdateContent, RouteCloneSOState } from '@src/new/fragments/SaleOrders/features';
import { useCheckTourSendGuest } from '@src/new/fragments/SaleOrders/hooks/useCheckTourSendGuest';
import { useCancelSaleOrder } from '@src/new/fragments/SaleOrders/hooks/useSaleOrder';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { MyPermissions } from '@src/new/shared/utils/Permissions';
import { rootPathsNew } from '@src/routers/newRoute';
import { rootPaths } from '@src/routers/route';
import { useSaleOrderStore } from '@store/saleOrderStore';

import { RouteChangeTourSOState } from '../../../SaleOrderFormDetail/features';
import { QueriesKey } from '../../../SaleOrderFormDetail/hooks/QueriesKey';
import { canChangeTour, canClone, canCreateVisaDocument, TypeButton } from '../../features';

interface ButtonActionListProps {
    data?: SaleOrderDto;
}

export const ButtonActionList: React.FC<ButtonActionListProps> = ({ data }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { soId } = useParams<string>();

    // State
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false);
    const [checkedId, setCheckedId] = useState<string | undefined>();

    const {
        actions: { setItemReceivable },
    } = useSaleOrderStore(state => state);
    const {
        actions: { resetParamsNew },
    } = useSearchTableStoreNew(state => state);
    const { mutateAsync: SODownloadFile, isLoading: loadingDownload } = useSODownload();

    // Mutate
    const { mutateAsync: cancelSaleOrder, isLoading: loadingCancel } = useCancelSaleOrder();

    const isRequestRefund = useMemo(
        () =>
            data?.status === OrderStatus.Deposited ||
            data?.status === OrderStatus.Paid ||
            data?.status === OrderStatus.Confirmed,
        [data?.status],
    );
    const isApproveRefund = useMemo(() => data?.status === OrderStatus.SendRefund, [data?.status]);
    const isOverload = useMemo(() => data?.status === OrderStatus.Overload, [data?.status]);
    const isConfirming = useMemo(() => data?.status === OrderStatus.Confirming, [data?.status]);
    const isCreateRefundVoucher = useMemo(() => data?.status === OrderStatus.WaitRefund, [data?.status]);
    const isShowCreateReceivableVoucher = useMemo(
        () =>
            data?.status === OrderStatus.New ||
            data?.status === OrderStatus.Confirming ||
            data?.status === OrderStatus.Confirmed ||
            data?.status === OrderStatus.Deposited,
        [data?.status],
    );
    const isRequest = useMemo(
        () => data?.status === OrderStatus.New,

        [data?.status],
    );

    const isTourSendGuest = useCheckTourSendGuest({ dataSO: data });

    const navigateToFormEdit = () => {
        navigate(`${rootPathsNew.saleOrderFormDetail}/${soId}`);
    };

    const handleCreateVoucher = (navigateUrl: string) => {
        setItemReceivable({
            orderData: {
                ...(data as SearchSaleOrderViewDto),
                tourCode: data?.tourSchedule?.tourCode ?? '',
                tourName: data?.tourSchedule?.name,
            },
        });
        navigate(navigateUrl);
        resetParamsNew();
    };

    const setInvalidQuerySOList = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: [QueriesKey.GetSaleOrderDetail] });
    }, [queryClient]);

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

    const handleChangeTour =
        ({ orderNo, id }: { orderNo: string; id: string }) =>
            () => {
                modal.confirm({
                    content: i18n.t(`Bạn muốn chuyển tour cho đơn ${orderNo} không?`),
                    cancelText: i18n.t('action.back'),
                    onOk: () => {
                        navigate(`${rootPathsNew.saleOrderFormDetail}`, {
                            state: {
                                changeTourSOId: id,
                            } as RouteChangeTourSOState,
                        });
                    },
                });
            };
    return (
        <Flex align="center" gap={8}>
            {data?.status && !forbiddenUpdateContent(data) && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <EditBtn onClick={navigateToFormEdit} />
                </Can>
            )}
            {isShowCreateReceivableVoucher && (
                <Can permissions={[MyPermissions.ReceivableVoucherCreate, MyPermissions.AgencyReceivableVoucherCreate]}>
                    <CreateReceivableVoucherButton
                        onClick={() => handleCreateVoucher(rootPathsNew.receivableFormDetail)}
                    />
                </Can>
            )}
            {isCreateRefundVoucher && (
                <Can permissions={[MyPermissions.RefundVoucherCreate, MyPermissions.AgencyRefundVoucherCreate]}>
                    <CreateRefundVoucherButton onClick={() => handleCreateVoucher(rootPathsNew.refundFormDetail)} />
                </Can>
            )}
            {isRequest && !isTourSendGuest && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <RequestApproveBtn
                        onClick={() => {
                            setIsOpenConfirmationModal(true);
                        }}
                    />
                </Can>
            )}
            {(isConfirming || isOverload) && (
                <Can permissions={[MyPermissions.SaleOrderApprove]}>
                    <ApproveBtn
                        isSmall
                        onClick={() => {
                            setIsOpenConfirmationModal(true);
                        }}
                    />
                </Can>
            )}
            {isRequestRefund && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <RequestRefundSoBtn
                        onClick={() => {
                            setIsOpenConfirmationModal(true);
                        }}
                    />
                </Can>
            )}
            {isApproveRefund && (
                <Can permissions={[MyPermissions.SaleOrderApprove]}>
                    <ApproveBtn
                        isSmall
                        onClick={() => {
                            setIsOpenConfirmationModal(true);
                        }}
                    />
                </Can>
            )}
            {canChangeTour(data) && (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <ChangeTourButton
                        tooltip={i18n.t('action.changeTour')}
                        onClick={handleChangeTour({ orderNo: data?.orderNo ?? '', id: data?.id ?? '' })}
                    />
                </Can>
            )}
            {canClone(data) && (
                <Can permissions={[MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]}>
                    <CloneButton
                        tooltip={i18n.t('action.clone')}
                        onClick={() =>
                            navigate(`${rootPathsNew.saleOrderFormDetail}`, {
                                state: {
                                    clonedId: data?.id,
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
                            setItemReceivable({
                                orderData: data as SearchSaleOrderViewDto,
                            });
                            resetParamsNew();
                            navigate(`${rootPaths.documentReceiptForm}`);
                        }}
                    />
                </Can>
            )}
            <Can permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                <PrintButton
                    onClick={() => {
                        handlePrint(data?.id ?? '');
                        setCheckedId(data?.id);
                    }}
                    isLoading={loadingDownload && data?.id === checkedId}
                    tooltip={i18n.t('action.print')}
                />
            </Can>
            <Can
                permissions={[
                    MyPermissions.ReceivableVoucherView,
                    MyPermissions.RefundVoucherView,
                    MyPermissions.AgencyReceivableVoucherView,
                    MyPermissions.AgencyRefundVoucherView,
                ]}
            >
                <DrawerVoucher
                    soId={data?.id ?? ''}
                    typeButton={TypeButton.Shorten}
                    data={data as SearchSaleOrderViewDto}
                />
            </Can>
            {data?.status === OrderStatus.New && (
                <Can permissions={[MyPermissions.SaleOrderCancel, MyPermissions.AgencySaleOrderCancel]}>
                    <CancelButton
                        titleName={i18n.t('saleorder.dashboard.reverse.title')}
                        content={`${i18n.t('saleorder.dashboard.reverse.content')} ${data?.orderNo}`}
                        onOk={handleReverseSO(data?.id ?? '')}
                        tooltip={i18n.t('action.cancel')}
                        isLoading={loadingCancel}
                    />
                </Can>
            )}
            <ConfirmStatusComponent
                soIds={[data?.id ?? '']}
                saleOrders={[data ?? {}]}
                isOpenModal={isOpenConfirmationModal}
                setIsModalOpen={setIsOpenConfirmationModal}
                fetchNewDataSaleOrder={setInvalidQuerySOList}
                statusModal={data?.status}
                isConfirming={isConfirming}
                isRequestRefund={isRequestRefund}
                isOverload={isOverload}
                isWaitingRefundApprove={isApproveRefund}
            />
        </Flex>
    );
};
