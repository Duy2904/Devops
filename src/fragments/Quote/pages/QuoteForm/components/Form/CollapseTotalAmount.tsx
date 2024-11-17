import { Collapse, CollapseProps, FormInstance } from 'antd';
import React, { useMemo } from 'react';

import i18n from '@src/i18n';

import { TotalAmountForm } from './FormTotalAmount';

interface ItemCollapseTotalAmountProps {
    form: FormInstance;
}

export const CollapseTotalAmount: React.FC<ItemCollapseTotalAmountProps> = props => {
    const itemCollapseInfo: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="text-md">{i18n.t('Tổng')}</p>,
                children: <TotalAmountForm {...props} />,
            },
        ],
        [props],
    );

    return <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseInfo} />;
};
