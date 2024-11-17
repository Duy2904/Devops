import { ButtonRevenueTourFit } from './Button';
import { HeadContent } from '@components/ui/HeadContent';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export const HeaderAccountsReceivableAgency = () => {
    const slug = [
        {
            name: i18n.t('menu.report'),
            slug: '',
        },
        {
            name: i18n.t('menu.accountsReceivableAgency'),
            slug: rootPaths.accountsReceivableAgency,
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} showUpdated />}
            titleContent={<TitleHeader title={`${i18n.t('menu.report')} ${i18n.t('menu.accountsReceivableAgency')}`} />}
            buttonActionList={<ButtonRevenueTourFit />}
        />
    );
};
