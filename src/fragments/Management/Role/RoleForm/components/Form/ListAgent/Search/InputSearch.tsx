import { Flex, Input } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Dispatch, SetStateAction } from 'react';
import { DebouncedState, useDebouncedCallback } from 'use-debounce';

import { TableParams } from '@src/types/SearchResponse';

interface InputSearchProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
    onChange?: DebouncedState<(data: AnyObject) => void>;
    customTableParams: TableParams<AnyObject>;
    setCustomTableParams: Dispatch<SetStateAction<TableParams<AnyObject>>>;
}

export const InputSearch = (props: InputSearchProps) => {
    const handleOnChange = useDebouncedCallback(data => {
        props.setCustomTableParams({
            ...props.customTableParams,
            pagination: { current: 1, pageSize: props.customTableParams.pagination?.pageSize, showSizeChanger: true },
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
                defaultValue={props.customTableParams.keyword}
                allowClear
            />
        </Flex>
    );
};
