import { AutoComplete, Flex } from 'antd';
import { currentPage, pageSize } from '@utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { EmptyComponent } from '@components/common/Empty';
import isEmpty from 'lodash/isEmpty';
import { useDebouncedCallback } from 'use-debounce';
import { useGetListTourFitDebtDropdown } from './mutation';
import { useSearchTableStore } from '@store/searchTableStore';
import { useState } from 'react';
import { useTourFitAutoCompletedStore } from './dataStore';

interface OnSearchDebtProps {
    className?: string;
    title?: string;
    placeholder?: string;
    requestSearch?: AnyObject;
    isAgent?: boolean;
}

export const OnSearchDebt: React.FC<OnSearchDebtProps> = props => {
    const { className, title, placeholder, requestSearch, isAgent } = props;
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [isEmptyData, setIsEmptyData] = useState<boolean>(false);
    const { mutateAsync: getFetchFitDebtDataList } = useGetListTourFitDebtDropdown();

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
            fields: ['TourCode', 'TourName'],
            keyword: value,
        };

        delete requestSearch?.keyword;
        const request = { ...requestSearch, advancedSearch: advancedSearchKeyword, isAgent: isAgent };
        const res = await getFetchFitDebtDataList(request);
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
