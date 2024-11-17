import isEmpty from 'lodash/isEmpty';

import { TourContentDto, TourScheduleDto } from '@sdk/tour-operations';
import Format from '@src/new/shared/utils/format';
import { sanitizeContentWithImages } from '@utils/sanitize';

interface ScheduleContentProps {
    tourData?: TourScheduleDto;
}

export const ScheduleContent: React.FC<ScheduleContentProps> = props => {
    const sortedTourScheduleContents: TourContentDto[] = Format.formatSortListByOrder(
        props?.tourData?.tourScheduleContents,
    );

    return (
        <div>
            {!isEmpty(sortedTourScheduleContents) &&
                sortedTourScheduleContents?.map(item => (
                    <div>
                        {item?.title && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeContentWithImages(item?.title),
                                }}
                                className="font-semibold mb-2 text-base"
                            />
                        )}
                        {item?.description && (
                            <div
                                className="[&_img]:!w-1/2 [&_img]:!h-auto pr-4 [&_img]:!mx-auto [&_img]:!block [&_img]:!my-10"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeContentWithImages(item?.description),
                                }}
                            />
                        )}
                    </div>
                ))}
        </div>
    );
};
