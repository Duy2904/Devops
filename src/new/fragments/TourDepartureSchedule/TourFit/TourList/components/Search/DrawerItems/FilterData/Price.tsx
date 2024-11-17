import { Col, Flex, Slider } from 'antd';
import { useEffect, useState } from 'react';

import Format from '@src/new/shared/utils/format';
import { useFetchFilterDataTourFit } from './useFilterData';
import { useTranslation } from 'react-i18next';

interface PriceProps {
    fromPrice?: number;
    toPrice?: number;
    setFromPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
    setToPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const Price: React.FC<PriceProps> = props => {
    const { fromPrice, toPrice, setFromPrice, setToPrice } = props;

    const { t } = useTranslation();
    const { data, refetch } = useFetchFilterDataTourFit();
    const [defaultValue, setDefaultValue] = useState<number[]>([]);

    const handleOnchange = (value: number[]) => {
        setFromPrice(value[0]);
        setToPrice(value[1]);
    };

    useEffect(() => {
        if (!fromPrice && !toPrice) {
            setDefaultValue([data?.minPrice ?? 0, data?.maxPrice ?? 0]);
        } else {
            setDefaultValue([fromPrice ?? 0, toPrice ?? 0]);
        }
    }, [data?.maxPrice, data?.minPrice, fromPrice, refetch, toPrice]);

    return (
        <Flex className="w-full" vertical>
            <p className="text-sm mb-2">{t('Giá tour')}</p>
            {data && (
                <Col>
                    <Flex className="text-sm text-state-info font-bold" align="center" justify="space-between">
                        <p>{Format.formatNumber(fromPrice ? fromPrice : data?.minPrice)}</p>
                        <p>{Format.formatNumber(toPrice ? toPrice : data?.maxPrice)}</p>
                    </Flex>
                    <Slider
                        className="!my-1"
                        range
                        tooltip={{ formatter: null }}
                        min={data?.minPrice}
                        max={data?.maxPrice}
                        onChange={handleOnchange}
                        value={defaultValue}
                    />
                </Col>
            )}
        </Flex>
    );
};
