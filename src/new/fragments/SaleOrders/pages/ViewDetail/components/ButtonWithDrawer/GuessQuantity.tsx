import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Flex } from 'antd';
import React from 'react';

interface GuessQuantityProps {
    name: string;
    defaultQuantity?: number;
}

export const GuessQuantity: React.FC<GuessQuantityProps> = props => {
    const { name, defaultQuantity = 0 } = props;

    return (
        <Flex vertical gap={6}>
            <p className={`${Color.text_black_88} text-sm font-bold capitalize`}>{name}</p>
            <p className={`${Color.text_black_88} text-lg font-medium capitalize`}>{defaultQuantity}</p>
        </Flex>
    );
};
