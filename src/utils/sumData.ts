import { AnyObject } from 'antd/es/_util/type';
interface CountObject {
    [key: string]: number;
}

export const sumData = (values: AnyObject) => {
    const countObject: CountObject = {};

    for (const key in values) {
        const value = values[key];
        if (!(value in countObject)) {
            countObject[value] = 1;
        } else {
            countObject[value]++;
        }
    }
    const resultArray = Object.entries(countObject).map(([key, value]) => ({
        key,
        value,
    }));
    return resultArray;
};

export const mapRoom = (roomType: AnyObject, roomNumber: AnyObject) => {
    const resultObject: { [key: string]: number[] } = {};

    for (const [key, valueFromObject2] of Object.entries(roomType)) {
        if (Object.prototype.hasOwnProperty.call(roomNumber, key)) {
            resultObject[valueFromObject2] = (resultObject[valueFromObject2] || []).concat(roomNumber[key]);
        }
    }

    const result: { key: string; value: number }[] = Object.entries(resultObject).map(([key, values]) => ({
        key,
        value: [...new Set(values)].length,
    }));

    return result;
};
