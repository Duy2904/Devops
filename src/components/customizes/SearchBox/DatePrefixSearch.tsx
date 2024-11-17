import dayjs from 'dayjs';
import { TimeRangePickerProps } from 'antd';
import { BaseRangeDateSearch } from './BaseRangeDateSearch';

interface DatePrefixSearchProps {
    className?: string;
    showTitle?: boolean;
    title?: string;
}

const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Hôm nay', value: [dayjs(), dayjs()] },
    { label: 'Hôm qua', value: [dayjs().add(-1, 'day'), dayjs()] },
    { label: '07 ngày tới', value: [dayjs(), dayjs().add(6, 'day')] },
    { label: 'Trong tháng', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
    { label: '03 tháng tới', value: [dayjs(), dayjs().add(3, 'months')] },
    { label: '06 tháng tới', value: [dayjs(), dayjs().add(6, 'months')] },
];

export const DatePrefixSearch: React.FC<DatePrefixSearchProps> = props => {
    const { className, showTitle, title } = props;

    return (
        <BaseRangeDateSearch
            title={title}
            showTitle={showTitle}
            rangePresets={rangePresets}
            defaultValue={[dayjs(), dayjs().add(3, 'months')]}
            className={className}
        />
    );
};
