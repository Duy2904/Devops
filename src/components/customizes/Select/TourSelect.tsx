import FilterSearch, {
    currentPage,
    filterAdvanceListTourFit,
    filterAdvanceListTourFitFromSODetail,
    pageSize,
} from '../../../utils/filterSearch';
import { ReactNode, useCallback, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { BaseSelect } from './BaseSelect';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { TableParams } from '../../../types/SearchResponse';
import dayjs from 'dayjs';
import { useDebouncedCallback } from 'use-debounce';
import { useGetListTourFitDropdown } from '@fragments/Tour/hooks/useTourFit';
import { useSearchTableStore } from '@store/searchTableStore';
import { useTourSchedulesStore } from '../../../store/tourScheduleStore';

interface TourFitSelectProps {
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

export const TourFitSelect = (props: TourFitSelectProps) => {
    const [dataDropdown, setDataDropdown] = useState<
        {
            value: string;
            label: string;
            disabled: boolean;
        }[]
    >([]);

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
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            tourId: id,
        });
    };

    // query
    const { mutateAsync: getFitDropdown, isLoading } = useGetListTourFitDropdown();

    // Events
    const returnParamsSearch = useCallback(
        async (value: string | null) => {
            if (value?.length == 0) {
                setDataDropdown([]);
                return;
            }

            const filters = props.showTitle
                ? filterAdvanceListTourFit()
                : filterAdvanceListTourFitFromSODetail(dayjs().toDate());
            const paramsSearch: TableParams<AnyObject> = {
                sorter: {
                    columnKey: 'CreatedOn',
                    order: 'descend',
                },
                pagination: {
                    pageSize: pageSize,
                    current: currentPage,
                },
                advancedFilter: props.forQuote ? undefined : filters,
                keyword: value ?? undefined,
                fromDate: null,
                toDate: null,
                forQuote: props.forQuote,
            };
            const res = await getFitDropdown(paramsSearch);
            if (res) {
                setTourSchedules(res.data ?? []);
                const tempData =
                    res.data?.map(tourSchedule => ({
                        value: `${tourSchedule.id}`,
                        label: `${tourSchedule.tourCode}-${tourSchedule.name}`,
                        disabled: false,
                    })) ?? [];
                setDataDropdown(tempData);
            }
        },
        [getFitDropdown, props.forQuote, props.showTitle, setTourSchedules],
    );

    const onSearch = useDebouncedCallback((value: string) => {
        returnParamsSearch(value);
    }, 500);

    const select = () => {
        const selectData = props.isEdit ? [...props.selectData, ...selectTourSchedules] : selectTourSchedules;
        return (
            <Select
                virtual={false}
                showSearch
                placeholder={props.placeholderContent}
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={FilterSearch.filterOption}
                onChange={props.onChange ? props.onChange : onChange}
                options={selectData ? selectData : dataDropdown}
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
