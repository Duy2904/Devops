import { AnyObject } from 'antd/es/_util/type';
import dayjs from 'dayjs';
import i18n from '@src/i18n';

class Format {
    public static formatNumber(value: number | undefined) {
        if (!value) return 0;
        if (value) {
            return new Intl.NumberFormat('en-US').format(value);
        }
    }

    public static readonly formatNumberPhone = (value: string, char?: string) => {
        if (value == null) return 0;
        if (value.length > 12) return value.substring(0, 12);
        const _char = char ?? ' ';
        // format string to number inputss
        const cleaned = ('' + value).replace(/\D/g, '');
        const normValue = `${cleaned.substring(0, 3)}${cleaned.length > 2 ? _char : ''}${cleaned.substring(3, 6)}${
            cleaned.length > 5 ? _char : ''
        }${cleaned.substring(6, 10)}`;
        return normValue;
    };

    /**
     * @param number f: number to format
     * @param integer n: length of decimal after point
     * @param integer x: length of sections = 3
     */
    public static formatMoney(f: string, n: number, x: string): string {
        const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return parseFloat(f).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    }

    public static formatStringNoAccentsUppercase(value: string): string {
        const re = /[\u0300-\u036f]/g;
        const regex = /\S+\s*$/;
        const normalizedValue = value.normalize('NFD').replace(re, '').toUpperCase().trim();

        const match = regex.exec(normalizedValue);
        return match ? match[0] : '';
    }

    public static removeDiacriticsAndNonAlphanumeric(str: string): string {
        const withoutDiacritics = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const alphanumericOnly = withoutDiacritics.replace(/[^a-zA-Z0-9]/g, '');
        return alphanumericOnly;
    }

    public static formatUTCTime(dateTime: string | undefined, formatTime?: string | undefined) {
        return dayjs(dateTime?.endsWith('Z') || dateTime?.endsWith('+07:00') ? dateTime : `${dateTime}Z`).format(
            formatTime,
        );
    }

    public static formatExportExcelTitle(titleName: string, searchRequest?: AnyObject) {
        if (searchRequest) {
            let searchTitle = '';

            if (searchRequest.fromDate && searchRequest.toDate) {
                searchTitle = `${dayjs(searchRequest.fromDate).format('DDMMYYYY')}-${dayjs(searchRequest.toDate).format(
                    'DDMMYYYY',
                )}`;
            } else {
                searchTitle = i18n.t('all');
            }

            const currentDate = dayjs().format('DDMMYYYY');
            return `${titleName}_${searchTitle}_${currentDate}.xlsx`;
        } else {
            return titleName;
        }
    }

    public static formatNegativeNumber(value: number | undefined | null) {
        if (value == 0) {
            return '0';
        } else if (!value) {
            return '-';
        }

        return value >= 0 ? Format.formatNumber(value ?? 0) : `(${Format.formatNumber(Math.abs(value))})`;
    }

    public static formatSortListByOrder(listData?: AnyObject) {
        return listData && listData.length > 0 ? listData.sort((a: AnyObject, b: AnyObject) => a.order - b.order) : [];
    }
}

export default Format;
