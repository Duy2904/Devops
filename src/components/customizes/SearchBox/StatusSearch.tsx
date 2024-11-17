import { AnyObject } from 'antd/es/_util/type';
import { useDebouncedCallback } from 'use-debounce';

import { useSearchTableStore } from '../../../store/searchTableStore';
import { pageSize } from '../../../utils/filterSearch';
import { MultiSelect } from '../Select/MultiSelect';

interface StatusSearchProps {
    listStatus: { label: string; value: string }[];
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
}

export const StatusSearch = (props: StatusSearchProps) => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const arrStatus = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: 1, pageSize: pageSize, showSizeChanger: true },
            status: arrStatus,
        });
    }, 500);

    return (
        <MultiSelect
            className={props.className}
            showTitle={props?.showTitle}
            title={props.title}
            onChange={onChange}
            placeholder={props.placeholderContent}
            defaultValue={tableParams.status}
            options={props.listStatus}
        />
    );
};
