import { Collapse, CollapseProps, FormInstance } from 'antd';
import React from 'react';

import { CommissionComponent } from '../components/CommissionComponent';

interface ItemCollapseComissionProps {
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    totalAmountForm: FormInstance;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CollapseComission: React.FC<ItemCollapseComissionProps> = props => {
    const itemCommission: CollapseProps['items'] = [
        {
            key: '1',
            className: 'rounded-b-lg overflow-hidden',
            label: <p className="text-md">Tiền hoa hồng</p>,
            children: <CommissionComponent {...props} />,
        },
    ];

    return (
        <Collapse
            className="rounded-b-lg rounded-t-none"
            defaultActiveKey={['1']}
            expandIconPosition={'end'}
            items={itemCommission}
        />
    );
};
