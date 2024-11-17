import { Select } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { useGetGroupBranchs } from '@hooks/identity-next/queries/useGroup';

interface BranchSelectProps {
    className?: string;
    name?: string[] | string;
    label?: ReactNode;
    isForm?: boolean;
    options: { label: string; value: string }[];
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
    initialValue?: string | null;
    rules?: Rule[];
}

export const BranchSelect: React.FC<BranchSelectProps> = props => {
    const { data, isLoading } = useGetGroupBranchs();

    const select = () => {
        return <Select virtual={false} className="w-full" options={data} loading={isLoading} />;
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            items={select()}
            initialValue={props.initialValue}
            rules={props.rules}
            label={props.label}
        />
    );
};
