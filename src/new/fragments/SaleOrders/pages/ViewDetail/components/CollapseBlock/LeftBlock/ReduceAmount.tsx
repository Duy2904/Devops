import { Col, Flex } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Table, { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GridTableComponent } from '@components/ui/GridTable';
import { SaleOrderDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';

interface ReduceAmountProps {
    data?: SaleOrderDto;
}

export const ReduceAmount: React.FC<ReduceAmountProps> = ({ data }) => {
    const { t } = useTranslation();

    const [dataSource, setDataSource] = useState<AnyObject[]>([]);

    const calculateTotalAll = useMemo(() => {
        return dataSource.length > 0 ? dataSource.reduce((total, record) => total + (record.totalPrice ?? 0), 0) : 0;
    }, [dataSource]);

    useEffect(() => {
        if (!isEmpty(data)) {
            const newData = [
                {
                    id: 'numberOfVisas',
                    price: data?.tourSchedule?.visaTourService?.reducedVisaFees,
                    quantity: data?.numberOfVisas,
                    totalPrice:
                        (data?.tourSchedule?.visaTourService?.reducedVisaFees ?? 0) * (data?.numberOfVisas ?? 0),
                },
            ];
            setDataSource(newData);
        }
    }, [data]);

    const columnsData: ColumnsType<AnyObject> = [
        {
            title: t('SL khách'),
            width: 120,
            align: 'center',
            render: (_, record) => (
                <Flex justify="center">
                    <Flex
                        align="center"
                        justify="center"
                        className={clsx(
                            `w-10 h-10 border border-solid ${Color.border_DBDBDB} rounded-lg bg-white text-lg font-medium`,
                        )}
                    >
                        {record?.quantity}
                    </Flex>
                </Flex>
            ),
        },
        {
            title: t('Nội dung'),
            width: 200,
            render: (_, record) => (
                <Flex vertical gap={2}>
                    <p className="text-sm font-bold">{record.title}</p>
                    <p className="text-sx text-black/40">{record.subTitle}</p>
                </Flex>
            ),
        },
        {
            title: t('Đơn giá'),
            width: 180,
            align: 'center',
            render: (_, record) => <Price className="font-bold" value={record.price} />,
        },
        {
            title: t('Thành tiền'),
            width: 180,
            align: 'center',
            render: (_, record) => <Price className="font-bold" value={record.totalPrice} isHighlight />,
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
                        {<Price className="font-bold text-center" value={calculateTotalAll} isHighlight />}
                    </Table.Summary.Cell>
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
                dataSource={dataSource}
                summary={handleSummary}
                isHideSelectColumn
            />
        </Col>
    );
};
