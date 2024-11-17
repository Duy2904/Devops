import { AppConfig } from '@utils/config';
import { RangePickerSearch } from '@src/new/components/customs/SearchItems/RangePickerSearch';
import { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export const RangeDateSearch = () => {
    const { t } = useTranslation();

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Hôm nay', value: [dayjs(), dayjs()] },
        { label: 'Hôm qua', value: [dayjs().subtract(1, 'day'), dayjs()] },
        { label: '07 ngày trước', value: [dayjs().subtract(6, 'day'), dayjs()] },
        { label: 'Trong tháng', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
        { label: '03 tháng trước', value: [dayjs().subtract(3, 'months'), dayjs()] },
        { label: '06 tháng trước', value: [dayjs().subtract(6, 'months'), dayjs()] },
    ];

    return (
        <RangePickerSearch
            className="w-72"
            rangePresets={rangePresets}
            formatDate={AppConfig.DateFormat}
            defaultValue={[dayjs().subtract(1, 'month'), dayjs()]}
            placeholder={[t('Từ ngày'), t('Đến ngày')]}
            showLunar
        />
    );
};
