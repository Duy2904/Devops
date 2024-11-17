import 'dayjs/locale/vi';

import { DatePicker, DatePickerProps, Flex, Switch } from 'antd';
import { cloneElement, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@src/new/shared/utils/config';
import { Lunar } from 'lunar-typescript';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import clsx from 'clsx';
import { createStyles } from 'antd-style';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { useTranslation } from 'react-i18next';

type formatDateType = 'date' | 'dateTime' | 'shortDate';

interface BaseLunarDatePickerProps {
    className?: string;
    format?: formatDateType;
    placeholder?: string;
    size?: SizeType;
    disabled?: boolean;
    // eslint-disable-next-line no-unused-vars
    disabledDate?: (date: Dayjs) => boolean;
    // eslint-disable-next-line no-unused-vars
    onChange?: (data: dayjs.Dayjs | null) => void;
    showTime?: boolean | AnyObject;
    customDefaultValue?: dayjs.Dayjs;
    value?: dayjs.Dayjs;
    allowClear?: boolean;
    showLunar?: boolean;
}

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

export const LunarDatePicker: React.FC<BaseLunarDatePickerProps> = props => {
    const { styles } = useStyle();
    const { t } = useTranslation();

    // State
    const [isLunar, setIsLunar] = useState(props.showLunar);

    const customDefaultDate = props.customDefaultValue ?? undefined;

    const listFormat = [
        {
            key: 'date',
            value: AppConfig.DateFormat,
        },
        {
            key: 'dateTime',
            value: AppConfig.DateTimeFormat,
        },
        {
            key: 'shortDate',
            value: AppConfig.DateShortYearFormat,
        },
    ];

    const getPopupContainer = (trigger: HTMLElement) => {
        return trigger.parentNode as HTMLElement;
    };

    const cellRender: DatePickerProps['cellRender'] = (date, info) => {
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

    return (
        <Flex className="lunar-date-picker" vertical>
            <DatePicker
                className="w-full"
                locale={locale}
                placeholder={props.placeholder}
                format={listFormat.find(item => item.key == props.format)?.value}
                size={props.size}
                disabled={props.disabled}
                disabledDate={props.disabledDate}
                getPopupContainer={getPopupContainer}
                onChange={props.onChange}
                showTime={props.showTime}
                defaultPickerValue={customDefaultDate}
                value={props.value}
                allowClear={props.allowClear}
                renderExtraFooter={() => (
                    <div className="flex items-center text-xs gap-2 py-1 justify-end">
                        {t('Âm lịch')}
                        <Switch checked={isLunar} onChange={() => setIsLunar(!isLunar)} />
                    </div>
                )}
                cellRender={cellRender}
            />
        </Flex>
    );
};
