import { TimeRangePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import { useMemo, useState } from 'react';

import { LunarRangePicker } from '@src/new/components/ui/DatePicker/LunarRangePicker';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { currentPage, pageSize, RangeValue } from '@utils/filterSearch';

interface RangePickerSearchProps {
    className?: string;
    rangePresets?: TimeRangePickerProps['presets'];
    defaultValue?: [dayjs.Dayjs, dayjs.Dayjs];
    formatDate?: string;
    placeholder?: [string, string];
    showLunar?: boolean;
}

export const RangePickerSearch: React.FC<RangePickerSearchProps> = props => {
    const { className, rangePresets, defaultValue, formatDate, placeholder, showLunar } = props;
    const [selectedPreset, setSelectedPreset] = useState<string>('');

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const prevValues = useMemo(() => {
        if (!isNil(tableParams?.fromDate) && !isNil(tableParams?.toDate)) {
            const values = [dayjs(tableParams?.fromDate), dayjs(tableParams?.toDate)] as [Dayjs, Dayjs];

            return values;
        }
    }, [tableParams?.fromDate, tableParams?.toDate]);

    const handleOnChange = (values: RangeValue<Dayjs>) => {
        const selectedLabel = rangePresets?.find(item => item.value === values)?.label?.toString();
        setSelectedPreset(selectedLabel ?? '');

        const [startDate, endDate] = values ?? [];
        const commonSearchParams = {
            ...tableParams,
            pagination: { current: currentPage, pageSize, showSizeChanger: true },
        };
        const searchParams = !isNull(values)
            ? {
                  ...commonSearchParams,
                  fromDate: dayjs(startDate).startOf('day').utc().toDate(),
                  toDate: dayjs(endDate).endOf('day').utc().toDate(),
              }
            : {
                  ...commonSearchParams,
                  fromDate: null,
                  toDate: null,
              };
        setSearchParams(searchParams);
    };

    return (
        <LunarRangePicker
            className={className}
            rangePresets={rangePresets}
            onChange={handleOnChange}
            selectedPreset={selectedPreset}
            defaultValue={!isNil(prevValues) ? prevValues : defaultValue}
            formatDate={formatDate}
            placeholder={placeholder}
            showLunar={showLunar}
        />
    );
};
