import { AnyObject } from 'antd/es/_util/type';
import { SorterResult } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd';
import { VoucherStatus } from '@sdk/tour-operations';

export interface TableParams<ReceivableVoucherDto> {
    pagination?: TablePaginationConfig;
    advancedFilter?: AnyObject;
    sorter?: SorterResult<ReceivableVoucherDto> | SorterResult<ReceivableVoucherDto>[];
    keyword?: string;
    fromDate?: Date | null;
    toDate?: Date | null;
    saleOrderIds?: string[];
    status?: VoucherStatus[];
}
