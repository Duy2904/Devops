import { Flex } from 'antd';
import React from 'react';

import { Color } from '../Color/CustomColor';

interface TagTravelPlanProps {
    name: string;
    icon: React.ReactNode;
}

const TagTravelPlan = ({ name, icon }: TagTravelPlanProps) => {
    return (
        <Flex align="center" gap={4}>
            <span>{icon}</span>
            <span className={`${Color.text_black_88} text-xs`}>{name}</span>
        </Flex>
    );
};

export default TagTravelPlan;
