import { AnyObject } from 'antd/es/_util/type';
import { SorterResult } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd';

export interface TableParams<LiteAgentDto> {
    pagination?: TablePaginationConfig;
    advancedFilter?: AnyObject;
    sorter?: SorterResult<LiteAgentDto> | SorterResult<LiteAgentDto>[];
    keyword?: string;
    status?: string[];
}

export type TBranchForm = {
    name?: string;
    isActive?: boolean;
    address?: string;
    representative?: string;
    shortName?: string;
    phoneNumber?: string;
    taxCode?: string;
    email?: string;
    bankAccount?: string;
    website?: string;
    bankName?: string;
    note?: string;
};
