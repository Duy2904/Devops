import { SlugHeader } from '@components/ui/Slug';
import { TourScheduleDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { rootPaths } from '@src/routers/route';

export interface SlugTitleProps {
    data?: TourScheduleDto;
}

export const SlugTitle: React.FC<SlugTitleProps> = props => {
    const slugHeader = [
        {
            name: i18n.t('tour.tourFit'),
            slug: rootPathsNew.tourFit,
        },
        {
            name: `${i18n.t('Chi tiết')} ${i18n.t('tour.tourFit')}`,
            slug: `${rootPaths.fitTourForm}/${props.data?.tourCode}`,
        },
        {
            name: `${i18n.t('Room List')}`,
            slug: ``,
        },
    ];
    return <SlugHeader slugList={slugHeader} showUpdated />;
};
