import { AnyObject } from 'antd/es/_util/type';
import isEmpty from 'lodash/isEmpty';
import { ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import i18n from '@src/i18n';
import { useSearchTableStore } from '@store/searchTableStore';
import { pageSize } from '@utils/filterSearch';

interface AgentAccountSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    title?: string;
    showTitle?: boolean;
    groupId: string;
}

const data = [
    {
        value: 'true',
        label: i18n.t(`agentStatus.true`),
    },
    {
        value: 'false',
        label: i18n.t(`agentStatus.false`),
    },
];

export const AgentAccountSelect: React.FC<AgentAccountSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const arrStatus = value.flat();
        if (isEmpty(arrStatus)) {
            delete tableParams?.advancedFilter?.agentAccountStatus;
        }
        setSearchParams({
            ...tableParams,
            pagination: { current: 1, pageSize: pageSize, showSizeChanger: true },
            advancedFilter: {
                ...tableParams.advancedFilter,
                ...(!isEmpty(arrStatus) ? { agentAccountStatus: arrStatus } : {}),
            },
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
            defaultValue={tableParams?.advancedFilter?.agentAccountStatus}
        />
    );
};
