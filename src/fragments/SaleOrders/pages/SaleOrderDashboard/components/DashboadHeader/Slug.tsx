import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export const SlugSaleOrder: React.FC = () => {
    const slug = [
        {
            name: i18n.t('menu.tourFit'),
            slug: '',
        },
        {
            name: i18n.t('menu.saleOrder'),
            slug: rootPaths.saleOrders,
        },
    ];
    return <SlugHeader slugList={slug} showUpdated />;
};
