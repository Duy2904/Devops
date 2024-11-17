import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import { TourScheduleDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { rootPaths } from '@src/routers/route';
import { TourType } from '@src/types/TypeEnum';

interface HeaderTourFormComponentProps {
    data?: TourScheduleDto;
    showSlug?: boolean;
    showTitle?: boolean;
    tourType?: TourType;
}

export const HeaderTourFormComponent: React.FC<HeaderTourFormComponentProps> = props => {
    let tourFormPath;
    let tourType;

    switch (props.tourType) {
        case TourType.FIT:
            tourType = i18n.t('tour.tourFit');
            break;
        case TourType.GIT:
            tourType = i18n.t('tour.tourGit');
            break;
        default:
    }

    if (props.data?.id) {
        tourFormPath = (props.tourType == TourType.FIT ? rootPaths.fitTourForm : rootPaths.gitTourForm) + props.data.id;
    } else {
        tourFormPath = props.tourType == TourType.FIT ? rootPaths.fitTourForm : rootPaths.gitTourForm;
    }

    const slugHeader = [
        {
            name: tourType ?? '',
            slug: props.tourType == TourType.FIT ? rootPathsNew.tourFit : rootPaths.gitTours,
        },
        {
            name: `${props.data?.id ? i18n.t('action.edit') : i18n.t('action.create')}`,
            slug: `${tourFormPath}`,
        },
    ];

    return (
        <>
            {props.showSlug && <SlugHeader slugList={slugHeader} />}
            {props.showTitle && (
                <TitleHeader
                    title={
                        props.data?.id
                            ? `${props.data?.tourCode} - ${props.data?.name}`
                            : `${i18n.t('action.create')} ${tourType}`
                    }
                />
            )}
        </>
    );
};
