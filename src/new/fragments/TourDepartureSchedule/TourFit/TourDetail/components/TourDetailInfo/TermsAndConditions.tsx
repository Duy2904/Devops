import isEmpty from 'lodash/isEmpty';

import { TourScheduleDto } from '@sdk/tour-operations';
import { sanitizeContentWithImages } from '@utils/sanitize';

interface TermsAndConditionsProps {
    tourData?: TourScheduleDto;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = props => {
    return (
        <div>
            {!isEmpty(props?.tourData?.tourScheduleConditions) &&
                props?.tourData?.tourScheduleConditions?.map(item => (
                    <div className="mb-4">
                        <p className="mb-4">{item?.title}</p>
                        {item?.description && (
                            <div
                                className="[&_img]:!w-2/3 [&_img]:!h-auto pr-4 [&_img]:!mx-auto [&_img]:!block [&_img]:!my-10"
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
