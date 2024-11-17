import { AnyObject } from 'antd/es/_util/type';
import dayjs from 'dayjs';
import i18n from '@src/i18n';

export enum TypeContent {
    // eslint-disable-next-line no-unused-vars
    example = 'example',
    // eslint-disable-next-line no-unused-vars
    preview = 'preview',
}

export type valueSelect = {
    value: string;
    label: string;
};

type valuePreview = {
    id: string;
    prefix: string;
    prefix2: string;
    maxLength: number;
    formatDate: string;
    separation: string;
};

export const listTypeDate = () => {
    const typeDate = ['ddmmyyyy', 'ddMMyy', 'yyyymmdd', 'yymmdd', 'mmyy', 'mmyyyy', 'yymm', 'yyyymm'];
    const dataList: valueSelect[] = typeDate.map(item => {
        return {
            value: item,
            label: item,
        };
    });
    return dataList;
};

export const listSeparator = () => {
    const typeSeperator = ['-', '/', '.'];
    const dataList: valueSelect[] = typeSeperator.map(item => {
        return {
            value: item,
            label: item,
        };
    });
    return dataList;
};

const generateString = (inputNumber: number, character: string): string => {
    return character.repeat(inputNumber);
};
const generateContent = (inputNumber: number): string => {
    return inputNumber?.toString().padStart(inputNumber, '0');
};

export const generateData = (values: AnyObject, type: TypeContent): string => {
    const dataFetch = values as valuePreview; // Assuming valuePreview is the type of dataFetch
    const arrData: string[] = [];

    if (dataFetch?.prefix) arrData.push(type == TypeContent.preview ? '[prefix]' : dataFetch?.prefix);
    if (dataFetch?.prefix2) arrData.push(type == TypeContent.preview ? '[prefix2]' : dataFetch?.prefix2);
    arrData.push(
        type == TypeContent.preview ? generateString(dataFetch?.maxLength, 'x') : generateContent(dataFetch?.maxLength),
    ); // Ensure generateString result is not undefined
    if (dataFetch?.formatDate)
        arrData.push(
            type == TypeContent.preview ? dataFetch.formatDate : dayjs().format(dataFetch?.formatDate?.toUpperCase()),
        );

    return arrData.filter(item => item !== '').join(dataFetch?.separation ?? '');
};

export const ruleValidateText = () => {
    return [
        {
            pattern: /^[A-Z0-9]+$/,
            message: i18n.t('validation.default.errorValue'),
        },
    ];
};
