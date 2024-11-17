import { ReceivableVoucherDto, ReceivableVoucherLineDto } from "@sdk/tour-operations"
import Format from "@src/new/shared/utils/format";
import { Col } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface TableDataProps {
    data?: ReceivableVoucherDto;
}

export const TableData: React.FC<TableDataProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();

    const columns: ColumnsType<ReceivableVoucherLineDto> = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 0,
            render: () => null,
        },
        {
            title: t('Chứng từ'),
            width: 300,
            render: (_, record: ReceivableVoucherLineDto) => (
                <Col>
                    {record.saleOrderOrderNo && record.tourScheduleName && record.tourScheduleTourCode ?
                        <Fragment>
                            <p className="text-sm text-blue-600 font-bold">{record.saleOrderOrderNo}</p>
                            <p className="text-sm font-semibold mt-2 mb-1">{record.tourScheduleName}</p>
                            <p className="text-xs bg-slate-200 rounded-md w-fit p-1 px-2 border border-solid border-gray-300">{record.tourScheduleTourCode}</p>
                        </Fragment> : '-'
                    }
                </Col>
            ),
        },
        {
            title: t('Phải trả'),
            dataIndex: 'totalIncludeVatAmt',
            key: 'totalIncludeVatAmt',
            width: 200,
            align: 'right',
            render: (_, record: ReceivableVoucherLineDto) => (
                <p className="text-sm text-right">{Format.formatNumber(record.remainingAmount)}</p>
            ),
        },
        {
            title: t('Chi trả'),
            dataIndex: 'amount',
            key: 'amount',
            width: 200,
            align: 'right',
            render: (_, record: ReceivableVoucherLineDto) => (
                <p className="text-sm text-right">{Format.formatNumber(record.amount)}</p>
            ),
        },
        {
            title: t('Ghi chú'),
            dataIndex: 'note',
            key: 'note',
            width: 400,
            render: (_, record: ReceivableVoucherLineDto) => (
                <p className="text-sm">{record.note}</p>
            ),
        },
    ];

    const totalRemainingAmount = useMemo(() => {
        const arrTotal = data?.receivableVoucherLines?.map(item => item.remainingAmount) ?? [];
        return arrTotal.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
    }, [data?.receivableVoucherLines]);

    const totalSummaryAmount = useMemo(() => {
        const arrTotal = data?.receivableVoucherLines?.map(item => item.amount) ?? [];
        return arrTotal.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
    }, [data?.receivableVoucherLines]);

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2} className="text-right font-bold">
                        {Format.formatNumber(totalRemainingAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} className="text-right font-bold">
                        {Format.formatNumber(totalSummaryAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <Col className="p-4">
            <Table
                className="table-striped-rows"
                columns={columns}
                dataSource={data?.receivableVoucherLines ?? []}
                rowKey="id"
                bordered
                pagination={false}
                size="small"
                scroll={{ x: 1200 }}
                summary={handleSummary}
            />
        </Col>
    )
}
