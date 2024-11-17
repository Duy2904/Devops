import { Col, Divider, Flex } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { TourScheduleDto, TourScheduleStatus } from '@sdk/tour-operations';

import { AppConfig } from '@src/new/shared/utils/config';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import ReservationButton from './components/ReservationButton';
import { ShareLogo } from '@src/new/components/common/SvgIcon';
import { TourDetailInfo } from './components/TourDetailInfo';
import TourSummaryInfo from './components/TourSummaryInfo';
import dayjs from 'dayjs';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useTranslation } from 'react-i18next';

interface MainContentProps {
    tourData?: TourScheduleDto;
    isFastReservationDrawerOpen: boolean;
    setIsFastReservationDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export const MainContent: React.FC<MainContentProps> = props => {
    const { tourData, isFastReservationDrawerOpen, setIsFastReservationDrawerOpen } = props;
    const { t } = useTranslation();

    const handleOpenReservationSidebar = () => setIsFastReservationDrawerOpen(true);

    const handleShareTourLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toastSuccess(t('Thông báo'), t('Đã sao chép link thành công'));
    };

    return (
        <Col className="flex-1">
            <Col className="flex justify-between items-center gap-2">
                <p className={`${Color.text_4765E6} font-extrabold text-2xl`}>{tourData?.name}</p>
                <Flex align="center" gap={12}>
                    <button
                        type="button"
                        className={`${Color.text_2A2A2A} ${Color.bg_F6F7FA} border-none gap-1 w-[100px] h-7 rounded-md flex items-center px-2 cursor-pointer`}
                        onClick={handleShareTourLink}
                    >
                        <ShareLogo className={`${Color.text_2A2A2A}`} />
                        {t('Chia sẻ')}
                    </button>

                    {!isFastReservationDrawerOpen && tourData?.status !== TourScheduleStatus.SaleTimeExpired && (
                        <ReservationButton
                            onClick={handleOpenReservationSidebar}
                            isAvailable={(tourData?.remainingCapacity ?? 0) > 0}
                        />
                    )}
                </Flex>
            </Col>
            <Col className="flex items-center gap-2 mt-2">
                <p className={`${Color.text_2A2A2A} font-bold text-sm`}>
                    {tourData?.numberOfDays}N{tourData?.numberOfNights}Đ
                    <span className={`${Color.text_2A2A2A_60} mx-2`}>•</span>
                    {dayjs(tourData?.departureDate).format(AppConfig.DateFormat)} -
                    {dayjs(tourData?.endDate).format(AppConfig.DateFormat)}
                </p>
            </Col>

            <Col className="h-[calc(100vh_-_270px)] overflow-auto">
                <TourSummaryInfo tourData={tourData ?? {}} />

                <Divider className="mt-4 mb-2" />
                <TourDetailInfo />
            </Col>
        </Col>
    );
};
