import { FormAutoIncrement } from '../Form';
import i18n from '@src/i18n';

export const ReceivableVoucherCode: React.FC = () => {
    return (
        <FormAutoIncrement
            name={'Receivable Voucher'}
            tableCode={'ReceivableVoucher'}
            title={'Thiết lập mã tăng tự động cho Phiếu thu (ReceivableVoucher Code)'}
            titleToast={i18n.t('menu.receivableVoucher')}
        />
    );
};
