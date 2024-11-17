import { Flex, Tag } from 'antd';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import { TourScheduleDto } from '@sdk/tour-operations';
import Can from '@src/new/components/common/Can';
import { TagTour } from '@src/new/components/customs/Tags/TagTour';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { AppConfig } from '@src/new/shared/utils/config';
import { calculateRemainingDays } from '@src/new/shared/utils/date';
import { MyPermissions } from '@src/new/shared/utils/Permissions';
import { PageName } from '@src/types/TypeEnum';

import { useRenderRemainingDaysText } from '../TourList/hooks/useRenderRemainingDaysText';

interface TitleHeaderProps {
    tourData?: TourScheduleDto;
}

export const TitleHeader: React.FC<TitleHeaderProps> = props => {
    const { tourData } = props;
    const { t } = useTranslation();
    const remainingDaysText = useRenderRemainingDaysText(calculateRemainingDays(tourData?.saleEndDate));

    return (
        <Flex align="center" justify="space-between" gap={24}>
            <Flex
                className="flex-1"
                align="center"
                justify={!isEmpty(tourData?.tags) ? 'space-between' : 'flex-end'}
                gap={12}
            >
                <Flex gap={4}>
                    {!isEmpty(tourData?.tags) &&
                        tourData?.tags?.map((item, index) =>
                            index < 3 ? (
                                <TagTour
                                    key={item.tagId}
                                    color={item?.tagColor ?? ''}
                                    content={item?.tagName}
                                    icon={item?.tagIcon ?? ''}
                                />
                            ) : null,
                        )}
                </Flex>
                <Flex align="center" gap={8}>
                    <Flex align="center" gap={4}>
                        <span className={`${Color.text_black_45} text-xs/[22px]`}>{t('Mở bán từ')}</span>
                        <span className={`font-bold text-xs/[22px]`}>
                            {dayjs(tourData?.saleStartDate).format(AppConfig.DateFormat)}
                        </span>
                        <span className={`${Color.text_black_45} text-xs/[22px]`}>{t('đến')}</span>
                        <span className={`font-bold text-xs/[22px]`}>
                            {dayjs(tourData?.saleEndDate).format(AppConfig.DateFormat)}
                        </span>
                        {remainingDaysText}
                    </Flex>
                    <TagStatus
                        text={t(`tour.status.${tourData?.status}`)}
                        page={PageName.Tour}
                        status={`${tourData?.status}`}
                    />
                </Flex>
            </Flex>
            <Flex className="w-[400px]" align="center">
                <Flex className="flex-1" align="center" gap={4} justify="start">
                    <Can permissions={[MyPermissions.TourFitProviderView]}>
                        <>
                            {tourData?.vendorLogo && (
                                <img
                                    src={tourData?.vendorLogo}
                                    alt="Hồng Ngọc Hà"
                                    className={`${Color.border_DBDBDB} aspect-square w-6 h-6 rounded-full border border-solid`}
                                />
                            )}
                            <span
                                className={`${Color.text_black_88} text-xs/[20px] font-bold inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]`}
                            >
                                {tourData?.vendorName}
                            </span>
                        </>
                    </Can>
                </Flex>
                <Flex className="flex-1" align="center" gap={4} justify="end">
                    <span className={`${Color.text_2A2A2A_60} text-xs w-[42px]`}>{t('Tour ID')}</span>
                    <Tag
                        bordered={false}
                        className={`${Color.text_2A2A2A_80} ${Color.border_DBDBDB} w-full h-6 rounded-[5px] border border-solid flex items-center justify-center max-w-max mr-0 bg-white font-bold`}
                    >
                        {tourData?.tourCode}
                    </Tag>
                </Flex>
            </Flex>
        </Flex>
    );
};
