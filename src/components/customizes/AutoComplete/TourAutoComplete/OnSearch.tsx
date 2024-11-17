import { AutoComplete, Flex } from 'antd';
import { currentPage, pageSize } from '@utils/filterSearch';
import { useGetListTourFitDropdown, useGetListTourGitDropdown } from './mutation';

import { AnyObject } from 'antd/es/_util/type';
import { EmptyComponent } from '@components/common/Empty';
import isEmpty from 'lodash/isEmpty';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchTableStore } from '@store/searchTableStore';
import { useState } from 'react';
import { useTourFitAutoCompletedStore } from './dataStore';

interface OnSearchProps {
    className?: string;
    title?: string;
    placeholder?: string;
    requestSearch?: AnyObject;
    isGit?: boolean;
}

export const OnSearch: React.FC<OnSearchProps> = props => {
    const { className, title, placeholder, requestSearch, isGit } = props;
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [isEmptyData, setIsEmptyData] = useState<boolean>(false);
    const { mutateAsync: getFetchFitDataList } = useGetListTourFitDropdown();
    const { mutateAsync: getFetchGitDataList } = useGetListTourGitDropdown();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { labelName, setLabelName } = useTourFitAutoCompletedStore(state => state);

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (value.length == 0) {
            handleSelect(value);
            setIsEmptyData(false);
            return;
        }

        const advancedSearchKeyword = {
            fields: ['TourCode', 'Name'],
            keyword: value,
        };

        delete requestSearch?.keyword;
        const request = { ...requestSearch, advancedSearch: advancedSearchKeyword };
        const res = isGit ? await getFetchGitDataList(request) : await getFetchFitDataList(request);
        if (!isEmpty(res)) {
            setOptions(res);
        } else {
            setOptions([]);
            setIsEmptyData(true);
        }
    }, 500);

    const handleSelect = (label: string) => {
        const idSelected = label && options.find(option => option.label == label)?.value;
        setLabelName(label);
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            tourId: label ? idSelected : undefined,
        });
        setOptions([]);
    };

    return (
        <Flex className={className} vertical>
            <p className="text-xs mb-2 font-medium">{title}</p>
            <AutoComplete
                virtual={false}
                options={options.map(item => {
                    return { value: item.label };
                })}
                defaultValue={tableParams.tourId && labelName}
                onSelect={handleSelect}
                onSearch={handleSearch}
                placeholder={placeholder}
                notFoundContent={isEmptyData && <EmptyComponent />}
                allowClear
            />
        </Flex>
    );
};
