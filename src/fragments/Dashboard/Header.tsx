import { SlugHeader } from '../../components/ui/Slug';
import { TitleHeader } from '../../components/ui/TitleHeader';
import { t } from 'i18next';

export const HeaderDashboard = () => {
    const slug = [
        {
            name: 'Dashboard',
            slug: '/',
        },
    ];
    return (
        <>
            <TitleHeader title={t('Dashboard')} />
            <SlugHeader slugList={slug} />
        </>
    );
};
