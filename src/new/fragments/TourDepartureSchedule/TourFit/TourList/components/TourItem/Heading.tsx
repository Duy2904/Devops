import { Col, Flex } from 'antd';

import { AppConfig } from '@utils/config';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Link } from 'react-router-dom';
import { PageName } from '@src/types/TypeEnum';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { TagTourID } from '@src/new/components/ui/Tag/TagTourID';
import { TourSearchFitViewDto } from '@sdk/tour-operations';
import { calculateRemainingDays } from '@utils/formHelper';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { rootPathsNew } from '@src/routers/newRoute';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useRenderRemainingDaysText } from '../../hooks/useRenderRemainingDaysText';

interface HeadingProps {
    item: TourSearchFitViewDto;
    index: number;
}

export const Heading: React.FC<HeadingProps> = props => {
    const { item, index } = props;
    const remainingDaysText = useRenderRemainingDaysText(calculateRemainingDays(item.saleEndDate));

    const renderColorHeading = useMemo(() => {
        let color = '';

        if ((index + 4) % 4 === 0) {
            color = 'text-[#F5222D]';
        } else if ((index + 3) % 4 === 0) {
            color = 'text-[#0958D9]';
        } else if ((index + 2) % 4 === 0) {
            color = 'text-[#FA9116]';
        } else if ((index + 1) % 4 === 0) {
            color = 'text-[#389E0D]';
        }

        return color;
    }, [index]);

    return (
        <Col className={clsx(`grid grid-cols-2 px-4 py-3 rounded-t-xl`, Color.bg_EAEDF9)}>
            <Flex gap={12} align="center" justify="start">
                <Link
                    to={`${rootPathsNew.tourFitDepartureSchedule}/${item.tourCode}`}
                    className={clsx(`font-extrabold text-base hover:underline`, renderColorHeading)}
                >
                    <p
                        className={clsx(
                            `w-full font-extrabold text-base line-clamp-2 hover:underline`,
                            renderColorHeading,
                        )}
                    >
                        {item.name}
                    </p>
                </Link>
            </Flex>
            <Flex className="flex-wrap" align="center" justify="end" gap={6}>
                <TagTourID text={item?.tourCode ?? ''} className="text-xs" />
                <Flex className="mr-2" align="center" gap={4}>
                    <span className={clsx(`text-xs/[22px]`, Color.text_black_45)}>Mở bán từ</span>
                    <span className={`font-bold text-xs/[22px]`}>
                        {dayjs(item?.saleStartDate).format(AppConfig.DateFormat)}
                    </span>
                    <span className={clsx(`text-xs/[22px]`, Color.text_black_45)}>-</span>
                    <span className={`font-bold text-xs/[22px]`}>
                        {dayjs(item?.saleEndDate).format(AppConfig.DateFormat)}
                    </span>
                    {remainingDaysText}
                </Flex>
                {item.status && (
                    <TagStatus text={t(`tour.status.${item.status}`)} page={PageName.Tour} status={`${item.status}`} />
                )}
            </Flex>
        </Col>
    );
};
