import { ReceivableVoucherDto, SearchReceivableVouchersRequest, VoucherStatus } from '@sdk/tour-operations';

import Format from '@utils/format';
import { ITableParamsType } from '@src/new/shared/types/Search';
import { SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';

export const mapSearchRequest = (params: ITableParamsType<ReceivableVoucherDto>): SearchReceivableVouchersRequest => {
    const convertDate = Format.formatSearchDate(
        params,
        dayjs().subtract(1, 'month').startOf('day').utc().toDate(),
        dayjs().endOf('day').utc().toDate(),
    );

    const request: SearchReceivableVouchersRequest = {
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        keyword: params.keyword,
        status: params.statuses ? (params.statuses as VoucherStatus[]) : [],
        fromDate: convertDate.fromDate,
        toDate: convertDate.toDate,
    };

    const sorter = params.sorter as SorterResult<ReceivableVoucherDto>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    } else {
        request.orderBy = ['CreatedOn Desc'];
    }
    return request;
};
