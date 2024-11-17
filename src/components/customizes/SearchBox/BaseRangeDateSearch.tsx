import 'dayjs/locale/vi';

import { DatePicker, Flex, TimeRangePickerProps } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs, { Dayjs } from 'dayjs';
import { t } from 'i18next';
import { isNull } from 'lodash';
import { useState } from 'react';

import { AppConfig } from '@utils/config';

import { useSearchTableStore } from '../../../store/searchTableStore';
import { currentPage, pageSize, RangeValue } from '../../../utils/filterSearch';

interface BaseRangeDateSearchProps {
    className?: string;
    showTitle?: boolean;
    title?: string;
    rangePresets: TimeRangePickerProps['presets'];
    defaultValue?: [dayjs.Dayjs, dayjs.Dayjs];
    formatDate?: string;
}
const { RangePicker } = DatePicker;

export const BaseRangeDateSearch: React.FC<BaseRangeDateSearchProps> = props => {
    const { rangePresets, defaultValue, formatDate } = props;
    const [selectedPreset, setSelectedPreset] = useState<string>('');
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onDateChange = (values: RangeValue<Dayjs>) => {
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
        const selectedLabel = rangePresets?.find(item => item.value === values)?.label?.toString();
        setSelectedPreset(selectedLabel ?? '');
        setSearchParams(searchParams);
    };

    const getPopupContainer = (trigger: HTMLElement) => {
        const listItems = document.querySelectorAll(`.ant-picker-dropdown ul li`);
        listItems?.forEach(item => {
            (item as HTMLLIElement).className = 'color-rangepicker';
            const value = item.textContent?.trim();
            if (value === selectedPreset) {
                (item as HTMLLIElement).className = 'color-rangepicker-checked';
            }
        });
        return trigger.parentNode as HTMLElement;
    };

    return (
        <Flex className={props.className} vertical>
            {props?.showTitle && <p className="text-xs mb-2 font-medium">{props.title}</p>}
            <RangePicker
                locale={locale}
                className="w-full"
                placeholder={[t('Từ ngày'), t('Đến ngày')]}
                format={formatDate ?? AppConfig.DateShortYearFormat}
                presets={rangePresets}
                defaultValue={
                    !!tableParams.fromDate && !!tableParams.toDate
                        ? [dayjs(tableParams.fromDate), dayjs(tableParams.toDate)]
                        : defaultValue
                }
                onChange={onDateChange}
                popupClassName="text-sm"
                getPopupContainer={getPopupContainer}
            />
        </Flex>
    );
};
