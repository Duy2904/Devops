import { FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Dispatch, SetStateAction } from 'react';

import { TableParams } from '@src/types/SearchResponse';

import { SearchListAgent } from './ListAgent/Search';
import { TableList } from './ListAgent/Table';

interface FormListAgentProps {
    includeGroupIds: string[];
    form: FormInstance;
    customTableParams: TableParams<AnyObject>;
    setCustomTableParams: Dispatch<SetStateAction<TableParams<AnyObject>>>;
    setIncludeGroupIds: Dispatch<SetStateAction<string[]>>;
}

export const FormListAgent: React.FC<FormListAgentProps> = props => {
    const { includeGroupIds, form, customTableParams, setCustomTableParams, setIncludeGroupIds } = props;

    return (
        <>
            <SearchListAgent customTableParams={customTableParams} setCustomTableParams={setCustomTableParams} />
            <TableList
                includeGroupIds={includeGroupIds}
                form={form}
                customTableParams={customTableParams}
                setCustomTableParams={setCustomTableParams}
                setIncludeGroupIds={setIncludeGroupIds}
            />
        </>
    );
};
