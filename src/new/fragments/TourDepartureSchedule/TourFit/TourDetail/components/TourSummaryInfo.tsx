import { Col, Flex, Spin } from 'antd';

import { AppConfig } from '@utils/config';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import FileCardList from '@src/new/components/ui/Card/FileCardList';
import { IconAttachment } from '@src/new/components/common/svg';
import { LoadingOutlined } from '@ant-design/icons';
import TourGuideCard from '@src/new/components/ui/Card/TourGuideCard';
import { TourScheduleDto } from '@sdk/tour-operations';
import { calculateRemainingDays } from '@utils/formHelper';
import dayjs from 'dayjs';
import { downloadfileFromBlob } from '@src/new/shared/utils/downloadFile';
import { useDownloadAllFile } from '../../TourList/hooks/mutates';
import { useRenderRemainingDaysText } from '../../TourList/hooks/useRenderRemainingDaysText';
import { useTranslation } from 'react-i18next';

interface TourDetailInfoProps {
    tourData: TourScheduleDto;
}

const TourSummaryInfo = ({ tourData }: TourDetailInfoProps) => {
    const { t } = useTranslation();

    // Hooks
    const { mutateAsync: downloadFiles, isLoading } = useDownloadAllFile();

    const handleDownload = async () => {
        const blobDataRes = await downloadFiles(tourData.id!);
        downloadfileFromBlob(blobDataRes, `${tourData.tourCode}-files-downloaded.zip`);
    };

    const remainingDaysText = useRenderRemainingDaysText(
        calculateRemainingDays(tourData.visaTourService?.visaSubmissionDate),
    );

    return (
        <Flex gap={40} className="mt-3">
            <Col className="flex flex-col gap-4">
                {!!tourData.visaTourService?.visaSubmissionDate && (
                    <Flex vertical gap={4}>
                        <span className={`${Color.text_black_88} text-sm`}>{t('Hạn nộp hồ sơ')}</span>
                        <p className={`${Color.text_2A2A2A} font-bold text-sm`}>
                            {dayjs(tourData.visaTourService?.visaSubmissionDate).format(AppConfig.DateFormat)}{' '}
                            {remainingDaysText}
                        </p>
                    </Flex>
                )}

                <Col className="flex flex-col xl:flex-row gap-4">
                    {tourData.departureTrip && (
                        <Flex vertical gap={4}>
                            <span className={`${Color.text_black_88} text-sm`}>{t('Chuyến đi')}</span>
                            <p className={`${Color.text_2A2A2A} max-w-[248px] flex-1 font-bold text-sm`}>
                                {tourData.departureTrip}
                            </p>
                        </Flex>
                    )}
                    {tourData.returnTrip && (
                        <Flex vertical gap={4}>
                            <span className={`${Color.text_black_88} text-sm`}>{t('Chuyến về ')}</span>
                            <p className={`${Color.text_2A2A2A} max-w-[248px] flex-1 font-bold text-sm`}>
                                {tourData.returnTrip}
                            </p>
                        </Flex>
                    )}

                    {/* <FlightInfoCard
                            title={t('Chuyến đi')}
                            airlineName="Vietnam Airline"
                            airlineCode="VNA"
                            flightNumber="VN235"
                            departureTime="17:50"
                            arrivalTime="19:50"
                        />

                        <FlightInfoCard
                            title={t('Chuyến về')}
                            airlineName="Vietnam Airline"
                            airlineCode="VNA"
                            flightNumber="VN900"
                            departureTime="19:30"
                            arrivalTime="22:00"
                        /> */}
                </Col>
            </Col>

            <Flex className="flex-col gap-x-10 gap-y-4 xl:flex-row">
                {(tourData.tourScheduleTourGuides?.length || 0) > 0 && (
                    <Col>
                        <span className={`${Color.text_black_88} text-sm/[22px]`}>{t('Hướng dẫn viên')}</span>
                        <Col className="flex flex-col gap-1 mt-1">
                            {tourData.tourScheduleTourGuides?.map(tourSchedule => {
                                const { tourGuide } = tourSchedule;

                                if (!tourGuide) return null;

                                const age = dayjs().diff(tourGuide.dateOfBirth, 'years');

                                return (
                                    <TourGuideCard
                                        key={tourGuide.id}
                                        avatar={tourGuide.image || ''}
                                        name={tourGuide.name || ''}
                                        country={tourGuide.countryName || 'Việt Nam'}
                                        gender={tourGuide.gender}
                                        age={age}
                                    />
                                );
                            })}
                        </Col>
                    </Col>
                )}

                {(tourData.tourScheduleMedias?.length || 0) > 0 && (
                    <Col className="max-w-[240px]">
                        <Col className="flex items-center justify-between">
                            <span className={`${Color.text_black_88} text-sm/[22px]`}>{t('File đính kèm')}</span>
                            <div
                                className={`${Color.text_1677FF} ${
                                    isLoading && 'opacity-50 cursor-wait'
                                } flex items-center gap-1 text-xs hover:underline cursor-pointer`}
                                onClick={() => !isLoading && handleDownload()}
                            >
                                <IconAttachment fill="#1677FF" />
                                {t('Tải tất cả')}
                                {isLoading ? (
                                    <Spin className="ml-1" indicator={<LoadingOutlined spin />} size="small" />
                                ) : (
                                    <div
                                        className={`${Color.bg_1677FF} text-[8px] font-medium flex items-center justify-center rounded min-w-[14px] h-[14px] text-white`}
                                    >
                                        {tourData.tourScheduleMedias?.length}
                                    </div>
                                )}
                            </div>
                        </Col>

                        <Col className="mt-1">
                            <FileCardList data={tourData.tourScheduleMedias} />
                        </Col>
                    </Col>
                )}
            </Flex>
        </Flex>
    );
};

export default TourSummaryInfo;
