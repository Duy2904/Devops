import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode, useMemo } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useFetchBranchs } from '@hooks/identity-next/queries/useBranch';

interface BranchSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    required?: boolean;
    disabled?: boolean;
    dataDefault?: { value: string; label: string };
}

export const BranchSelect: React.FC<BranchSelectProps> = props => {
    const { dataDefault } = props;
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
                placeholder={i18n.t('--Chọn Chi nhánh--')}
                options={
                    dataDefault
                        ? [dataDefault, ...(branchsOption?.filter(item => item.value !== dataDefault.value) ?? [])]
                        : branchsOption
                }
                loading={isLoading}
                disabled={props.disabled}
                allowClear
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
            required={props.required}
        />
    );
};
