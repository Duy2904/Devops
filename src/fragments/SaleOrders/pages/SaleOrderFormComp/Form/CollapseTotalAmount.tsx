import { Collapse, CollapseProps, FormInstance } from 'antd';
import React, { useMemo } from 'react';

import { TotalAmountComponent } from '../components/TotalAmount';

interface ItemCollapseTotalAmountProps {
    soId?: string;
    form: FormInstance;
    infoForm: FormInstance;
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    paymentMethod: { id: string; value: number };
    setPaymentMethod: React.Dispatch<React.SetStateAction<{ id: string; value: number }>>;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CollapseTotalAmount: React.FC<ItemCollapseTotalAmountProps> = props => {
    const itemTotalAmount: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                className: '!rounded-none !border-none',
                label: <p className="text-md">Tổng tiền đơn hàng</p>,
                children: <TotalAmountComponent {...props} />,
            },
        ],
        [props],
    );

    return (
        <Collapse
            className="!rounded-none"
            defaultActiveKey={['1']}
            expandIconPosition={'end'}
            items={itemTotalAmount}
        />
    );
};
