import { Col, Flex } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { SaleOrderDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { AppConfig } from '@utils/config';

interface HeaderContentProps {
    data?: SaleOrderDto;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Flex
            className={clsx(`${Color.bg_F6F7FA} p-5 rounded-xl border border-solid border-greyColor-fifth/50`)}
            vertical
            gap={20}
        >
            <Col className="grid grid-cols-3">
                <Flex className="col-span-1 text-sm" gap={16}>
                    <p>{t('Mã đơn hàng')}</p>
                    <p className="font-bold">{data?.orderNo}</p>
                </Flex>
                <Flex className="col-span-1 text-sm" gap={16}>
                    <p></p>
                    {/* <p>{t('Đại lý')}</p>
                    <p className="font-bold truncate max-w-[70%]">Hồng Ngọc Hà</p> */}
                </Flex>
                <Flex className="col-span-1 text-sm" gap={16}>
                    <p>{t('Ngày khởi hành')}</p>
                    <p className="font-bold">
                        {data?.tourSchedule?.departureDate &&
                            dayjs(data?.tourSchedule?.departureDate).format(AppConfig.DateFormat)}
                    </p>
                </Flex>
            </Col>
            <Col className="grid grid-cols-3">
                <Flex className="col-span-2 text-sm" gap={16}>
                    <p>{t('Thông tin tour')}</p>
                    <p className="font-bold truncate max-w-[90%]">
                        {data?.tourSchedule?.tourCode} - {data?.tourSchedule?.name}
                    </p>
                </Flex>
                <Flex className="col-span-1 text-sm" gap={16}>
                    <p>{t('Số chỗ còn nhận')}</p>
                    <p className="font-bold">{data?.tourSchedule?.remainingCapacity}</p>
                </Flex>
            </Col>
        </Flex>
    );
};
