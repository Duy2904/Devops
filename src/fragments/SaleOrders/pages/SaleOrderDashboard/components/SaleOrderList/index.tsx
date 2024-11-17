import { DocumentType, OrderStatus, SaleOrderDto, SearchSaleOrderViewDto } from '@sdk/tour-operations';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Link, useNavigate } from 'react-router-dom';
import React, { useCallback, useMemo, useState } from 'react';
import {
    RouteChangeTourSOState,
    RouteCloneSOState,
    TypeButton,
    canChangeTour,
    canClone,
    canCreateVisaDocument,
    checkStatusSO,
    isOnlyOneStatus,
    statusShowCountDown,
} from '@fragments/SaleOrders/features';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { toastErr, toastSuccess } from '@components/ui/Toast/Toast';
import { useGetSaleOrders, useSODownload } from '@hooks/queries/useSaleOrders';

import { AppConfig } from '@utils/config';
import Can from '@components/common/Can';
import { CancelButton } from '@components/customizes/Button/CancelButton';
import { ChangeTourButton } from '@components/customizes/Button/ChangeTourButton';
import { CloneButton } from '@components/customizes/Button/CloneButton';
import { ConfirmStatusComponent } from '@fragments/SaleOrders/components/ConfirmStatusComponent';
import CountdownTimer from '@components/customizes/CountDown';
import { DocumentReceiptVisaButton } from '@components/customizes/Button/DocumentReceiptVisaButton';
import { DrawerVoucher } from '@fragments/SaleOrders/components/DrawerVoucher';
import { Flex } from 'antd';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { ListAction } from '../ListAction';
import { ModalConfirm } from '../ModalConfirm';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { OrderSearch } from '@fragments/SaleOrders/pages/SaleOrderDashboard/components/Search';
import { PrintButton } from '@components/customizes/Button/PrintButton';
import { StaticTag } from '@components/customizes/StaticTag';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { localeCompare } from '@utils/localeHelper';
import { rootPaths } from '@src/routers/route';
import { setSaleOrderColor } from '@utils/colorStatus';
import { useCancelSaleOrder } from '@fragments/SaleOrders/hooks/useSaleOrder';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useQueryClient } from 'react-query';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchTableStore } from '@store/searchTableStore';

interface SaleOrderSummaryDto {
    totalAmount?: number;
    paymentAmount?: number;
    remainingAmount?: number;
    commissionAmount?: number;
}

