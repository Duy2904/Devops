import { Collapse, CollapseProps, FormInstance } from 'antd';
import React, { useMemo } from 'react';

import { QuoteDetailDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { InfoForm } from './FormInfo';

interface ItemCollapseInfoProps {
    form: FormInstance;
    orderNo: string;
    dataQuote: QuoteDetailDto;
}

export const CollapseInfo: React.FC<ItemCollapseInfoProps> = props => {
    const itemCollapseInfo: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="text-md">{i18n.t('Thông tin chung')}</p>,
                children: <InfoForm {...props} dataQuote={props.dataQuote} />,
            },
        ],
        [props],
    );

    return <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseInfo} />;
};
