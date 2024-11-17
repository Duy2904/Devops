import { Flex } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Dispatch, SetStateAction } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import i18n from '@src/i18n';
import { TableParams } from '@src/types/SearchResponse';
import { currentPage, pageSize } from '@utils/filterSearch';

import { BranchSelect } from '../../../Select/BranchSelect';
import { InputSearch } from './InputSearch';

interface SearchListAgentProps {
    customTableParams: TableParams<AnyObject>;
    setCustomTableParams: Dispatch<SetStateAction<TableParams<AnyObject>>>;
}

export const SearchListAgent: React.FC<SearchListAgentProps> = props => {
    const { customTableParams, setCustomTableParams } = props;
    const onChange = useDebouncedCallback(data => {
        setCustomTableParams({
            ...customTableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            advancedSearch: {
                fields: ['code', 'branchName', 'email', 'phoneNumber', 'systemId', 'name'],
                keyword: data.target.value ?? undefined,
            },
        });
    }, 500);

    return (
        <Flex className="py-5 flex-wrap" align="center" justify="space-between">
            <div className="w-full grid grid-cols-12 gap-4">
                <BranchSelect
                    className="w-full col-span-6 md:col-span-2"
                    title="Chi nhánh"
                    showTitle
                    customTableParams={customTableParams}
                    setCustomTableParams={setCustomTableParams}
                />
                <InputSearch
                    className="w-full col-span-6 md:col-span-3"
                    title="Từ khóa"
                    placeholderContent={i18n.t('Nhập mã hệ thống/mã đại lý/tên đại lý/email/sdt')}
                    showTitle
                    onChange={onChange}
                    customTableParams={customTableParams}
                    setCustomTableParams={setCustomTableParams}
                />
            </div>
        </Flex>
    );
};
