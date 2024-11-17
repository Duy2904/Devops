import { AppConfig } from '@utils/config';
import { RangePickerSearch } from '@src/new/components/customs/SearchItems/RangePickerSearch';
import { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export const RangeDateSearch = () => {
    const { t } = useTranslation();

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Hôm nay', value: [dayjs(), dayjs()] },
        { label: 'Hôm qua', value: [dayjs().add(-1, 'day'), dayjs()] },
        { label: '07 ngày tới', value: [dayjs(), dayjs().add(6, 'day')] },
        { label: 'Trong tháng', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
        { label: '03 tháng tới', value: [dayjs(), dayjs().add(3, 'months')] },
        { label: '06 tháng tới', value: [dayjs(), dayjs().add(6, 'months')] },
    ];

    return (
        <RangePickerSearch
            className="w-64"
            rangePresets={rangePresets}
            formatDate={AppConfig.DateFormat}
            defaultValue={[dayjs(), dayjs().add(3, 'months')]}
            placeholder={[t('Từ ngày'), t('Đến ngày')]}
            showLunar
        />
    );
};
