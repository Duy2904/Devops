import { AnyObject } from 'antd/es/_util/type';
import { TableParams } from '../types/SearchResponse';

export const getRangeCount = (tableParams: TableParams<AnyObject>, isEnd: boolean): number => {
    if (!tableParams.pagination?.current || !tableParams.pagination?.pageSize) return 1;

    if (isEnd) {
        const total = tableParams.pagination.total ?? 0;
        const maxItemCount = tableParams.pagination.current * tableParams.pagination.pageSize;
        return total > maxItemCount ? maxItemCount : total;
    }

    return (tableParams.pagination.current - 1) * tableParams.pagination.pageSize + 1;
};
