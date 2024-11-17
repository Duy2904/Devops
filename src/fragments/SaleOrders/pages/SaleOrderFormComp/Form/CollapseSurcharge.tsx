import { Collapse, CollapseProps, FormInstance } from 'antd';
import React, { useMemo } from 'react';

import i18n from '@src/i18n';

import { SurchargeComponent } from '../components/Surcharge';

interface ItemCollapseSurchargeProps {
    readonly form: FormInstance;
    readonly isEnableEdit: boolean;
    readonly isFirstTimeDirty: boolean;
    soId: string | undefined;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CollapseSurcharge: React.FC<ItemCollapseSurchargeProps> = props => {
    const itemSurcharge: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                className: '!rounded-none !border-none',
                label: <p className="text-md">{i18n.t('saleorder.surcharge.title')}</p>,
                children: <SurchargeComponent {...props} />,
            },
        ],
        [props],
    );

    return (
        <Collapse className="!rounded-none" defaultActiveKey={['1']} expandIconPosition={'end'} items={itemSurcharge} />
    );
};
