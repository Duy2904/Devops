import { Col, Flex, Input } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TourScheduleFareDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import Format from '@src/new/shared/utils/format';

const MIN_GUEST_QUANTITY = 0;
const DEFAULT_GUEST_QUANTITY = 0;

interface GuestCounterProps {
    tourScheduleFare: TourScheduleFareDto;
    originPrice?: number;
    initialGuestQuantity?: number;
    // eslint-disable-next-line no-unused-vars
    onGuestQuantityChange: ({ id, quantity }: { id?: string; quantity: number }) => void;
}

const GuestCounter: React.FC<GuestCounterProps> = props => {
    const { tourScheduleFare, originPrice, initialGuestQuantity, onGuestQuantityChange } = props;
    const { passengerTypeId, passengerTypeCode, taxInclusivePrice, passengerTypeName } = tourScheduleFare;
    const { t } = useTranslation();

    // States
    const [guestQuantity, setGuestQuantity] = useState(initialGuestQuantity || DEFAULT_GUEST_QUANTITY);

    // Computed values
    const title = useMemo(() => {
        switch (passengerTypeCode) {
            case 'ADT':
                return t('Người lớn');
            case 'CHD':
                return t('Trẻ em');
            case 'INF':
                return t('Em bé');
        }
    }, [passengerTypeCode, t]);

    const totalOriginPrice = originPrice ? originPrice * guestQuantity : 0;
    const totalPrice = taxInclusivePrice ?? 0 * guestQuantity;

    // Handlers

    const handleGuestCountChange = (value: number) => {
        if (isNaN(value) || value < MIN_GUEST_QUANTITY) {
            setGuestQuantity(MIN_GUEST_QUANTITY);
            onGuestQuantityChange({ id: passengerTypeId, quantity: MIN_GUEST_QUANTITY });
            return;
        }

        setGuestQuantity(value);
        onGuestQuantityChange({ id: passengerTypeId, quantity: value });
    };

    return (
        <section>
            <Flex align="start" className="mt-1" gap={20}>
                <Col className="hide-input-arrow">
                    <Input
                        className={`bg-white hide-input-arrow w-10 h-10 p-2 text-center text-lg shrink-0 flex justify-center items-center rounded-md font-semibold`}
                        type="number"
                        value={guestQuantity}
                        onChange={e => handleGuestCountChange(e.target.valueAsNumber)}
                        min={0}
                    />
                </Col>
                <Flex vertical>
                    <h4 className={`${Color.text_black_88} text-sm font-bold`}>{title}</h4>
                    <p className={`${Color.text_2A2A2A_60} text-xs`}>{passengerTypeName}</p>
                    {!!originPrice && (
                        <p className={`${Color.text_F74D3E} text-[10px] line-through font-bold`}>
                            {Format.formatNumber(totalOriginPrice)}
                        </p>
                    )}
                    <p className={`${Color.text_3E5BE0} text-base font-extrabold line-clamp-1`}>
                        {Format.formatNumber(totalPrice)}
                    </p>
                </Flex>
            </Flex>
        </section>
    );
};

export default GuestCounter;
