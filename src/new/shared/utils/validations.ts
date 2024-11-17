import { AnyObject } from 'antd/es/_util/type';
import isEmpty from 'lodash/isEmpty';

export const isEmptyParams = (name: string, condition: AnyObject | string[] | undefined) => {
    const response = !isEmpty(condition) ? { [name]: condition } : {};
    return response;
};
