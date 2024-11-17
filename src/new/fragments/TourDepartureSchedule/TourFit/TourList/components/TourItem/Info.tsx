import { Flex } from 'antd';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';

import { TourSearchFitViewDto } from '@sdk/tour-operations';
import { AppConfig } from '@utils/config';
import { calculateRemainingDays } from '@utils/formHelper';

import { useRenderRemainingDaysText } from '../../hooks/useRenderRemainingDaysText';
import { Attachment } from './Attachment';

interface InfoProps {
    item: TourSearchFitViewDto;
}

export const Info: React.FC<InfoProps> = props => {
    const { item } = props;

    const remainingDaysText = useRenderRemainingDaysText(calculateRemainingDays(item.visaSubmissionDate));

    const renderDate = (date: Date | null | undefined) => {
        if (date) {
            return dayjs(date).format(AppConfig.DateFormat);
        }
        return '';
    };

    return (
        <Flex vertical gap={16} className="w-80">
            <Flex gap={12}>
                <div className="flex flex-col gap-y-1 w-20">
                    <p className={'text-xs text-black'}>Thời gian</p>
                    <p className={`font-bold`}>{`${item?.numberOfDays}N${item?.numberOfNights}Đ`}</p>
                </div>
                <div className="flex flex-col gap-y-1">
                    <p className={'text-xs text-black'}>Ngày đi, ngày về</p>
                    <p className={`font-bold`}>
                        {renderDate(item?.departureDate)} - {renderDate(item?.endDate)}
                    </p>
                </div>
            </Flex>
            {item?.visaSubmissionDate && (
                <Flex vertical gap={4}>
                    <p className={'text-xs text-black'}>Hạn nộp hồ sơ VISA</p>
                    <p className={`font-bold`}>
                        {renderDate(item.visaSubmissionDate)} {remainingDaysText}
                    </p>
                </Flex>
            )}
            {!isEmpty(item?.tourScheduleMedias) && <Attachment item={item} />}
        </Flex>
    );
};
