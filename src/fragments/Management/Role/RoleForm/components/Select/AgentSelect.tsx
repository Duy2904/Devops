import { Select } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { useGetListGroupAgentDropdown } from '@hooks/queries/useGetAgent';
import FilterSearch from '@utils/filterSearch';

interface AgentSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    title?: string;
    showTitle?: boolean;
    disabled?: boolean;
    defaultSelected?: {
        value: string;
        label: string;
    }[];
}

export const AgentSelect: React.FC<AgentSelectProps> = props => {
    // State
    const [selectAgent, setSelectAgent] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);

    const { data, isLoading } = useGetListGroupAgentDropdown({});

    const agentArr = useMemo(() => data?.data ?? [], [data?.data]);

    useEffect(() => {
        const selectAgentTemp = agentArr?.map(agent => ({
            value: agent.id ?? '',
            label: `${agent.code} - ${agent.name}` ?? '',
        }));
        setSelectAgent(selectAgentTemp);
    }, [agentArr]);

    useEffect(() => {
        const selectAgentTemp = agentArr?.map(agent => ({
            value: agent.id ?? '',
            label: `${agent.code} - ${agent.name}` ?? '',
        }));
        setSelectAgent([
            ...(props.defaultSelected ?? []),
            ...selectAgentTemp.filter(item => item?.value !== props?.defaultSelected?.[0]?.value),
        ]);
    }, [agentArr, props.defaultSelected]);

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                options={selectAgent}
                loading={isLoading}
                placeholder="--Chọn đại lý--"
                disabled={props.disabled}
                filterOption={FilterSearch.filterOption}
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
            rules={props.rules}
            showTitle={props.showTitle}
            title={props.title}
        />
    );
};
