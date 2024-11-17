import { Form, Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Rule } from 'antd/es/form';
import isEmpty from 'lodash/isEmpty';
import { ReactNode, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { EmptyComponent } from '@components/common/Empty';
import FilterSearch from '@utils/filterSearch';

interface AgentOnFormProps {
    className?: string;
    label?: ReactNode;
    name?: string | string[];
    rules?: Rule[];
    placeholder?: string;
    dataSelected: { value: string; label: string; disabled?: boolean }[];
    requestSearch?: AnyObject;
    initialValue?: string;
    disabled?: boolean;
    multiple?: boolean;
    loading?: boolean;
    // eslint-disable-next-line no-unused-vars
    handleSelectOutSide?: (value: string) => void;
    // eslint-disable-next-line no-unused-vars
    hookOnChange: (params: AnyObject) => Promise<
        {
            value: string;
            label: string;
            dataAll?: AnyObject;
            disabled?: boolean;
        }[]
    >;
}

export const AgentOnForm: React.FC<AgentOnFormProps> = props => {
    const {
        className,
        label,
        name,
        rules,
        placeholder,
        dataSelected,
        requestSearch,
        initialValue,
        disabled,
        multiple,
        loading,
        handleSelectOutSide,
        hookOnChange,
    } = props;
    const [options, setOptions] = useState<{ value: string; label: string; disable?: boolean }[]>([]);
    const [isEmptyData, setIsEmptyData] = useState<boolean>(false);
    const [optionsGroupDataSelected, setOptionsGroupDataSelected] = useState<
        { value: string; label: string; disabled?: boolean }[]
    >([]);

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
        delete requestSearch?.keyword;
        const res = await hookOnChange({ ...requestSearch, advancedSearch: advancedSearchKeyword });
        if (!isEmpty(res)) {
            setOptions(res);
        } else {
            setIsEmptyData(true);
        }
    }, 500);

    const handleSelect = (value: string) => {
        value && handleSelectOutSide && handleSelectOutSide(value);
        setOptions([]);
    };

    useEffect(() => {
        const data = [...dataSelected, ...options].filter(
            (value, index, self) => index === self.findIndex(t => t.value === value.value),
        );
        setOptionsGroupDataSelected(data);
    }, [dataSelected, options]);

    return (
        <Form.Item
            className={className}
            label={label}
            name={name}
            rules={rules}
            initialValue={initialValue ?? undefined}
        >
            <Select
                mode={multiple ? 'multiple' : undefined}
                filterOption={FilterSearch.filterOption}
                options={optionsGroupDataSelected}
                onSearch={handleSearch}
                onSelect={handleSelect}
                placeholder={placeholder}
                virtual={false}
                disabled={disabled}
                loading={loading}
                notFoundContent={isEmptyData && <EmptyComponent />} // disable Dropdown if haven't options
                showSearch
                allowClear
            />
        </Form.Item>
    );
};
