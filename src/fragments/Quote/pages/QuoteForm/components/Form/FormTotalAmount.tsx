import { Form, FormInstance } from 'antd';
import { useMemo } from 'react';

import { useGetVats } from '@components/customizes/Select/Vat/useVat';
import { calculateTotal } from '@fragments/Quote/features';
import { QuoteType } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { convertValues } from '@utils/formHelper';

import { AmountItem } from '../AmountItem';

interface TotalAmountFormProps {
    form: FormInstance;
}

export const TotalAmountForm: React.FC<TotalAmountFormProps> = props => {
    const { form } = props;
    const revenueDataForm = Form.useWatch(QuoteType.Revenue, form);
    const costDataForm = Form.useWatch(QuoteType.Cost, form);

    // Query
    const { data: dataVAT } = useGetVats();

    const totalRevenue = useMemo(
        () => calculateTotal(convertValues(revenueDataForm), dataVAT),
        [dataVAT, revenueDataForm],
    );
    const totalCost = useMemo(() => calculateTotal(convertValues(costDataForm), dataVAT), [costDataForm, dataVAT]);
    const totalProfit = useMemo(() => totalRevenue - totalCost, [totalCost, totalRevenue]);
    const ros = useMemo(() => (totalRevenue ? (totalProfit / totalRevenue) * 100 : 0), [totalProfit, totalRevenue]);
    const roe = useMemo(() => (totalCost ? (totalProfit / totalCost) * 100 : 0), [totalCost, totalProfit]);

    const addColor = (price: number) => {
        if (price > 0) {
            return 'text-green-500';
        } else if (price < 0) {
            return 'text-red-500';
        }
        return '';
    };

    return (
        <div className="p-4">
            <AmountItem title={i18n.t('Doanh thu')} price={Intl.NumberFormat('en-US').format(Number(totalRevenue))} />
            <AmountItem title={i18n.t('Chi phí')} price={Intl.NumberFormat('en-US').format(Number(totalCost))} />
            <AmountItem
                title={i18n.t('Lợi nhuận')}
                price={Intl.NumberFormat('en-US').format(Number(totalProfit))}
                className={addColor(totalProfit)}
            />
            <AmountItem
                title={i18n.t('ROS')}
                price={Intl.NumberFormat('en-US').format(Number(ros)) + '%'}
                className={addColor(ros)}
            />
            <AmountItem
                title={i18n.t('ROE')}
                price={Intl.NumberFormat('en-US').format(Number(roe)) + '%'}
                className={addColor(roe)}
            />
        </div>
    );
};
