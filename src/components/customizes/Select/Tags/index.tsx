import { currentPage, pageSize } from '@utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '../MultiSelect';
import { useDebouncedCallback } from 'use-debounce';
import { useGetTagsOnFilterPane } from './useTourTag';
import { useSearchTableStore } from '@store/searchTableStore';

interface TagMultiSelectProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
}

export const TagMultiSelect: React.FC<TagMultiSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data, isLoading } = useGetTagsOnFilterPane();

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const tags = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            tags,
        });
    }, 500);

    return (
        <MultiSelect
            className={props.className}
            showTitle={props?.showTitle}
            title={props.title}
            onChange={onChange}
            isLoading={isLoading}
            placeholder={props.placeholderContent}
            options={data}
            defaultValue={tableParams.tags}
        />
    );
};
