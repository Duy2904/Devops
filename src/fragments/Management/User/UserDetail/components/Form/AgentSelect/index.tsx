import { Select } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useGetListGroupAgentDropdown } from '@hooks/queries/useGetAgent';
import FilterSearch from '@utils/filterSearch';

interface AgentSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    required?: boolean;
    defaultSelected?: {
        value: string;
        label: string;
    }[];
    onChange?: () => void;
    disabled?: boolean;
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
    const { data: fetchPersonalInfo } = useFetchPersonalIdentityInfo();

    const agentArr = useMemo(() => data?.data?.filter(item => item.isActive) ?? [], [data?.data]);

    useEffect(() => {
        const idExclude = [fetchPersonalInfo?.groups?.[0]?.groupId, props.defaultSelected?.[0]?.value];
        const selectAgentTemp = agentArr?.map(agent => ({
            value: agent.id ?? '',
            label: `${agent.code} - ${agent.name}` ?? '',
        }));
        setSelectAgent([
            ...(props.defaultSelected ?? []),
            ...selectAgentTemp.filter(item => !idExclude.includes(item.value)),
        ]);
    }, [agentArr, fetchPersonalInfo?.groups, props.defaultSelected]);

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                options={selectAgent}
                loading={isLoading}
                allowClear
                filterOption={FilterSearch.filterOption}
                placeholder="--Chọn đại lý--"
                onChange={props.onChange}
                disabled={props.disabled}
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
            required={props.required}
        />
    );
};
