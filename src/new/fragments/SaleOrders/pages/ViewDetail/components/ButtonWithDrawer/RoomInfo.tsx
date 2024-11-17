import { Fragment, useMemo } from 'react';

import { Col } from 'antd';
import { GuessQuantity } from './GuessQuantity';
import { SaleOrderDto } from '@sdk/tour-operations';
import { isNil } from 'lodash';
import { mapRoom } from '@utils/sumData';
import { t } from 'i18next';

interface RoomInfoProps {
    data?: SaleOrderDto;
}

export const RoomInfo: React.FC<RoomInfoProps> = ({ data }) => {
    const roomCountData = useMemo(() => {
        const roomType = data?.saleOrderLineTravellers?.map(item => item.roomType) ?? [];
        const roomNumber = data?.saleOrderLineTravellers?.map(item => item.roomNumber) ?? [];
        return mapRoom(roomType, roomNumber);
    }, [data?.saleOrderLineTravellers]);

    return (
        <div className="bg-white rounded-lg px-5 py-3 h-full">
            <h2 className="text-md font-bold">
                {t('SỐ LƯỢNG PHÒNG:')} {data?.numberOfRooms}
            </h2>
            <Col className="grid grid-cols-4 mt-6">
                {roomCountData.map(item => {
                    if (!isNil(item.key) && item.key !== 'null') {
                        return (
                            <Fragment key={item.key}>
                                <GuessQuantity
                                    name={`${t('Phòng')} ${t(`saleorder.roomContent.${item.key}`)}`}
                                    defaultQuantity={item.value}
                                />
                            </Fragment>
                        );
                    }
                })}
            </Col>
        </div>
    );
};
