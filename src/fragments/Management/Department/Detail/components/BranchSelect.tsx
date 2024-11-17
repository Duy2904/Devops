import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { DepartmentDto } from '@sdk/tour-operations';
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
    title?: string;
    showTitle?: boolean;
    fetchData?: DepartmentDto;
    branchIdSelected?: string;
    onChange?: () => void;
}

export const BranchSelect: React.FC<BranchSelectProps> = props => {
    const { data, isLoading } = useFetchBranchs({});
    const branchsOption = useMemo(
        () =>
            data?.data?.map(branch => ({
                value: branch.id ?? '',
                label: branch.name ?? '',
            })) ?? [],
        [data?.data],
    );
    const dataOpt = props.fetchData
        ? [
              { value: `${props.fetchData?.branchId}`, label: `${props.fetchData?.branchName}` },
              ...(branchsOption?.filter(item => item.value !== props.fetchData?.branchId) ?? []),
          ]
        : branchsOption;

    const select = () => {
        return (
            <Select
                virtual={false}
                className="w-full"
                placeholder={i18n.t('--Chọn Chi nhánh--')}
                options={dataOpt}
                loading={isLoading}
                onChange={props.onChange}
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
