import { Col, Flex } from 'antd';

import { AppConfig } from '@src/new/shared/utils/config';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { PageName } from '@src/types/TypeEnum';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { TagTourID } from '@src/new/components/ui/Tag/TagTourID';
import { TourSearchFitViewDto } from '@sdk/tour-operations';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface TourInfoProps {
    dataTour?: TourSearchFitViewDto;
}

export const TourInfo: React.FC<TourInfoProps> = ({ dataTour }) => {
    const { t } = useTranslation();
    return (
        <Col className={clsx(Color.bg_F2F3F7, 'rounded-xl py-3 px-4 mb-6')}>
            <p className={clsx(Color.text_2F80ED, 'text-lg font-bold')}>{dataTour?.name}</p>
            <Flex className="mt-3" align="center" justify="space-between">
                <Flex align="center" gap={4}>
                    <p className="text-xs">{t('Mã tour')}</p>
                    <TagTourID text={dataTour?.tourCode ?? ''} className="text-xs" />
                </Flex>
                <Flex className="flex-wrap" align="center" justify="end" gap={6}>
                    <Flex className="mr-2" align="center" gap={4}>
                        <span className={clsx(`text-xs/[22px]`, Color.text_black_45)}>Mở bán từ</span>
                        <span className={`font-bold text-xs/[22px]`}>
                            {dayjs(dataTour?.saleStartDate).format(AppConfig.DateFormat)}
                        </span>
                        <span className={clsx(`text-xs/[22px]`, Color.text_black_45)}>-</span>
                        <span className={`font-bold text-xs/[22px]`}>
                            {dayjs(dataTour?.saleEndDate).format(AppConfig.DateFormat)}
                        </span>
                    </Flex>
                    {dataTour?.status && (
                        <TagStatus
                            text={t(`tour.status.${dataTour.status}`)}
                            page={PageName.Tour}
                            status={`${dataTour.status}`}
                        />
                    )}
                </Flex>
            </Flex>
        </Col>
    );
};
