import 'dayjs/locale/vi';

import { DatePicker, Flex, Switch, TimeRangePickerProps } from 'antd';
import { cloneElement, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { AppConfig } from '@utils/config';
import { Lunar } from 'lunar-typescript';
import { RangePickerProps } from 'antd/es/date-picker';
import { RangeValue } from '@utils/filterSearch';
import clsx from 'clsx';
import { createStyles } from 'antd-style';
import { isSameRange } from '@src/new/shared/utils/date';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { useTranslation } from 'react-i18next';

interface LunarRangePickerProps {
    className?: string;
    placeholder?: [string, string];
    formatDate?: string;
    rangePresets: TimeRangePickerProps['presets'];
    defaultValue?: [dayjs.Dayjs, dayjs.Dayjs];
    selectedPreset?: string;
    showLunar?: boolean;
    // eslint-disable-next-line no-unused-vars
    onChange?: (values: RangeValue<Dayjs>) => void;
}

const { RangePicker } = DatePicker;

const useStyle = createStyles(({ token, css, cx }) => {
    const lunar = css`
        color: ${token.colorTextTertiary};
        font-size: ${token.fontSizeSM}px;
    `;

    return {
        lunar,
        current: css`
            color: ${token.colorPrimary};
            &:before {
                background: ${token.colorPrimary};
            }
            &:hover:before {
                background: ${token.colorPrimary};
                opacity: 0.8;
            }
            .${cx(lunar)} {
                opacity: 0.9;
            }
        `,
        weekend: css`
            color: ${token.colorError};
            &.gray {
                opacity: 0.4;
            }
        `,
    };
});

export const LunarRangePicker: React.FC<LunarRangePickerProps> = props => {
    const {
        className,
        placeholder,
        formatDate,
        rangePresets,
        defaultValue,
        selectedPreset: _selectedPreset,
        showLunar,
        onChange,
    } = props;
    const { styles } = useStyle();
    const { t } = useTranslation();

    // State
    const [isLunar, setIsLunar] = useState(showLunar);
    const [selectedPreset, setSelectedPreset] = useState<string>(_selectedPreset ?? '');

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

    const cellRender: RangePickerProps['cellRender'] = (date, info) => {
        if (!date || !dayjs.isDayjs(date)) return null;

        const lunarDate = Lunar.fromDate(date.toDate());
        const isWeekend = date.day() === 6 || date.day() === 0;

        const lunarMonth = lunarDate.getMonth();
        const lunarDay = lunarDate.getDay();

        if (info.type === 'date') {
            return cloneElement(info.originNode, {
                ...info.originNode.props,
                children: (
                    <div className="flex items-end gap-2 px-2 relative z-10">
                        {/* Normal date */}
                        <span
                            className={clsx({
                                [styles.weekend]: isWeekend,
                            })}
                        >
                            {date.get('date')}
                        </span>

                        {/* Lunar date */}
                        {isLunar && info.type === 'date' && (
                            <span
                                className={clsx('!text-[9px] relative top-[1px] lunar-date shrink-0', styles.lunar)}
                            >{`${lunarDay} ${lunarDay === 1 ? `/ ${lunarMonth}` : ''}`}</span>
                        )}
                    </div>
                ),
            });
        }

        // Show other type of cell
        return info.originNode;
    };

    const handleRangeChange: RangePickerProps['onChange'] = values => {
        if (!values) {
            setSelectedPreset('');
            onChange?.(values);
            return;
        }

        const selectedLabel = rangePresets
            ?.find(item => {
                return isSameRange(values as [Dayjs, Dayjs], item.value as [Dayjs, Dayjs]);
            })
            ?.label?.toString();
        setSelectedPreset(selectedLabel ?? '');
        onChange?.(values);
    };

    return (
        <Flex className={clsx('lunar-range-picker', className)} vertical>
            <RangePicker
                className="w-full rounded-lg"
                popupClassName="text-sm"
                locale={locale}
                placeholder={placeholder}
                format={formatDate ?? AppConfig.DateShortYearFormat}
                presets={rangePresets}
                defaultValue={defaultValue}
                onChange={handleRangeChange}
                getPopupContainer={getPopupContainer}
                cellRender={cellRender}
                renderExtraFooter={() => (
                    <div className="flex items-center gap-2 py-2 justify-end">
                        {t('Âm lịch')}
                        <Switch checked={isLunar} onChange={() => setIsLunar(!isLunar)} />
                    </div>
                )}
            />
        </Flex>
    );
};
