import { Col, Flex } from 'antd';

import { AppConfig } from '@utils/config';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import Format from '@src/new/shared/utils/format';
import dayjs from 'dayjs';
import isNil from 'lodash/isNil';
import { useTranslation } from 'react-i18next';

interface TotalPriceProps {
    totalQuantity: number;
    totalPrice: number;
    expiredDate?: dayjs.Dayjs;
}

const TotalPrice = ({ totalQuantity, totalPrice, expiredDate }: TotalPriceProps) => {
    const { t } = useTranslation();
    const daysRemaining = dayjs(expiredDate).diff(dayjs(), 'days');

    return (
        <Col>
            <p className={`${Color.text_black_88} text-sm py-1 font-bold uppercase`}>{t('Tổng cộng')}</p>
            <Col
                className={`${Color.bg_3E5BE0_10} ${Color.text_1F39B0} flex items-center justify-between text-[18px]/[22px] font-extrabold px-3 py-[8.5px] rounded-lg`}
            >
                <p>{totalQuantity} vé</p>
                <p>{Format.formatNumber(totalPrice)}</p>
            </Col>

            {!isNil(expiredDate) && (
                <Flex align="center" justify="space-between" className="mt-2">
                    <p className={`${Color.text_2A2A2A_60} text-sm line-clamp-1`}>{t('Hạn cuối thanh toán')}</p>
                    <p className={`${Color.text_black_88} flex items-center gap-1 font-bold text-sm`}>
                        <span>{dayjs(expiredDate).format(AppConfig.DateFormat)}</span>
                        {daysRemaining > 0 && (
                            <Col
                                className={`${Color.bg_F1C40F} ${Color.text_2A2A2A} text-[10px] px-1 font-medium rounded`}
                            >
                                <span className="relative top-[1px]">Còn {daysRemaining} ngày</span>
                            </Col>
                        )}
                    </p>
                </Flex>
            )}
        </Col>
    );
};

export default TotalPrice;
