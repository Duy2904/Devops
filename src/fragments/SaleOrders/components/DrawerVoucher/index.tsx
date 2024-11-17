import { Button, Col, Drawer, Flex, Space, Tooltip } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Table, { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { DiffOutlined } from '@ant-design/icons';
import { StaticTag } from '@components/customizes/StaticTag';
import { GridTableComponent } from '@components/ui/GridTable';
import {
    useGetReceivablesNotEnableQuery,
    useGetRefundNotEnableQuery,
} from '@fragments/ReceivableVoucher/hook/useReceivableVoucher';
import { TableParams } from '@fragments/ReceivableVoucher/List/features/feature';
import { TypeButton } from '@fragments/SaleOrders/features';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import {
    ReceivableType,
    ReceivableVoucherDto,
    ReceivableVoucherSearchDto,
    SearchReceivableVouchersRequest,
    VoucherStatus,
} from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { setVoucherColor } from '@utils/colorStatus';
import Format from '@utils/format';
import { localeCompare } from '@utils/localeHelper';
import { MyPermissions } from '@utils/Permissions/index.ts';

interface DrawerVoucherProps {
    soId: string;
    typeButton: TypeButton;
}

const statusShouldShow = [
    VoucherStatus.Refunded,
    VoucherStatus.WaitingForConfirmation,
    VoucherStatus.Confirmed,
    VoucherStatus.Received,
];

export const DrawerVoucher: React.FC<DrawerVoucherProps> = props => {
    const { soId, typeButton } = props;
    const isPermissionRedirectReceive = useHasAnyPermission([
        MyPermissions.ReceivableVoucherView,
        MyPermissions.AgencyReceivableVoucherView,
    ]);
    const isPermissionRedirectRefund = useHasAnyPermission([
        MyPermissions.RefundVoucherView,
        MyPermissions.AgencyRefundVoucherView,
    ]);
    const [refundVoucherData, setRefundVoucherData] = useState<ReceivableVoucherSearchDto[]>([]);
    const [receiveVoucherData, setReceiveVoucherData] = useState<ReceivableVoucherSearchDto[]>([]);

    const filterSearch: TableParams<AnyObject> = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        saleOrderIds: [soId],
    };

    const [open, setOpen] = useState(false);

    const { mutateAsync: fetchReceiveVoucher, isLoading: isLoadingReceive } = useGetReceivablesNotEnableQuery();
    const { mutateAsync: fetchRefundVoucher, isLoading: isLoadingRefund } = useGetRefundNotEnableQuery();

    const onOpen = async () => {
        setOpen(true);
        const tempDataReceive = await fetchReceiveVoucher(filterSearch as SearchReceivableVouchersRequest);
        const tempDataRefund = await fetchRefundVoucher(filterSearch as SearchReceivableVouchersRequest);

        setRefundVoucherData(tempDataRefund?.data?.filter(x => x.status && statusShouldShow.includes(x.status)) ?? []);
        setReceiveVoucherData(
            tempDataReceive?.data?.filter(x => x.status && statusShouldShow.includes(x.status)) ?? [],
        );
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleNavigate = (voucher: ReceivableVoucherDto) => {
        if (
            voucher.receivableType &&
            [ReceivableType.Receivable, ReceivableType.Deposit].includes(voucher.receivableType)
        ) {
            return isPermissionRedirectReceive ? `${rootPaths.receivableVoucherForm}/${voucher.id}` : '#';
        } else if (voucher.receivableType === ReceivableType.Refund) {
            return isPermissionRedirectRefund ? `${rootPaths.refundVoucherForm}/${voucher.id}` : '#';
        }
        return '#';
    };

    const handleShowAmountWithStatus = (status: ReceivableType | undefined, amount: number | undefined) => {
        if (status === ReceivableType.Refund) {
            return `(${Format.formatNumber(amount)})`;
        }

        return Format.formatNumber(amount);
    };

    const columnsData: ColumnsType<ReceivableVoucherDto> = [
        {
            title: 'Mã',
            dataIndex: 'voucherNo',
            key: 'voucherNo',
            width: 80,
            sorter: (aCode, bCode) => localeCompare(aCode.voucherNo, bCode.voucherNo),
            render: (_, record) => (
                <Link className="font-medium" to={handleNavigate(record)}>
                    {record.voucherNo}
                </Link>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 80,
            sorter: (aStatus, bStatus) => (aStatus.status ?? '' > (bStatus.status ?? '') ? 1 : -1),
            render(text) {
                return (
                    <StaticTag type={i18n.t(`voucher.status.${text}`) || ''} color={`${setVoucherColor(text ?? '')}`} />
                );
            },
        },
        {
            title: 'Diễn giải',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            sorter: (aDesc, bDesc) => localeCompare(aDesc.description, bDesc.description),
            render: (_, record) => <p className="line-clamp-2">{record.description}</p>,
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalAmtExchange',
            key: 'totalAmtExchange',
            width: 130,

            sorter: (aAmount, bAmount) => (aAmount.totalAmtExchange ?? 0 > (bAmount.totalAmtExchange ?? 0) ? 1 : -1),
            render: (_, record) => (
                <p className="text-right">
                    {handleShowAmountWithStatus(record.receivableType, record.totalAmtExchange)}
                </p>
            ),
        },
    ];

    const voucherData = useMemo(
        () => [...refundVoucherData, ...receiveVoucherData],
        [receiveVoucherData, refundVoucherData],
    );

    const calculateTotal = useMemo(() => {
        let total = 0;
        voucherData?.forEach(x => {
            if (x.receivableType === ReceivableType.Refund) {
                total -= x.totalAmtExchange ?? 0;
            } else {
                total += x.totalAmtExchange ?? 0;
            }
        });

        return Format.formatNegativeNumber(total);
    }, [voucherData]);

    const renderButton = (
        <Col onClick={onOpen}>
            {typeButton == TypeButton.Full ? (
                <Button className="text-xs" icon={<DiffOutlined />}>
                    {i18n.t(`Chứng từ thanh toán`)}
                </Button>
            ) : (
                <Tooltip placement="top" title={i18n.t('Chứng từ thanh toán')}>
                    <Flex className="flex items-center justify-center !w-7 !h-7 bg-cyan-600/10 rounded-sm cursor-pointer text-cyan-700 font-bold hover:bg-cyan-600 hover:text-white transition-all ease-in-out">
                        <DiffOutlined />
                    </Flex>
                </Tooltip>
            )}
        </Col>
    );

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                        <p className="font-semibold">Tổng cộng</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                        <p className="text-right">{calculateTotal}</p>
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <Col>
            {renderButton}
            <Drawer
                title={i18n.t('Danh sách chứng từ thanh toán')}
                width={1200}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>{i18n.t('action.back')}</Button>
                    </Space>
                }
                onClose={() => setOpen(false)}
                closeIcon={false}
            >
                <GridTableComponent
                    columns={columnsData}
                    tableParams={filterSearch ?? {}}
                    dataSource={voucherData}
                    scrollY={window.innerHeight - 100}
                    bordered={true}
                    loading={isLoadingReceive || isLoadingRefund}
                    isHidePagination
                    isHideSelectColumn
                    summary={handleSummary}
                />
            </Drawer>
        </Col>
    );
};
