import { BaseSelect } from '../../../../../../components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode, useMemo } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useFetchBranchs } from '@hooks/identity-next/queries/useBranch';

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
    dataBranchDefault?: { label: string; value: string };
}

export const BranchSelect: React.FC<BranchSelectProps> = props => {
    const { dataBranchDefault } = props;
    const { data, isLoading } = useFetchBranchs({});
    const branchsOption = useMemo(
        () =>
            data?.data?.map(branch => ({
                value: branch.id ?? '',
                label: branch.name ?? '',
            })) ?? [],
        [data?.data],
    );

    const select = () => {
        return (
            <Select
                virtual={false}
                className="w-full"
                options={
                    dataBranchDefault
                        ? [
                              dataBranchDefault,
                              ...(branchsOption?.filter(item => item.value !== dataBranchDefault.value) ?? []),
                          ]
                        : branchsOption
                }
                loading={isLoading}
                filterOption={FilterSearch.filterOption}
                allowClear
                showSearch
            />
        );
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
