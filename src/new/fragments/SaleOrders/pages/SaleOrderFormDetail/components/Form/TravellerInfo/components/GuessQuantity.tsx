import { Flex } from 'antd';
import React from 'react';

import { Color } from '@src/new/components/ui/Color/CustomColor';

interface Props {
    name: string;
    desc: string;
    defaultQuantity?: number;
}

export const GuessQuantity: React.FC<Props> = props => {
    const { name, desc, defaultQuantity = 0 } = props;

    return (
        <Flex align="center" gap={16}>
            <div className="hide-input-arrow">
                <p className={`text-center h-10 w-11 text-[20px] font-medium rounded-lg`}>{defaultQuantity}</p>
            </div>
            <Flex vertical gap={2}>
                <p className={`${Color.text_black_88} text-sm font-bold capitalize`}>{name}</p>
                <p className={`${Color.text_black_45} text-xs`}>{desc}</p>
            </Flex>
        </Flex>
    );
};
