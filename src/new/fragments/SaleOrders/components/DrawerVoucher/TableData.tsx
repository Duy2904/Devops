import { Col, Table } from 'antd';
import {
    ReceivableType,
    ReceivableVoucherDto,
    ReceivableVoucherSearchDto,
    SearchReceivableVouchersRequest,
    VoucherStatus,
} from '@sdk/tour-operations';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    useGetReceivablesNotEnableQuery,
    useGetRefundNotEnableQuery,
} from '@fragments/ReceivableVoucher/hook/useReceivableVoucher';

import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { MyPermissions } from '@utils/Permissions';
import { StaticTag } from '@components/customizes/StaticTag';
import { TableParams } from '@fragments/ReceivableVoucher/List/features/feature';
import isEmpty from 'lodash/isEmpty';
import { rootPaths } from '@src/routers/route';
import { setVoucherColor } from '@utils/colorStatus';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTranslation } from 'react-i18next';

export declare type TypeList = 'bookedQuantity' | 'reserveQuantity';

interface TableDataProps {
    soId: string;
    open: boolean;
    showSummary?: boolean;
}

const statusShouldShow = [
    VoucherStatus.Refunded,
    VoucherStatus.WaitingForConfirmation,
    VoucherStatus.Confirmed,
    VoucherStatus.Received,
];

export const TableData: React.FC<TableDataProps> = props => {
    const { soId, open, showSummary } = props;
    const { t } = useTranslation();

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

    const { mutateAsync: fetchReceiveVoucher, isLoading: isLoadingReceive } = useGetReceivablesNotEnableQuery();
    const { mutateAsync: fetchRefundVoucher, isLoading: isLoadingRefund } = useGetRefundNotEnableQuery();

    const handleGetData = useCallback(async () => {
        const filterSearch: TableParams<AnyObject> = {
            sorter: {
                columnKey: 'CreatedOn',
                order: 'descend',
            },
            saleOrderIds: [soId],
        };
        const tempDataReceive = await fetchReceiveVoucher(filterSearch as SearchReceivableVouchersRequest);
        const tempDataRefund = await fetchRefundVoucher(filterSearch as SearchReceivableVouchersRequest);

        setRefundVoucherData(tempDataRefund?.data?.filter(x => x.status && statusShouldShow.includes(x.status)) ?? []);
        setReceiveVoucherData(
            tempDataReceive?.data?.filter(x => x.status && statusShouldShow.includes(x.status)) ?? [],
        );
    }, [fetchReceiveVoucher, fetchRefundVoucher, soId]);

    const voucherData = useMemo(() => {
        return [...refundVoucherData, ...receiveVoucherData];
    }, [receiveVoucherData, refundVoucherData]);

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
            title: t('Mã phiếu'),
            dataIndex: 'voucherNo',
            key: 'voucherNo',
            width: 140,
            render: (_, record) => (
                <Link className="font-medium text-sm" to={handleNavigate(record)}>
                    {record.voucherNo}
                </Link>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 150,
            render(text) {
                return <StaticTag type={t(`voucher.status.${text}`) || ''} color={`${setVoucherColor(text ?? '')}`} />;
            },
        },
        {
            title: 'Diễn giải',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: (_, record) => <p className="text-sm line-clamp-2">{record.description}</p>,
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalAmtExchange',
            key: 'totalAmtExchange',
            width: 130,
            align: 'right',
            render: (_, record) => (
                <p className="text-sm text-right">
                    {handleShowAmountWithStatus(record.receivableType, record.totalAmtExchange)}
                </p>
            ),
        },
    ];

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                        <p className="text-right text-sm font-bold">{calculateTotal}</p>
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    useEffect(() => {
        if (soId && open) {
            handleGetData();
        }
    }, [handleGetData, open, soId]);

    return (
        <Col>
            {showSummary && (
                <p className="text-sm mb-2">
                    <span className="font-bold">{voucherData.length}</span>{' '}
                    <span className="text-[#2A2A2A]/80">{t('chứng từ thanh toán')}</span>
                </p>
            )}
            <GridTableComponent
                columns={columnsData}
                tableParams={{}}
                dataSource={voucherData}
                bordered={false}
                tableName={'Đơn hàng bán'}
                loading={isLoadingReceive || isLoadingRefund}
                summary={!isEmpty(voucherData) ? handleSummary : undefined}
                isHideSelectColumn
                isHidePagination
                isStriped
            />
        </Col>
    );
};
