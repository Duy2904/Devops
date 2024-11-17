import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { SearchDebtReportViewDto, SearchRevenueReportViewRequest } from '@sdk/tour-operations';
import { Table, TablePaginationConfig } from 'antd';

import { AppConfig } from '@utils/config';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { StaticTag } from '@components/customizes/StaticTag';
import dayjs from 'dayjs';
import { defaultID } from '@fragments/SaleOrders/pages/SaleOrderFormComp/type/enum';
import i18n from '@src/i18n';
import { setSaleOrderColor } from '@utils/colorStatus';
import { useFetchAccountsReceivable } from '../../../hook/useAccountsReceivable';
import { useMemo } from 'react';
import { useSearchTableStore } from '@store/searchTableStore';

interface AccountsReceivableSummaryDto {
    totalAmt?: number;
    totalVatAmt?: number;
    totalEndowAmt?: number;
    totalRevenueAmt?: number;
    totalPaymentAmt?: number;
    totalRefundAmt?: number;
    totalRefundCustomerAmt?: number;
    totalAgencyCommissionAmt?: number;
    totalReceivableAmt?: number;
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
        totalRefundCustomerAmt: data?.totalRefundCustomerAmt,
        totalAgencyCommissionAmt: data?.totalAgencyCommissionAmt,
        totalReceivableAmt: data?.totalReceivableAmt,
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
            title: i18n.t('Đại lý'),
            dataIndex: 'groupName',
            key: 'groupName',
            width: 180,
            render: (_, record: SearchDebtReportViewDto) => {
                return (
                    <>
                        <p className="font-bold">{record.groupCode}</p>
                        <p>{record.groupName}</p>
                    </>
                );
            },
        },
        {
            title: i18n.t('Số tiền'),
            dataIndex: 'totalAmt',
            key: 'TotalIncludeVatAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Thuế GTGT'),
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
            title: i18n.t('Tổng thu'),
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
            title: i18n.t('Hoa hồng đại lý'),
            dataIndex: 'agencyCommissionAmt',
            key: 'AgencyCommissionAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Hoàn cho khách'),
            dataIndex: 'refundCustomerAmt',
            key: 'RefundCustomerAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Phải thu'),
            dataIndex: 'receivableAmt',
            key: 'ReceivableAmt',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
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
                    <Table.Summary.Cell className="font-bold text-right" index={7}>
                        {Format.formatNumber(summary?.totalAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                        className="font-bold
                     text-right"
                        index={8}
                    >
                        {Format.formatNumber(summary?.totalVatAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={9}>
                        {Format.formatNumber(summary?.totalEndowAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={10}>
                        {Format.formatNumber(summary?.totalRevenueAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={11}>
                        {Format.formatNumber(summary?.totalPaymentAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={12}>
                        {Format.formatNumber(summary?.totalAgencyCommissionAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={13}>
                        {Format.formatNumber(summary?.totalRefundCustomerAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={14}>
                        {Format.formatNumber(summary?.totalReceivableAmt)}
                    </Table.Summary.Cell>
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
            scrollX={1200}
            scrollY={window.innerHeight - 450}
            showReport={true}
            tableName={i18n.t('kết quả')}
            loading={isLoading}
            isHideSelectColumn
        />
    );
};
