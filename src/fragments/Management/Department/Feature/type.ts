import { ActiveStatus } from '@sdk/tour-operations';
import { AnyObject } from 'antd/es/_util/type';
import { SorterResult } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd';

export interface TableParams<DepartmentDto> {
    pagination?: TablePaginationConfig;
    advancedFilter?: AnyObject;
    sorter?: SorterResult<DepartmentDto> | SorterResult<DepartmentDto>[];
    keyword?: string;
    status?: ActiveStatus[];
    branchIds?: string[];
}

export type TDepartmentForm = {
    name?: string;
    isActive?: boolean;
    branchId?: string;
    parentId?: string;
    employeeId?: string;
    note?: string;
};
