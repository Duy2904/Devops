import { ButtonReceivableVoucher } from './Button';
import { HeadContent } from '@components/ui/HeadContent';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';

export const HeaderReceiptComponent = () => {
    const slug = [
        {
            name: i18n.t('Chứng từ thanh toán'),
            slug: '',
        },
        {
            name: i18n.t('Phiếu thu'),
            slug: '/receivable-voucher',
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} showUpdated />}
            titleContent={<TitleHeader title={i18n.t('Danh sách Phiếu Thu')} />}
            buttonActionList={<ButtonReceivableVoucher />}
        />
    );
};
