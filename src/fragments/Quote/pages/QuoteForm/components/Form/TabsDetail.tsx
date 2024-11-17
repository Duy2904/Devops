import { FormInstance, Tabs, TabsProps } from 'antd';

import { QuoteLineDto, QuoteStatus, QuoteType } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { FormDetail } from './FormDetail';

interface TabsDetailProps {
    form: FormInstance;
    dataQuoteLines: QuoteLineDto[] | undefined;
    quoteStatus: QuoteStatus;
    isSubmitting: boolean;
    handleOnValuesChange: () => void;
}

export const TabsDetail: React.FC<TabsDetailProps> = props => {
    const { form, dataQuoteLines, quoteStatus, isSubmitting, handleOnValuesChange } = props;

    const quoteLinesRevenue = dataQuoteLines?.filter(x => x.type === QuoteType.Revenue) ?? [];
    const quoteLinesCost = dataQuoteLines?.filter(x => x.type === QuoteType.Cost) ?? [];

    const itemTab: TabsProps['items'] = [
        {
            forceRender: true,
            label: i18n.t('Doanh thu'),
            key: 'doanhthu',
            children: (
                <FormDetail
                    form={form}
                    type={QuoteType.Revenue}
                    data={quoteLinesRevenue}
                    quoteStatus={quoteStatus}
                    isSubmitting={isSubmitting}
                    handleOnValuesChange={handleOnValuesChange}
                />
            ),
        },
        {
            forceRender: true,
            label: i18n.t('Chi phí'),
            key: 'chiphi',
            children: (
                <FormDetail
                    form={form}
                    type={QuoteType.Cost}
                    data={quoteLinesCost}
                    quoteStatus={quoteStatus}
                    isSubmitting={isSubmitting}
                    handleOnValuesChange={handleOnValuesChange}
                />
            ),
        },
    ];

    return (
        <div className="p-4">
            <Tabs type="card" items={itemTab} />
        </div>
    );
};
