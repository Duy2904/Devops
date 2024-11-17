import { Flex } from 'antd';

import { TourScheduleFareDto } from '@sdk/tour-operations';

import GuestCounter from './GuestCounter';

interface GuestInfoListProps {
    data: TourScheduleFareDto[];
    quantityOfGuest?: Record<string, number>;
    // eslint-disable-next-line no-unused-vars
    onGuestQuantityChange: ({ id, quantity }: { id?: string; quantity: number }) => void;
}

const GuestInfoList = ({ data, quantityOfGuest, onGuestQuantityChange }: GuestInfoListProps) => {
    return (
        <Flex vertical gap={12}>
            {data.map((item, index) => (
                <GuestCounter
                    tourScheduleFare={item}
                    initialGuestQuantity={quantityOfGuest?.[item?.passengerTypeCode ?? 0]}
                    onGuestQuantityChange={onGuestQuantityChange}
                    key={index}
                />
            ))}
        </Flex>
    );
};

export default GuestInfoList;
