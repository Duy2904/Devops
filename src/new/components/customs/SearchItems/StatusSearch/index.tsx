import { currentPage, pageSize } from '@src/new/shared/types/BaseTypes';

import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '../../Selects/MultiSelect';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';

interface StatusSearchProps {
    listStatus: { label: string; value: string }[];
    className?: string;
    placeholder?: string;
    showTitle?: boolean;
    title?: string;
    defaultValue?: string[];
}

export const StatusSearch = (props: StatusSearchProps) => {
    const { listStatus, className, placeholder, title, defaultValue } = props;
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const arrStatus = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            statuses: arrStatus,
        });
    }, 500);

    return (
        <MultiSelect
            className={className}
            title={title}
            onChange={onChange}
            placeholder={placeholder}
            defaultValue={tableParams.statuses ? tableParams.statuses : defaultValue}
            options={listStatus}
        />
    );
};
