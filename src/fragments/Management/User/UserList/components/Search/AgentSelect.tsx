import { AnyObject } from 'antd/es/_util/type';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import { useGetListGroupAgentDropdown } from '@hooks/queries/useGetAgent';
import { useSearchTableStore } from '@store/searchTableStore';
import { pageSize } from '@utils/filterSearch';

interface AgentSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    title?: string;
    showTitle?: boolean;
}

export const AgentSelect: React.FC<AgentSelectProps> = props => {
    const [selectAgent, setSelectAgent] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data, isLoading } = useGetListGroupAgentDropdown({});
    const agentsArr = useMemo(() => data?.data ?? [], [data?.data]);

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const agentIds = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: 1, pageSize: pageSize, showSizeChanger: true },
            groupIds: agentIds,
        });
    }, 500);

    useEffect(() => {
        const selectAgentTemp = agentsArr?.map(agent => ({
            value: agent.id ?? '',
            label: `${agent.code}-${agent.name}` ?? '',
        }));
        setSelectAgent(selectAgentTemp);
    }, [agentsArr]);

    return (
        <MultiSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            label={props.label}
            showTitle={props.showTitle}
            title={props.title}
            options={selectAgent}
            placeholder={'--Tất cả--'}
            onChange={onChange}
            isLoading={isLoading}
            defaultValue={tableParams.groupIds}
        />
    );
};
