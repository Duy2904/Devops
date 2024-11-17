import { SaleOrderDto, SaleOrderLineDto } from '@sdk/tour-operations';
import Table, { ColumnsType } from 'antd/es/table';

import { Col } from 'antd';
import { GridTableComponent } from '@components/ui/GridTable';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface SurchargeProps {
    data?: SaleOrderDto;
}

export const Surcharge: React.FC<SurchargeProps> = ({ data }) => {
    const { t } = useTranslation();

    const columnsData: ColumnsType<SaleOrderLineDto> = [
        {
            width: 80,
            align: 'center',
            render: (_, _record, index: number) => <p className="text-sm py-3">{index + 1}</p>,
        },
        {
            title: t('Dịch vụ/Sản phẩm'),
            width: 250,
            render: (_, record: SaleOrderLineDto) => <p className="text-sm">{record.product?.name}</p>,
        },
        {
            title: t('Số lượng'),
            width: 120,
            align: 'center',
            render: (_, record: SaleOrderLineDto) => <p className="text-sm">{record.quantity}</p>,
        },
        {
            title: t('Đơn giá'),
            width: 180,
            align: 'center',
            render: (_, record: SaleOrderLineDto) => <Price className="font-bold" value={record.salesPrice} />,
        },
        {
            title: t('Thành tiền'),
            width: 180,
            align: 'center',
            render: (_, record: SaleOrderLineDto) => <Price className="font-bold" value={record.amount} isHighlight />,
        },
        {
            title: t('Ghi chú'),
            width: 180,
            render: (_, record: SaleOrderLineDto) => <p className="text-sm">{record.description}</p>,
        },
    ];

    const dataSurcharge = useMemo(() => {
        return data?.saleOrderLines?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }, [data?.saleOrderLines]);

    const calculateTotal = useMemo(() => {
        const calArr = dataSurcharge?.map(item => item.amount) ?? [];
        return calArr.length > 0 ? calArr.reduce((x, y) => (x ?? 0) + (y ?? 0)) : 0;
    }, [dataSurcharge]);

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                        {<Price className="font-bold text-center" value={calculateTotal} isHighlight />}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <Col className="p-5">
            <GridTableComponent
                isStriped
                bordered={false}
                columns={columnsData}
                tableParams={{}}
                dataSource={dataSurcharge}
                summary={!isEmpty(dataSurcharge) ? handleSummary : undefined}
                isHideSelectColumn
            />
        </Col>
    );
};
