import { AnyObject } from 'antd/es/_util/type';
import { ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import { useFetchAgentStates } from '@hooks/identity-next/queries/useGroup';
import { useSearchTableStore } from '@store/searchTableStore';
import { pageSize } from '@utils/filterSearch';

interface ContractStatusSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    title?: string;
    showTitle?: boolean;
}

export const ContractStatusSelect: React.FC<ContractStatusSelectProps> = props => {
    // Query
    const { data } = useFetchAgentStates();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const arrStatus = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: 1, pageSize: pageSize, showSizeChanger: true },
            agentStates: arrStatus,
        });
    }, 500);

    return (
        <MultiSelect
            className={props.className}
            showTitle={props?.showTitle}
            title={props.title}
            onChange={onChange}
            placeholder={'--Tất cả--'}
            options={data ?? []}
            defaultValue={tableParams.agentStates}
        />
    );
};
