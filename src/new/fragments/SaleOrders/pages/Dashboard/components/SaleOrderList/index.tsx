import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Link, useNavigate } from 'react-router-dom';
import { OrderStatus, SaleOrderDto, SearchSaleOrderViewDto } from '@sdk/tour-operations';
import React, { useCallback, useMemo, useState } from 'react';
import {
    RouteChangeTourSOState,
    checkStatusSO,
    isOnlyOneStatus,
    statusShowCountDown,
} from '@src/new/fragments/SaleOrders/features';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table';

import { ActionBtn } from './ActionBtn';
import { AppConfig } from '@utils/config';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { ConfirmStatusComponent } from '@src/new/fragments/SaleOrders/components/ConfirmStatusComponent';
import CountdownTimer from '@components/customizes/CountDown';
import { Flex } from 'antd';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { IconCheck } from '@src/new/components/common/svg/IconCheck';
import { ModalConfirm } from '../ModalConfirm';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { OrderSearch } from '../Search';
import { PageName } from '@src/types/TypeEnum';
import { PhoneFilled } from '@ant-design/icons';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { TagTourID } from '@src/new/components/ui/Tag/TagTourID';
import clsx from 'clsx';
import i18n from '@src/i18n';
import { localeCompare } from '@utils/localeHelper';
import { rootPathsNew } from '@src/routers/newRoute';
import { t } from 'i18next';
import { useGetSaleOrders } from '@hooks/queries/useSaleOrders';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useQueryClient } from 'react-query';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';

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
    const [isOpenConfirmChangeTour, setIsOpenConfirmChangeTour] = useState<boolean>(false);
    const [changeSOId, setChangeSOId] = useState<{ orderNo: string; id: string }>();

    // Store
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

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
            width: 200,
            render: (value: string, record) => (
                <Link
                    className="font-medium text-sm"
                    to={isViewSO ? `${rootPathsNew.saleOrderViewDetail}/${record.id}` : '#'}
                >
                    {value}
                </Link>
            ),
        },
        {
            title: i18n.t('saleorder.dashboard.table.tourInforName'),
            dataIndex: 'tourName',
            key: 'TourName',
            width: 300,
            sorter: true,
            render(value, record) {
                return (
                    <>
                        <p className="text-sm font-medium mb-1">{value}</p>
                        <TagTourID text={record?.tourCode ?? ''} className="text-xs" />
                    </>
                );
            },
        },
        {
            title: i18n.t('saleorder.dashboard.table.status'),
            dataIndex: 'status',
            key: 'Status',
            width: 180,
            align: 'center',
            render(_value, record) {
                return (
                    <>
                        <TagStatus
                            className="text-sm"
                            text={t(`OrderStatus.${record.status}`)}
                            page={PageName.SaleOrder}
                            status={`${record.status}`}
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
            width: 180,
            render: (_, record) => (
                <>
                    <p className={clsx('text-sm', Color.text_black_87)}>{record.contactName}</p>
                    <div
                        className={clsx(
                            'inline-block text-sm rounded-lg py-1 px-2',
                            Color.text_666666,
                            Color.bg_EDEDED,
                        )}
                    >
                        <Flex align="center" gap={4}>
                            <PhoneFilled className="text-xs" />
                            <span className="text-xs">{record.contactPhone}</span>
                        </Flex>
                    </div>
                </>
            ),
        },
        {
            title: i18n.t('saleorder.dashboard.table.totalIncludeVatAmt'),
            dataIndex: 'totalIncludeVatAmt',
            key: 'TotalIncludeVatAmt',
            width: 160,
            align: 'right',
            sorter: true,
            render: value => <p className={clsx('text-sm', Color.text_black_87)}>{Format.formatNumber(value)}</p>,
        },
        {
            title: i18n.t('saleorder.dashboard.table.paymentAmt'),
            dataIndex: 'paymentAmt',
            key: 'PaymentAmt',
            width: 180,
            align: 'right',
            sorter: true,
            render: (_, record) => (
                <p className={clsx('text-sm', Color.text_black_87)}>{Format.formatNumber(record.paymentAmt)}</p>
            ),
        },
        {
            title: i18n.t('saleorder.dashboard.table.remainAmt'),
            width: 150,
            key: 'RemainingAmt',
            align: 'right',
            sorter: true,
            render: (_, record) => (
                <p className={clsx('text-sm', Color.text_black_87)}>
                    {Format.formatNegativeNumber(record.remainingAmt)}
                </p>
            ),
        },
        {
            title: i18n.t('saleorder.dashboard.table.commissionAmt'),
            dataIndex: 'commissionAmt',
            key: 'CommissionAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render: (_, record) => (
                <p className={clsx('text-sm', Color.text_black_87)}>{Format.formatNumber(record.commissionAmt)}</p>
            ),
        },
        {
            title: i18n.t('Yêu cầu xuất hóa đơn'),
            dataIndex: 'hasInvoice',
            key: 'hasInvoice',
            width: 190,
            render: value => <Flex justify="center">{value && <IconCheck fill="#000000" />}</Flex>,
        },
        {
            title: i18n.t('saleorder.dashboard.table.createdOn'),
            dataIndex: 'createdOn',
            key: 'CreatedOn',
            width: 190,
            sorter: true,
            defaultSortOrder: 'descend',
            render: (_, record) => (
                <>
                    <p className={clsx('text-sm', Color.text_black_87)}>{record.createName}</p>
                    <p className={clsx('text-sm', Color.text_black_45)}>
                        {Format.formatUTCTime(`${record.createdOn}`, AppConfig.DateTimeWithSecondsFormat)}
                    </p>
                </>
            ),
        },
        {
            title: i18n.t('action.action'),
            key: 'action',
            fixed: 'right',
            width: 170,
            render: (_, data: SearchSaleOrderViewDto) => (
                <ActionBtn
                    data={data}
                    setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                    setRowSelected={setRowSelected}
                    setChangeSOId={setChangeSOId}
                    setIsOpenConfirmChangeTour={setIsOpenConfirmChangeTour}
                />
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
                    <Table.Summary.Cell index={12}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

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

    const handleAcceptChangeTour = useCallback(() => {
        navigate(`${rootPathsNew.saleOrderFormDetail}`, {
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
                    bordered={false}
                    scrollX={1680}
                    scrollY={window.innerWidth > 1200 ? window.innerHeight - 375 : undefined}
                    showReport={true}
                    tableName={i18n.t('saleorder.dashboard.table.tableName')}
                    summary={handleSummary}
                    isStriped
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
