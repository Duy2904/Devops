import { currentPage, pageSize } from '@src/new/shared/types/BaseTypes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';

interface KeywordSearchProps {
    className?: string;
    placeholder?: string;
    showTitle?: boolean;
    title?: string;
}

export const KeywordSearch: React.FC<KeywordSearchProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const handleOnChange = useDebouncedCallback(data => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            keyword: data.target.value ?? undefined,
        });
    }, 500);

    return (
        <Input
            className={props.className}
            placeholder={props.placeholder}
            onChange={handleOnChange}
            defaultValue={tableParams.keyword}
            allowClear
            prefix={<FontAwesomeIcon className="text-greyColor-third" icon={faMagnifyingGlass} />}
        />
    );
};
