import { Table, TablePaginationConfig } from 'antd';
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { StaticTag } from '@components/customizes/StaticTag';
import { GridTableComponent } from '@components/ui/GridTable';
import { SearchRevenueReportViewDto, SearchRevenueReportViewRequest } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { useSearchTableStore } from '@store/searchTableStore';
import { setSaleOrderColor } from '@utils/colorStatus';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';

import { useFetchRevenueTourFitCollab } from '../hook/useRevenueTourFit';

interface RevenueTourFitCollabSummaryDto {
    totalTaxInclusivePrice?: number;
    totalSurcharge?: number;
    totalEndowAmt?: number;
    totalRevenueAmt?: number;
    totalCostGuestAtm?: number;
    totalCostAtm?: number;
    totalPaymentAmt?: number;
    totalRemain?: number;
    totalProfitAtm?: number;
    totalNumberOfTravellers?: number;
    totalCommissionAmt?: number;
    totalAgencyCommissionAmt?: number;
    totalVatAmt?: number;
}

export const TableDataRevenueTourFitCollab: React.FC = () => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // query data
    const { data, isLoading } = useFetchRevenueTourFitCollab(tableParams);
    const revenueTourFit: SearchRevenueReportViewDto[] = useMemo(() => data?.data ?? [], [data?.data]);
    const revenueSummary: RevenueTourFitCollabSummaryDto = {
        totalTaxInclusivePrice: data?.totalTaxInclusivePrice,
        totalSurcharge: data?.totalSurcharge,
        totalEndowAmt: data?.totalEndowAmt,
        totalRevenueAmt: data?.totalRevenueAmt,
        totalCostAtm: data?.totalCostAmt,
        totalPaymentAmt: data?.totalPaymentAmt,
        totalRemain: data?.totalRemainingAmt,
        totalProfitAtm: data?.totalProfitAtm,
        totalNumberOfTravellers: data?.totalNumberOfTravellers,
        totalCommissionAmt: data?.totalCommissionAmt,
        totalAgencyCommissionAmt: data?.totalAgencyCommissionAmt,
        totalVatAmt: data?.totalVatAmt,
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

    const columns: ColumnsType<SearchRevenueReportViewDto> = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 0,
            render: () => <></>,
        },
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
            title: i18n.t('Khách hàng'),
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
            title: i18n.t('Số lượng khách'),
            dataIndex: 'numberOfTravellers',
            key: 'NumberOfTravellers',
            width: 100,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Tổng giá tour'),
            dataIndex: 'taxInclusivePrice',
            key: 'TaxInclusivePrice',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Tổng phụ phí'),
            dataIndex: 'surchargeAmt',
            key: 'SurchargeAmt',
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
            title: i18n.t('Hoa hồng được nhận'),
            dataIndex: 'commissionAmt',
            key: 'CommissionAmt',
            width: 160,
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
            title: i18n.t('Lợi nhuận'),
            dataIndex: 'profitAtm',
            key: 'ProfitAtm',
            width: 150,
            align: 'right',
            sorter: true,
            render(value) {
                return <>{Format.formatNumber(value)}</>;
            },
        },
        {
            title: i18n.t('Nguồn'),
            dataIndex: 'groupName',
            key: 'GroupName',
            width: 150,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Người bán'),
            dataIndex: 'createName',
            key: 'CreateName',
            width: 150,
            render: (_, record: SearchRevenueReportViewDto) => {
                return (
                    <>
                        <p>{record.createName}</p>
                        <p>{record.createPhone}</p>
                    </>
                );
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
                        {Format.formatNumber(revenueSummary?.totalNumberOfTravellers)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={9}>
                        {Format.formatNumber(revenueSummary?.totalTaxInclusivePrice)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={10}>
                        {Format.formatNumber(revenueSummary?.totalSurcharge)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={11}>
                        {Format.formatNumber(revenueSummary?.totalVatAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={12}>
                        {Format.formatNumber(revenueSummary?.totalEndowAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={13}>
                        {Format.formatNumber(revenueSummary?.totalRevenueAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={14}>
                        {Format.formatNumber(revenueSummary?.totalPaymentAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={15}>
                        {Format.formatNumber(revenueSummary?.totalRemain)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={16}>
                        {Format.formatNumber(revenueSummary?.totalCommissionAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={17}>
                        {Format.formatNumber(revenueSummary?.totalAgencyCommissionAmt)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={18}>
                        {Format.formatNumber(revenueSummary?.totalProfitAtm)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={19}></Table.Summary.Cell>
                    <Table.Summary.Cell index={20}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <GridTableComponent
            columns={columns}
            tableParams={tableParams}
            dataSource={revenueTourFit}
            onChange={handleTableChange}
            summary={handleSummary}
            bordered={true}
            scrollX={1000}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={i18n.t('kết quả')}
            loading={isLoading}
            isHideSelectColumn
        />
    );
};
