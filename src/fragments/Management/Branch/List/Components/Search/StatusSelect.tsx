import FilterSearch, { currentPage, pageSize } from '@utils/filterSearch';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { PositionType } from './Feature';
import { ReactNode } from 'react';
import { Select } from 'antd';
import { useSearchTableStore } from '@store/searchTableStore';

interface StatusSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    title?: string;
    showTitle?: boolean;
}

export const StatusSelect: React.FC<StatusSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            status: value ? [value] : undefined,
        });
    };

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                allowClear
                className="w-full"
                options={[]}
                filterOption={FilterSearch.filterOption}
                placeholder={'--Tất cả--'}
                onChange={onChange}
                value={tableParams.status?.[0]}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            label={props.label}
            items={select()}
            initialValue={PositionType.Boss}
            showTitle={props.showTitle}
            title={props.title}
        />
    );
};