export const SaleOrdersList: React.FC = () => {
    const navigate = useNavigate();
    const isViewSO = useHasAnyPermission([MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]);
    const queryClient = useQueryClient();

    // State
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false);
    const [checkedId, setCheckedId] = useState<string | undefined>();
    const [isOpenConfirmChangeTour, setIsOpenConfirmChangeTour] = useState<boolean>(false);
    const [changeSOId, setChangeSOId] = useState<{ orderNo: string; id: string }>();

    // Store
    const {
        actions: { setItemReceivable },
    } = useSaleOrderStore(state => state);

    const {
        tableParams,
        actions: { setSearchParams, resetParams },
    } = useSearchTableStore(state => state);

    // Mutate
    const { mutateAsync: cancelSaleOrder } = useCancelSaleOrder();

    // Query
    const { isLoading, data } = useGetSaleOrders(tableParams);
    const saleOrderData: SearchSaleOrderViewDto[] = useMemo(() => data?.data ?? [], [data?.data]);
    const saleOrderSummary: SaleOrderSummaryDto = {
        totalAmount: data?.totalAmount,
        paymentAmount: data?.paymentAmount,
        remainingAmount: data?.remainingAmount,
        commissionAmount: data?.commissionAmount,
    };
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const setInvalidQuerySOList = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchSaleOrderList'] });
    }, [queryClient]);

    const { mutateAsync: SODownloadFile, isLoading: loadingDownload } = useSODownload();

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
            toastErr('', i18n.t('saleorder.dashboard.reverse.failed'));
            setInvalidQuerySOList();
        }
    };

    const columnsData: ColumnsType<SearchSaleOrderViewDto> = [
        {
            title: '',
            dataIndex: '',
            key: '',
            fixed: 'left',
            width: 0,
        },
        {
            title: i18n.t('saleorder.dashboard.table.orderNo'),
            dataIndex: 'orderNo',
            key: 'OrderNo',
            fixed: 'left',
            sorter: (aCode, bCode) => localeCompare(aCode.orderNo, bCode.orderNo),
            width: 150,
            render: (value: string, record) => (
                <Link className="font-medium" to={isViewSO ? `${rootPaths.saleOrderForm}/${record.id}` : '#'}>
                    {value}
                </Link>
            ),
        },
        {
            title: i18n.t('saleorder.dashboard.table.tourInforName'),
            dataIndex: 'tourInfo',
            key: 'tourInfo',
            width: 200,
            sorter: true,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('saleorder.dashboard.table.status'),
            dataIndex: 'status',
            key: 'Status',
            width: 150,
            align: 'center',
            render(text, record) {
                return (
                    <>
                        <StaticTag
                            type={i18n.t(`OrderStatus.${text}`) || ''}
                            color={`${setSaleOrderColor(record.status ?? '')}`}
                        />
                        {record.status && statusShowCountDown.includes(record.status) && record.endCountDown && (
                            <div className="mt-3">
                                <CountdownTimer
                                    endDate={Format.formatUTCTime(`${record.endCountDown}`)}
                                    className="text-xs text-red-500 font-semibold"
                                />
                            </div>
                        )}
                    </>
                );
            },
        },
        {
            title: i18n.t('saleorder.dashboard.table.contactName'),
            dataIndex: 'contactName',
            key: 'ContactName',
            width: 150,
            render: (_, record) => (
                <>
                    <p>{record.contactName}</p>
                    <p>{record.contactPhone}</p>{' '}
                </>
            ),
        },
        {
            title: i18n.t('saleorder.dashboard.table.totalIncludeVatAmt'),
            dataIndex: 'totalIncludeVatAmt',
            key: 'TotalIncludeVatAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render: value => <>{Format.formatNumber(value)}</>,
        },
        {
            title: i18n.t('saleorder.dashboard.table.paymentAmt'),
            dataIndex: 'paymentAmt',
            key: 'PaymentAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render: (_, record) => <>{Format.formatNumber(record.paymentAmt)}</>,
        },
        {
            title: i18n.t('saleorder.dashboard.table.remainAmt'),
            width: 150,
            key: 'RemainingAmt',
            align: 'right',
            sorter: true,
            render: (_, record) => <>{Format.formatNegativeNumber(record.remainingAmt)}</>,
        },
        {
            title: i18n.t('saleorder.dashboard.table.commissionAmt'),
            dataIndex: 'commissionAmt',
            key: 'CommissionAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render: (_, record) => <>{Format.formatNumber(record.commissionAmt)}</>,
        },
        {
            title: i18n.t('saleorder.dashboard.table.createdOn'),
            dataIndex: 'createdOn',
            key: 'CreatedOn',
            width: 150,
            sorter: true,
            defaultSortOrder: 'descend',
            render: (_, record) => (
                <>
                    <p>{record.createName}</p>
                    <p>{Format.formatUTCTime(`${record.createdOn}`, AppConfig.DateTimeWithSecondsFormat)}</p>
                </>
            ),
        },
        {
            title: i18n.t('action.action'),
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (_, data: SearchSaleOrderViewDto) => (
                <Flex className="gap-2 flex-wrap" justify="end">
                    {canChangeTour(data) && (
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
                    {canClone(data) && (
                        <Can permissions={[MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]}>
                            <CloneButton
                                tooltip={i18n.t('action.clone')}
                                onClick={() =>
                                    navigate(`${rootPaths.saleOrderForm}`, {
                                        state: {
                                            clonedId: data.id,
                                        } as RouteCloneSOState,
                                    })
                                }
                            />
                        </Can>
                    )}
                    {data.isTourServiceVisa && canCreateVisaDocument(data) && (
                        <Can permissions={[MyPermissions.TourVisaCreate]}>
                            <DocumentReceiptVisaButton
                                tooltip={i18n.t('Thu hồ sơ Visa')}
                                onClick={() => {
                                    setItemReceivable({
                                        orderData: data,
                                    });
                                    resetParams();
                                    navigate(`${rootPaths.documentReceiptForm}`);
                                }}
                            />
                        </Can>
                    )}
                    <Can permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                        <PrintButton
                            onClick={() => {
                                handlePrint(data.id ?? '');
                                setCheckedId(data.id);
                            }}
                            isLoading={loadingDownload && data.id === checkedId}
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
                        <DrawerVoucher soId={data.id ?? ''} typeButton={TypeButton.Shorten} />
                    </Can>
                    {data.status === OrderStatus.New && (
                        <Can permissions={[MyPermissions.SaleOrderCancel, MyPermissions.AgencySaleOrderCancel]}>
                            <CancelButton
                                titleName={i18n.t('saleorder.dashboard.reverse.title')}
                                content={`${i18n.t('saleorder.dashboard.reverse.content')} ${data.orderNo}`}
                                onOk={handleReverseSO(data.id!)}
                                tooltip={i18n.t('action.cancel')}
                            />
                        </Can>
                    )}
                </Flex>
            ),
        },
    ];

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SaleOrderDto> | SorterResult<SaleOrderDto>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={6}>
                        {Format.formatNumber(saleOrderSummary?.totalAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={7}>
                        {Format.formatNumber(saleOrderSummary?.paymentAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={8}>
                        {Format.formatNumber(saleOrderSummary?.remainingAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={9}>
                        {Format.formatNumber(saleOrderSummary?.commissionAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={10}></Table.Summary.Cell>
                    <Table.Summary.Cell index={11}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    const isSelectOneRow = useMemo(() => rowSelected.length == 1, [rowSelected.length]);
    const isRequestRefund = useMemo(
        () =>
            isOnlyOneStatus(OrderStatus.Deposited, rowSelected, saleOrderData) ||
            isOnlyOneStatus(OrderStatus.Paid, rowSelected, saleOrderData) ||
            isOnlyOneStatus(OrderStatus.Confirmed, rowSelected, saleOrderData),
        [rowSelected, saleOrderData],
    );
    const isApproveRefund = useMemo(
        () => isOnlyOneStatus(OrderStatus.SendRefund, rowSelected, saleOrderData),
        [rowSelected, saleOrderData],
    );
    const isOverload = useMemo(
        () => isOnlyOneStatus(OrderStatus.Overload, rowSelected, saleOrderData),
        [rowSelected, saleOrderData],
    );
    const isConfirming = useMemo(
        () => isOnlyOneStatus(OrderStatus.Confirming, rowSelected, saleOrderData),
        [rowSelected, saleOrderData],
    );
    const isCreateRefundVoucher = useMemo(
        () => isOnlyOneStatus(OrderStatus.WaitRefund, rowSelected, saleOrderData),
        [rowSelected, saleOrderData],
    );
    const isShowCreateReceivableVoucher = useMemo(
        () =>
            isOnlyOneStatus(OrderStatus.New, rowSelected, saleOrderData) ||
            isOnlyOneStatus(OrderStatus.Confirming, rowSelected, saleOrderData) ||
            isOnlyOneStatus(OrderStatus.Confirmed, rowSelected, saleOrderData) ||
            isOnlyOneStatus(OrderStatus.Deposited, rowSelected, saleOrderData),
        [rowSelected, saleOrderData],
    );
    const isRequest = useMemo(
        () => isOnlyOneStatus(OrderStatus.New, rowSelected, saleOrderData),
        [rowSelected, saleOrderData],
    );

    const isSOTourTN = useMemo(() => {
        if (isEmpty(rowSelected)) {
            return false;
        }

        const hasTourTN = rowSelected?.find(x =>
            saleOrderData.find(y => y.id === x && y.tourScheduleHasTourThienNhien),
        );

        return !isEmpty(hasTourTN);
    }, [rowSelected, saleOrderData]);

    const handleAcceptChangeTour = useCallback(() => {
        navigate(`${rootPaths.saleOrderForm}`, {
            state: {
                changeTourSOId: changeSOId?.id,
            } as RouteChangeTourSOState,
        });
        setIsOpenConfirmChangeTour(false);
    }, [navigate, changeSOId]);

    const handleRejectChangeTour = useCallback(() => {
        setIsOpenConfirmChangeTour(false);
    }, []);

    return (
        <>
            <div className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <OrderSearch />
                <GridTableComponent
                    loading={isLoading}
                    columns={columnsData}
                    tableParams={tableParams}
                    dataSource={saleOrderData}
                    onChange={handleTableChange}
                    bordered={true}
                    scrollX={1500}
                    scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
                    showReport={true}
                    tableName={i18n.t('saleorder.dashboard.table.tableName')}
                    summary={handleSummary}
                    setRowSelected={setRowSelected}
                    showAction
                    listAction={
                        <ListAction
                            isShowApproveButton={isSelectOneRow && (isConfirming || isOverload)}
                            isShowRequestButton={isRequest && !isSOTourTN}
                            isShowCreateReceivableVoucher={isSelectOneRow && isShowCreateReceivableVoucher}
                            isShowCreateRefundVoucher={isSelectOneRow && isCreateRefundVoucher}
                            isShowRequestRefundButton={isRequestRefund}
                            isShowApproveRefundButton={isApproveRefund}
                            soId={rowSelected[0] as string}
                            tourInfo={saleOrderData.find(item => item.id == rowSelected[0]) ?? {}}
                            setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                        />
                    }
                />
            </div>
            <ConfirmStatusComponent
                soIds={rowSelected}
                saleOrders={saleOrderData}
                isOpenModal={isOpenConfirmationModal}
                setIsModalOpen={setIsOpenConfirmationModal}
                fetchNewDataSaleOrder={setInvalidQuerySOList}
                statusModal={checkStatusSO(rowSelected, saleOrderData)}
                isConfirming={isConfirming}
                isRequestRefund={isRequestRefund}
                isOverload={isOverload}
                isWaitingRefundApprove={isApproveRefund}
            />
            <ModalConfirm
                isOpenModal={isOpenConfirmChangeTour}
                handleConfirm={handleAcceptChangeTour}
                handleCancel={handleRejectChangeTour}
            >
                <p>Bạn muốn chuyển tour cho đơn {changeSOId?.orderNo} không?</p>
            </ModalConfirm>
        </>
    );
};
