import { Col, Flex } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { LunarDatePicker } from '@src/new/components/ui/DatePicker/LunarDatePicker';
import { useFetchFilterDataTourFit } from './useFilterData';
import { useTranslation } from 'react-i18next';

interface RangeSaleDateProps {
    saleStartDate?: Date | null;
    saleEndDate?: Date | null;
    setSaleStartDate: React.Dispatch<React.SetStateAction<Date | null | undefined>>;
    setSaleEndDate: React.Dispatch<React.SetStateAction<Date | null | undefined>>;
}

export const RangeSaleDate: React.FC<RangeSaleDateProps> = props => {
    const { saleStartDate, saleEndDate, setSaleStartDate, setSaleEndDate } = props;
    const { t } = useTranslation();

    const { data } = useFetchFilterDataTourFit();

    const handleChangeStartDate = (value: Dayjs | null) => {
        setSaleStartDate(value ? dayjs(value).startOf('day').utc().toDate() : null);
    };

    const handleChangeEndDate = (value: Dayjs | null) => {
        setSaleEndDate(value ? dayjs(value).endOf('day').utc().toDate() : null);
    };

    return (
        <Flex className="w-full" vertical>
            <p className="text-sm mb-2">{t('Thời gian mở bán')}</p>
            <Col className="grid grid-cols-2 gap-4">
                <LunarDatePicker
                    className="col-span-2 lg:col-span-1 mb-0"
                    format={'date'}
                    disabledDate={current =>
                        current < dayjs(data?.minSaleStartDate).subtract(1, 'days') ||
                        current > dayjs(data?.maxSaleEndDate)
                    }
                    placeholder={t('Ngày bắt đầu')}
                    value={saleStartDate ? dayjs(saleStartDate) : undefined}
                    onChange={handleChangeStartDate}
                    showLunar
                />
                <LunarDatePicker
                    className="col-span-2 lg:col-span-1 mb-0"
                    format={'date'}
                    placeholder={t('Ngày kết thúc')}
                    disabledDate={current =>
                        current < dayjs(data?.minSaleStartDate).subtract(1, 'days') ||
                        current > dayjs(data?.maxSaleEndDate)
                    }
                    value={saleEndDate ? dayjs(saleEndDate) : undefined}
                    onChange={handleChangeEndDate}
                    showLunar
                />
            </Col>
        </Flex>
    );
};
