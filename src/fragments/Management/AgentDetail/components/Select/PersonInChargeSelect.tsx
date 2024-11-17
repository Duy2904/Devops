import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useFetchEmployeesDropdown } from '@fragments/Management/Agent/hooks/queries';

interface PersonInChargeSelectProps {
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

export const PersonInChargeSelect: React.FC<PersonInChargeSelectProps> = props => {
    const { data, isLoading } = useFetchEmployeesDropdown();

    const resOpts: { value: string; label: string }[] =
        data?.map(item => {
            return { value: `${item.id}`, label: `${item.name} - ${item.phone}` };
        }) ?? [];

    const select = () => {
        return <Select virtual={false} className="w-full" options={resOpts} loading={isLoading} />;
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
