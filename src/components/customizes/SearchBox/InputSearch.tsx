import { DebouncedState, useDebouncedCallback } from 'use-debounce';
import { Flex, Input } from 'antd';
import { currentPage, pageSize } from '../../../utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { useSearchTableStore } from '../../../store/searchTableStore';

interface InputSearchProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
    onChange?: DebouncedState<(data: AnyObject) => void>;
}

export const InputSearch = (props: InputSearchProps) => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const handleOnChange = useDebouncedCallback(data => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            keyword: data.target.value ?? undefined,
        });
    }, 500);

    return (
        <Flex className={props.className} vertical>
            {props?.showTitle && <p className="text-xs mb-2 font-medium">{props.title}</p>}
            <Input
                className="w-full"
                placeholder={props.placeholderContent}
                onChange={props?.onChange ? props?.onChange : handleOnChange}
                defaultValue={tableParams.keyword}
                allowClear
            />
        </Flex>
    );
};
