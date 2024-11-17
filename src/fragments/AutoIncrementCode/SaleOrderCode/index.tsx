import { FormAutoIncrement } from '../Form';
import i18n from '@src/i18n';

export const SaleOrderCode: React.FC = () => {
    return (
        <FormAutoIncrement
            name={'Sale Orders'}
            tableCode={'SaleOrder'}
            title={'Thiết lập mã tăng tự động cho đơn hàng bán (SaleOrder Code)'}
            titleToast={i18n.t('menu.saleOrder')}
        />
    );
};
