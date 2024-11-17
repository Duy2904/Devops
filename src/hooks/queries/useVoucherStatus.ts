import { VoucherStatus } from '../../../sdk/tour-operations';
import i18n from '../../i18n';

export const getVoucherStatus = () =>
    Object.values(VoucherStatus).map((key: string) => ({
        value: key,
        label: i18n.t(`${key}`),
    }));
