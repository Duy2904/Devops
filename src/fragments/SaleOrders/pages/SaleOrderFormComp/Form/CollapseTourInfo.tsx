import { Collapse, CollapseProps, FormInstance } from 'antd';
import React, { useMemo } from 'react';

import { TourInfoComponent } from '../components/TourInfo';

interface ItemCollapseTourInfoProps {
    form: FormInstance;
    soId?: string;
    soCode?: string;
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
    setIsConfirmOverload: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultActiveKey = ['1'];

export const CollapseTourInfo: React.FC<ItemCollapseTourInfoProps> = props => {
    const itemCollapseTourInfo: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                className: '!rounded-none !border-none',
                label: <p className="text-md">Thông tin chung</p>,
                children: <TourInfoComponent {...props} />,
            },
        ],
        [props],
    );

    return (
        <Collapse
            className="rounded-t-lg rounded-b-none"
            defaultActiveKey={defaultActiveKey}
            expandIconPosition={'end'}
            items={itemCollapseTourInfo}
        />
    );
};
