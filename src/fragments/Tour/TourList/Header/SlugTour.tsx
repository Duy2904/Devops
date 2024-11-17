import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { rootPaths } from '@src/routers/route';

interface SlugTourProps {
    isFitTour: boolean;
}

export const SlugTour: React.FC<SlugTourProps> = props => {
    const slug = [
        {
            name: props.isFitTour ? i18n.t('menu.tourFit') : i18n.t('menu.tourGit'),
            slug: '',
        },
        {
            name: props.isFitTour
                ? `${i18n.t('Danh sách')} ${i18n.t('menu.tourFit')}`
                : `${i18n.t('Danh sách')} ${i18n.t('menu.tourGit')}`,
            slug: props.isFitTour ? rootPathsNew.tourFit : rootPaths.gitTours,
        },
    ];
    return <SlugHeader slugList={slug} showUpdated />;
};
