import { ButtonDocumentReceipt } from './Button';
import { HeadContent } from '@components/ui/HeadContent';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export const HeaderDocumentReceipt = () => {
    const slug = [
        {
            name: i18n.t('menu.visa'),
            slug: '',
        },
        {
            name: i18n.t('menu.visaReceipt'),
            slug: rootPaths.documentReceipt,
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} showUpdated />}
            titleContent={<TitleHeader title={i18n.t('Danh sách Biên nhận thu hồ sơ VISA')} />}
            buttonActionList={<ButtonDocumentReceipt />}
        />
    );
};
