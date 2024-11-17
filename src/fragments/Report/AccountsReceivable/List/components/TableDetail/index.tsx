import { Table, TablePaginationConfig } from 'antd';
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { StaticTag } from '@components/customizes/StaticTag';
import { GridTableComponent } from '@components/ui/GridTable';
import { defaultID } from '@fragments/SaleOrders/pages/SaleOrderFormComp/type/enum';
import {
    SearchDebtReportViewDto,
    SearchRevenueReportViewDto,
    SearchRevenueReportViewRequest,
} from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { useSearchTableStore } from '@store/searchTableStore';
import { setSaleOrderColor } from '@utils/colorStatus';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';

import { useFetchAccountsReceivable } from '../../../hook/useAccountsReceivable';

interface AccountsReceivableSummaryDto {
    totalAmt?: number;
    totalVatAmt?: number;
    totalEndowAmt?: number;
    totalRevenueAmt?: number;
    totalPaymentAmt?: number;
    totalRefundAmt?: number;
    totalRemainAmt?: number;
}

export const TableDetail: React.FC = () => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // query data
    const { data, isLoading } = useFetchAccountsReceivable(tableParams);
    const dataDetail: SearchDebtReportViewDto[] = useMemo(
        () =>
            data?.data?.map((item, index) => {
                return { id: `${defaultID.accountsReceivable}-${index}`, ...item };
            }) ?? [],
        [data?.data],
    );
    const summary: AccountsReceivableSummaryDto = {
        totalAmt: data?.totalAmt,
        totalVatAmt: data?.totalVatAmt,
        totalEndowAmt: data?.totalEndowAmt,
        totalRevenueAmt: data?.totalRevenueAmt,
        totalPaymentAmt: data?.totalPaymentAmt,
        totalRefundAmt: data?.totalRefundAmt,
        totalRemainAmt: data?.totalRemainAmt,
    };
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchRevenueReportViewRequest> | SorterResult<SearchRevenueReportViewRequest>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    const columns: ColumnsType<SearchDebtReportViewDto> = [
        {
            title: i18n.t('Mã SO'),
            dataIndex: 'orderNo',
            key: 'OrderNo',
            width: 150,
            sorter: true,
            render: (value: string) => {
                return <p className="font-medium text-blue-500">{value}</p>;
            },
        },
        {
            title: i18n.t('Ngày'),
            dataIndex: 'createdOn',
            key: 'CreatedOn',
            width: 100,
            sorter: true,
            render: a => <>{dayjs(a).format(AppConfig.DateFormat)}</>,
        },
        {
            title: i18n.t('Trạng thái'),
            dataIndex: 'status',
            key: 'Status',
            align: 'center',
            width: 120,
            render(text) {
                return (
                    <StaticTag type={i18n.t(`OrderStatus.${text}`) || ''} color={`${setSaleOrderColor(text ?? '')}`} />
                );
            },
        },
        {
            title: i18n.t('Mã Tour'),
            dataIndex: 'tourCode',
            key: 'TourCode',
            width: 180,
            sorter: true,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Tên Tour'),
            dataIndex: 'tourName',
            key: 'TourName',
            width: 250,
            sorter: true,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Mã Tour kế toán'),
            dataIndex: 'accountingTourCode',
            key: 'AccountingTourCode',
            width: 180,
            sorter: true,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Khách hàng'),
            dataIndex: 'customerName',
            key: 'CustomerName',
            width: 300,
            render: (value, record) => {
                return (
                    <p>
                        {record.customerNo} - {value}
                    </p>
                );
            },
        },
        {
            title: i18n.t('Người liên lạc'),
            dataIndex: 'contactName',
            key: 'ContactName',
            width: 180,
            render: (_, record: SearchRevenueReportViewDto) => {
                return (
                    <>
                        <p>{record.contactName}</p>
                        <p>{record.contactPhone}</p>
                    </>
                );
            },
        },
        {
            title: i18n.t('Số tiền'),
            dataIndex: 'totalAmt',
            key: 'TotalAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Tiền Thuế GTGT'),
            dataIndex: 'vatAmt',
            key: 'VatAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Ưu đãi'),
            dataIndex: 'endowAmt',
            key: 'EndowAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Tổng tiền'),
            dataIndex: 'revenueAmt',
            key: 'RevenueAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Tiền khách trả'),
            dataIndex: 'paymentAmt',
            key: 'PaymentAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Tiền hoàn'),
            dataIndex: 'refundAmt',
            key: 'refundAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Còn lại'),
            dataIndex: 'remainAmt',
            key: 'RemainAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Người bán'),
            dataIndex: 'createName',
            key: 'CreateName',
            width: 150,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Ref No'),
            dataIndex: 'refNo',
            key: 'RefNo',
            width: 150,
            render(value) {
                return <>{value}</>;
            },
        },
    ];

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
                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                    <Table.Summary.Cell index={7}></Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={8}>
                        {Format.formatNumber(summary?.totalAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                        className="font-bold
                     text-right"
                        index={9}
                    >
                        {Format.formatNumber(summary?.totalVatAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={10}>
                        {Format.formatNumber(summary?.totalEndowAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={11}>
                        {Format.formatNumber(summary?.totalRevenueAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={12}>
                        {Format.formatNumber(summary?.totalPaymentAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={13}>
                        {Format.formatNumber(summary?.totalRefundAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={14}>
                        {Format.formatNumber(summary?.totalRemainAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={15}></Table.Summary.Cell>
                    <Table.Summary.Cell index={16}></Table.Summary.Cell>
                    <Table.Summary.Cell index={17}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <GridTableComponent
            columns={columns}
            tableParams={tableParams}
            dataSource={dataDetail}
            onChange={handleTableChange}
            summary={handleSummary}
            bordered={true}
            showReport={true}
            scrollX={1200}
            scrollY={window.innerHeight - 450}
            tableName={i18n.t('kết quả')}
            loading={isLoading}
            isHideSelectColumn
        />
    );
};
