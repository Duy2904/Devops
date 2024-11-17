import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useGetCommissionTypeAgent, useGetCommissionTypeReferrer } from '../../../hooks/queries/useCommissionType';

import { AnyObject } from 'antd/es/_util/type';
import { BaseSelect } from './BaseSelect';
import FilterSearch from '../../../utils/filterSearch';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useCommissionTypeStore } from '../../../store/commisionTypeStore';

export type Commission = 'agent' | 'referrer';

interface OptionType {
    value: string;
    label: string;
}

interface CommissionTypeSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    type?: Commission;
    isDisableOption?: boolean;
    dataSelected?: AnyObject;
    initialValue?: string;
    disabled?: boolean;
    isForm?: boolean;
}

export const CommissionTypeSelect: React.FC<CommissionTypeSelectProps> = props => {
    const {
        agentTypes,
        referrerTypes,
        selectAgentType,
        selectReferrerType,
        actions: { setAgentType, setReferrerType },
    } = useCommissionTypeStore(state => state);
    const { mutateAsync: getCommissionTypeAgent } = useGetCommissionTypeAgent();
    const { mutateAsync: getCommissionTypeReferrer } = useGetCommissionTypeReferrer();

    const [countAgent, setCountAgent] = useState<number>(0);
    const [countReferrer, setCountReferrer] = useState<number>(0);

    const fetchData = useCallback(async () => {
        if (props.type == 'agent') {
            if (agentTypes.length > 0) return;
            if (countAgent !== 0) return;
            const data = await getCommissionTypeAgent();
            setAgentType(data ?? []);
            setCountAgent(countAgent + 1);
        } else {
            if (referrerTypes.length > 0) return;
            if (countReferrer !== 0) return;
            const data = await getCommissionTypeReferrer();
            setReferrerType(data ?? []);
            setCountReferrer(countAgent + 1);
        }
    }, [
        props.type,
        agentTypes.length,
        countAgent,
        countReferrer,
        getCommissionTypeAgent,
        getCommissionTypeReferrer,
        referrerTypes.length,
        setAgentType,
        setReferrerType,
    ]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const data = props.type == 'agent' ? selectAgentType : selectReferrerType;

    const options: OptionType[] = props.isDisableOption
        ? data.map(option => ({
              ...option,
              disabled: props.dataSelected?.includes(option.value),
          }))
        : data;

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={props.type == 'agent' ? 'Đại lý' : 'Người giới thiệu'}
                options={options}
                filterOption={FilterSearch.filterOption}
                disabled={props.disabled}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            rules={props.rules}
            required={props.required}
            label={props.label}
            initialValue={props.initialValue}
            items={select()}
        />
    );
};
