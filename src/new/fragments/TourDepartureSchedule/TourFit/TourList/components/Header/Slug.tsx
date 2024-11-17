import i18n from '@src/i18n';
import { SlugHeader } from '@src/new/components/customs/Slug';
import { rootPathsNew } from '@src/routers/newRoute';

export const Slug: React.FC = () => {
    const slug = [
        {
            name: i18n.t('menu.tourFit'),
            slug: '',
        },
        {
            name: i18n.t('Lịch khởi hành'),
            slug: rootPathsNew.tourFitDepartureSchedule,
        },
    ];
    return <SlugHeader slugList={slug} showUpdated />;
};
