import { AnyObject, GetProp } from 'antd/es/_util/type';
import { FormInstance, Upload, UploadProps, message } from 'antd';

import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const Pattern = {
    decimal8: /^-?\d{1,20}(\.\d{1,8})?$/,
    decimal3: /^-?\d{1,25}(\.\d{1,3})?$/,
};

export const convertValues = (values?: { [x: string]: { [y: string]: string } }) => {
    if (!values || isEmpty(values) || !values.id) return [];
    const keys = Object.keys(values.id);
    const result = keys.map(key => {
        const obj: AnyObject = {};
        Object.keys(values).forEach(prop => {
            obj[prop] = values[prop][key];
        });
        return obj;
    });
    return result;
};

export const removeID = (formData: AnyObject[], defaultID: string) => {
    const dataList = formData.map(item => {
        if (item?.id?.startsWith(defaultID)) {
            delete item.id;
        }
        return item;
    });

    return dataList;
};

export const transformDataForm = (form: FormInstance, defaultID?: string) => {
    const dataForm = form.getFieldsValue();
    if (!isEmpty(dataForm) && !isNil(dataForm)) {
        const convertData = convertValues(dataForm);
        let data = [...convertData];
        if (isString(defaultID)) {
            data = removeID(convertData, defaultID);
        }
        return data;
    }
    return [];
};

const checkFileMimeType = (file: FileType, validMimeTypes: string[], mimeTypeObj: AnyObject): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
            const header = Array.from(arr)
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('');

            const mimeType = mimeTypeObj[header];
            resolve(validMimeTypes.includes(mimeType));
        };
        reader.readAsArrayBuffer(file);
    });
};

export const beforeUploadAvatar = async (file: FileType) => {
    const validMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const mimeType = {
        '89504e47': 'image/png',
        ffd8ffe0: 'image/jpeg',
        ffd8ffe1: 'image/jpeg',
        ffd8ffe2: 'image/jpeg',
        ffd8ffe3: 'image/jpeg',
        ffd8ffe8: 'image/jpeg',
    };
    const isValidMimeType = await checkFileMimeType(file, validMimeTypes, mimeType);
    if (!isValidMimeType) {
        message.error(`${file.name} không phải là file .png, .jpeg hoặc .jpg`);
    }
    return isValidMimeType || Upload.LIST_IGNORE;
};

export const beforeUploadDocuments = async (files: FileType[]) => {
    const validMimeTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const mimeType = {
        '89504e47': 'image/png',
        ffd8ffe0: 'image/jpeg',
        ffd8ffe1: 'image/jpeg',
        ffd8ffe2: 'image/jpeg',
        ffd8ffe3: 'image/jpeg',
        ffd8ffe8: 'image/jpeg',
        '25504446': 'application/pdf',
        d0cf11e0: 'application/msword',
        '504b0304': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    const isValidMimeType = await Promise.all(files.map(file => checkFileMimeType(file, validMimeTypes, mimeType)));
    const allValid = isValidMimeType.every(valid => valid);
    if (!allValid) {
        message.error('Bạn chỉ có thể tải lên tệp .pdf, .docx, .png, .jpg, .jpeg');
    }
    return allValid;
};

export const isEmptyString = (str: string | null | undefined) => {
    return !str || str === '';
};

export const convertCheckedFormToArray = (listPermission: AnyObject) => {
    if (isEmpty(listPermission)) return [];
    return Object.keys(listPermission).filter(key => listPermission[key] === true) ?? [];
};

export const calculateRemainingDays = (endDate: Date | null | undefined) => {
    if (!endDate) return 0;

    if (dayjs(endDate).diff(dayjs(), 'days') == 0 && dayjs(endDate).diff(dayjs()) > 0) {
        return 0;
    } else if (dayjs(endDate).diff(dayjs(), 'days') == 0 && dayjs(endDate).diff(dayjs()) < 0) {
        return -1;
    }

    return dayjs(endDate).diff(dayjs(), 'days');
};
