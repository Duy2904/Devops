import { Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Rule } from 'antd/es/form';
import dayjs from 'dayjs';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useGetListTourGit } from '@fragments/Tour/hooks/useTourGit';
import { useSearchTableStore } from '@store/searchTableStore';

import { useTourSchedulesStore } from '../../../store/tourScheduleStore';
import { TableParams } from '../../../types/SearchResponse';
import FilterSearch, {
    filterAdvanceListTourFit,
    filterAdvanceListTourFitFromSODetail,
} from '../../../utils/filterSearch';
import { BaseSelect } from './BaseSelect';

interface TourGitSelectProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
    isForm?: boolean;
    name?: string[] | string;
    label?: ReactNode;
    rules?: Rule[];
    disabled?: boolean;
    initialValue?: string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
    isEdit: boolean;
    selectData: {
        value: string;
        label: string;
        disabled: boolean;
    }[];
    required?: boolean;
    allowClear?: boolean;
    forQuote?: boolean;
}

export const TourGitSelect = (props: TourGitSelectProps) => {
    const [localParamsSearch, setLocalParamsSearch] = useState<TableParams<AnyObject>>({});
    const {
        selectTourSchedules,
        actions: { setTourSchedules },
    } = useTourSchedulesStore(state => state);
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = (id: string) => {
        setSearchParams({
            ...tableParams,
            tourId: id,
        });
    };

    // query
    const { data: listTourFit, isLoading, isSuccess } = useGetListTourGit(localParamsSearch);

    // Events
    const returnParamsSearch = useCallback(
        async (value: string | null) => {
            const filters = props.showTitle
                ? filterAdvanceListTourFit()
                : filterAdvanceListTourFitFromSODetail(dayjs().toDate());
            const paramsSearch: TableParams<AnyObject> = {
                sorter: {
                    columnKey: 'CreatedOn',
                    order: 'descend',
                },
                advancedFilter: filters,
                keyword: value ?? undefined,
                fromDate: null,
                toDate: null,
                forQuote: props.forQuote,
            };
            setLocalParamsSearch(paramsSearch);
        },
        [props.forQuote, props.showTitle],
    );

    const onSearch = useDebouncedCallback((value: string) => {
        returnParamsSearch(value);
    }, 500);

    // Effects
    useEffect(() => {
        returnParamsSearch(null);
    }, [returnParamsSearch]);

    useEffect(() => {
        if (localParamsSearch && isSuccess) {
            setTourSchedules(listTourFit?.data ?? []);
        }
    }, [isSuccess, listTourFit?.data, setTourSchedules, localParamsSearch]);

    const select = () => {
        const selectData = props.isEdit ? props.selectData : [];

        return (
            <Select
                virtual={false}
                showSearch
                placeholder={props.placeholderContent}
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={FilterSearch.filterOption}
                onChange={props.onChange ? props.onChange : onChange}
                options={selectData?.length > 0 ? selectData : selectTourSchedules}
                disabled={props.disabled}
                value={!props.isForm ? tableParams.tourId : undefined}
                allowClear={props.allowClear ? props.allowClear : true}
                loading={isLoading}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            rules={props.rules}
            required={props.required}
            label={props.label}
            title={props.title}
            showTitle={props.showTitle}
            items={select()}
        />
    );
};
