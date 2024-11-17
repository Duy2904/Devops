import { Collapse, CollapseProps, FormInstance } from 'antd';
import React, { useMemo } from 'react';

import { QuoteLineDto, QuoteStatus } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { TabsDetail } from './TabsDetail';

interface ItemCollapseDetailProps {
    form: FormInstance;
    dataQuoteLines: QuoteLineDto[] | undefined;
    quoteStatus: QuoteStatus;
    isSubmitting: boolean;
    handleOnValuesChange: () => void;
}

export const CollapseDetail: React.FC<ItemCollapseDetailProps> = props => {
    const itemCollapseInfo: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="text-md">{i18n.t('Chi tiết')}</p>,
                children: <TabsDetail {...props} />,
            },
        ],
        [props],
    );

    return <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseInfo} />;
};
