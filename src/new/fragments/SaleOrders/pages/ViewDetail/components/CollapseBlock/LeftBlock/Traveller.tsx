import { Col, Flex } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { GridTableComponent } from '@components/ui/GridTable';
import { SaleOrderDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import { splitNamePassengerType, TitleSplitPassengerType } from '@src/new/fragments/SaleOrders/features';
import { TravellerSub } from '@src/new/fragments/SaleOrders/features/key-type';
import { useSaleOrderLineTravellersStore } from '@src/new/fragments/SaleOrders/store/saleOrderLineTravellerStore';

import { ButtonWithDrawer } from '../../ButtonWithDrawer';

interface TravellerProps {
    data?: SaleOrderDto;
}

const fetchDataTravellerMerge = (data?: SaleOrderDto) => {
    const dataSum: TravellerSub[] = [];
    const idInDataSum: string[] = [];

    const dataTravellerSort = data?.saleOrderLineTravellers?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    dataTravellerSort?.forEach(item => {
        if (!idInDataSum.includes(item.passengerTypeId!)) {
            idInDataSum.push(item.passengerTypeId!);
        }
    });

    const dataTemp =
        dataTravellerSort?.map(item => {
            const dataNameSplit: TitleSplitPassengerType = splitNamePassengerType(item.passengerType?.name ?? '');
            return {
                id: item.id,
                typePassengerId: item.passengerTypeId,
                passengerTypeCode: item.passengerType?.code,
                title: dataNameSplit.title,
                subTitle: dataNameSplit.subTitle,
                hasVisa: isNil(item?.hasVisa) ? false : item?.hasVisa,
                price: item?.tourPrice,
            };
        }) ?? [];

    dataTemp.forEach(item => {
        const existingItem = dataSum.find(data => data.typePassengerId === item.typePassengerId);

        if (existingItem) {
            existingItem.capacity = (existingItem.capacity ?? 0) + 1;
            existingItem.totalPrice = (existingItem.totalPrice ?? 0) + (item.price ?? 0);
        } else {
            dataSum.push({
                ...item,
                capacity: 1,
                totalPrice: item.price,
            });
        }
    });

    return dataSum;
};

export const Traveller: React.FC<TravellerProps> = ({ data }) => {
    const { t } = useTranslation();
    const {
        actions: { setGroupSaleOrderTravellers },
    } = useSaleOrderLineTravellersStore(state => state);

    const columnsData: ColumnsType<TravellerSub> = [
        {
            title: t('SL khách'),
            width: 120,
            align: 'center',
            render: (_, record: TravellerSub) => (
                <Flex justify="center">
                    <Flex
                        align="center"
                        justify="center"
                        className={clsx(
                            `w-10 h-10 border border-solid ${Color.border_DBDBDB} rounded-lg bg-white text-lg font-medium`,
                        )}
                    >
                        {record.capacity}
                    </Flex>
                </Flex>
            ),
        },
        {
            title: t('Loại hành khách'),
            width: 200,
            render: (_, record: TravellerSub) => (
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
            render: (_, record: TravellerSub) => <Price className="font-bold" value={record.price} />,
        },
        {
            title: t('Thành tiền'),
            width: 180,
            align: 'center',
            render: (_, record: TravellerSub) => <Price className="font-bold" value={record.totalPrice} isHighlight />,
        },
    ];

    const travellerRes = useMemo(() => {
        setGroupSaleOrderTravellers(fetchDataTravellerMerge(data));
        return fetchDataTravellerMerge(data);
    }, [data, setGroupSaleOrderTravellers]);

    const calculateTotal = useMemo(() => {
        const calArr = travellerRes.map(item => item.totalPrice);
        return calArr.length > 0 ? calArr.reduce((x, y) => (x ?? 0) + (y ?? 0)) : 0;
    }, [travellerRes]);

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                        {<Price className="font-bold text-center" value={calculateTotal} isHighlight />}
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <Col className="p-5">
            {!isEmpty(data?.saleOrderLineTravellers) && (
                <Col className="text-right mb-5">
                    <ButtonWithDrawer data={data} />
                </Col>
            )}
            <GridTableComponent
                isStriped
                bordered={false}
                columns={columnsData}
                tableParams={{}}
                dataSource={travellerRes}
                summary={handleSummary}
                isHideSelectColumn
            />
        </Col>
    );
};
