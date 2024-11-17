import { SlugHeader } from '@src/new/components/customs/Slug';
import i18n from '@src/i18n';
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
        {
            name: i18n.t('Chi tiết lịch khởi hành'),
            slug: '',
        },
    ];
    return <SlugHeader slugList={slug} showUpdated showBackBtn navigateUrl={rootPathsNew.tourFitDepartureSchedule} />;
};
