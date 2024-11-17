import { ReceivableVoucherApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';
import { AnyObject } from 'antd/es/_util/type';
import { useMutation } from 'react-query';

export const getReceivablesApi = () => {
    return new ReceivableVoucherApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchSaleOrderFromVoucher = (key: string) => {
    return useMutation([key], async (request: AnyObject) => {
        const response = await getReceivablesApi().receivableVoucherDropdown('root', request);
        return response.data;
    });
};
