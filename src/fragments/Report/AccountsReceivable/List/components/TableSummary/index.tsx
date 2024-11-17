import { Flex, Table, TablePaginationConfig } from 'antd';
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMemo } from 'react';

import { GridTableComponent } from '@components/ui/GridTable';
import { defaultID } from '@fragments/SaleOrders/pages/SaleOrderFormComp/type/enum';
import { SearchRevenueReportViewRequest, SyntheticSearchDebtReportDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { useSearchTableStore } from '@store/searchTableStore';
import Format from '@utils/format';

import { useFetchAccountsReceivable } from '../../../hook/useAccountsReceivable';
import { ExportExcelTableSummary } from './ExportExcel';

interface AccountsReceivableSummaryDto {
    totalRevenueAmt?: number;
    totalPaymentAmt?: number;
    totalRefundAmt?: number;
    totalRemainAmt?: number;
}

export const TableSummary: React.FC = () => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // query data
    const { data, isLoading } = useFetchAccountsReceivable(tableParams);
    const dataTable: SyntheticSearchDebtReportDto[] = useMemo(
        () =>
            data?.syntheticData?.map((item, index) => {
                return { id: `${defaultID.accountsReceivableSummary}-${index}`, ...item };
            }) ?? [],
        [data?.syntheticData],
    );
    const revenueSummary: AccountsReceivableSummaryDto = {
        totalRevenueAmt: data?.totalRevenueAmt,
        totalPaymentAmt: data?.totalPaymentAmt,
        totalRefundAmt: data?.totalRefundAmt,
        totalRemainAmt: data?.totalRemainAmt,
    };

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

    const columns: ColumnsType<SyntheticSearchDebtReportDto> = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 0,
            render: () => <></>,
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
            title: i18n.t('Tổng tiền'),
            dataIndex: 'revenueAmt',
            key: 'RevenueAmt',
            width: 150,
            align: 'right',
            sorter: (a, b) => (a?.revenueAmt ?? 0) - (b?.revenueAmt ?? 0),
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
            sorter: (a, b) => (a?.paymentAmt ?? 0) - (b?.paymentAmt ?? 0),
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
            sorter: (a, b) => (a?.refundAmt ?? 0) - (b?.refundAmt ?? 0),
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
            sorter: (a, b) => (a?.remainAmt ?? 0) - (b?.remainAmt ?? 0),
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 70,
            render: (_, record: SyntheticSearchDebtReportDto) => (
                <Flex className="gap-2" justify="center">
                    <ExportExcelTableSummary data={record} />
                </Flex>
            ),
        },
    ];

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={2}>
                        {Format.formatNumber(revenueSummary?.totalRevenueAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={3}>
                        {Format.formatNumber(revenueSummary?.totalPaymentAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={4}>
                        {Format.formatNumber(revenueSummary?.totalRefundAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={5}>
                        {Format.formatNumber(revenueSummary?.totalRemainAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <GridTableComponent
            columns={columns}
            tableParams={tableParams}
            dataSource={dataTable}
            onChange={handleTableChange}
            summary={handleSummary}
            bordered={true}
            scrollX={900}
            scrollY={window.innerHeight - 450}
            tableName={i18n.t('kết quả')}
            loading={isLoading}
            isHideSelectColumn
            isHidePagination
        />
    );
};
