import { AutoComplete, Flex } from 'antd';
import { currentPage, pageSize } from '@src/new/shared/types/BaseTypes';

import { AnyObject } from 'antd/es/_util/type';
import { EmptyComponent } from '@src/new/components/common/Empty';
import isEmpty from 'lodash/isEmpty';
import { isEmptyString } from '@utils/formHelper';
import { useDebouncedCallback } from 'use-debounce';
import { useGetListTourFitDropdown } from './mutation';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { useState } from 'react';
import { useTourFitAutoCompletedStore } from './dataStore';

interface TourFitAutoCompleteProps {
    className?: string;
    title?: string;
    placeholder?: string;
    requestSearch?: AnyObject;
}

export const TourFitAutoComplete: React.FC<TourFitAutoCompleteProps> = props => {
    const { className, title, placeholder, requestSearch } = props;
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [isEmptyData, setIsEmptyData] = useState<boolean>(false);
    const { mutateAsync: getFetchDataList } = useGetListTourFitDropdown();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

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
            {!isEmptyString(title) && <p className="text-xs mb-2 font-medium">{title}</p>}
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
