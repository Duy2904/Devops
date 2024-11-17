import { AnyObject } from 'antd/es/_util/type';
import { Col } from 'antd';
import { Fragment } from 'react';
import { GuessQuantity } from './GuessQuantity';
import { SaleOrderDto } from '@sdk/tour-operations';
import { t } from 'i18next';
import { useSaleOrderLineTravellersStore } from '@src/new/fragments/SaleOrders/store/saleOrderLineTravellerStore';

interface GuessTotalProps {
    data?: SaleOrderDto;
}

export const GuessTotal: React.FC<GuessTotalProps> = ({ data }) => {
    const { groupSaleOrderTravellers } = useSaleOrderLineTravellersStore(state => state);
    const dataMerge: AnyObject[] = [];

    groupSaleOrderTravellers.forEach(item => {
        const existingItem = dataMerge.find(data => data.passengerTypeCode === item.passengerTypeCode);

        if (existingItem) {
            existingItem.capacity = (existingItem.capacity ?? 0) + item.capacity;
        } else {
            dataMerge.push({
                ...item,
            });
        }
    });

    return (
        <div className="bg-white rounded-lg px-5 py-3 h-full">
            <h2 className="text-md font-bold">
                {t('SỐ LƯỢNG KHÁCH:')} {data?.numberOfTravellers}
            </h2>
            <Col className="grid grid-cols-4 mt-6">
                {dataMerge.map(item => {
                    return (
                        <Fragment key={item.id}>
                            <GuessQuantity name={item.title ?? ''} defaultQuantity={item.capacity} />
                        </Fragment>
                    );
                })}
            </Col>
        </div>
    );
};
