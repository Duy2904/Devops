import { AutoComplete, Flex } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { pageSize } from '@src/new/shared/types/BaseTypes';
import { EmptyComponent } from '@src/new/components/common/Empty';
import { isEmptyString } from '@utils/formHelper';
import { useSearchTableStore } from '@store/searchTableStore';

import { useGetListAgentDropdown } from './mutation';

interface AgentAutoCompleteProps {
    className?: string;
    title?: string;
    placeholder?: string;
}

const requestSearch = {
    sorter: {
        columnKey: 'CreatedOn',
        order: 'descend',
    },
    pageSize: pageSize,
};

export const AgentAutoComplete: React.FC<AgentAutoCompleteProps> = props => {
    const { className, title, placeholder } = props;
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [isEmptyData, setIsEmptyData] = useState<boolean>(false);
    const { mutateAsync: getFetchDataList } = useGetListAgentDropdown();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (value.length == 0) {
            handleSelect(value);
            setIsEmptyData(false);
            return;
        }
        const advancedSearchKeyword = {
            fields: ['Code', 'Name'],
            keyword: value,
        };
        const request = { ...requestSearch, advancedSearch: advancedSearchKeyword };
        const res = await getFetchDataList(request);
        if (!isEmpty(res)) {
            setOptions(res);
        } else {
            setOptions([]);
            setIsEmptyData(true);
        }
    }, 500);

    const handleSelect = (label: string) => {
        const idSelected = label && options.find(option => option.label == label)?.value;
        setSearchParams({
            ...tableParams,
            pagination: { current: 1, pageSize: pageSize, showSizeChanger: true },
            groupIds: label ? [idSelected ?? ''] : undefined,
        });
        setOptions([]);
    };

    return (
        <Flex className={className} vertical>
            {!isEmptyString(title) && <p className="text-xs mb-2 font-medium">{title}</p>}
            <AutoComplete
                virtual={false}
                options={options.map(item => {
                    return { value: item.label };
                })}
                onSelect={handleSelect}
                onSearch={handleSearch}
                placeholder={placeholder}
                notFoundContent={isEmptyData && <EmptyComponent />}
                allowClear
            />
        </Flex>
    );
};
