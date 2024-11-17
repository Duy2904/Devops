import { useEffect, useState } from 'react';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { Select } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useGetListUserApprovalSetting } from '../../hooks/useApprovalSetting';

interface SelectApproversProps {
    name?: string[];
    disable?: boolean;
    initialValue?: string;
    isRequired: boolean;
    dependencies?: string[] | undefined;
    className?: string;
    MAX_COUNT: number;
    totalApproval: number;
    approveName: string;
}

export const SelectApprovers: React.FC<SelectApproversProps> = props => {
    const { name, disable, initialValue, className, dependencies, isRequired, MAX_COUNT, totalApproval, approveName } =
        props;

    // state
    const [selectData, setSelectData] = useState<{ value: string; label: string }[]>([]);

    // query
    const { data: dataListApprovers, isLoading } = useGetListUserApprovalSetting();

    useEffect(() => {
        if (!isEmpty(dataListApprovers)) {
            const usersArr = dataListApprovers?.find(item => item.approverName === approveName)?.users;
            const tempDataFilter =
                usersArr?.map(item => ({
                    value: item.id ?? '',
                    label: item.fullName ?? '',
                })) ?? [];
            setSelectData(tempDataFilter);
        }
    }, [approveName, dataListApprovers]);

    const suffix = (
        <span>
            {totalApproval} / {MAX_COUNT}
        </span>
    );

    const select = () => {
        return (
            <Select
                mode="multiple"
                className="w-full"
                virtual={false}
                showSearch
                placeholder="--Chọn người duyệt--"
                optionFilterProp="children"
                filterOption={FilterSearch.filterOption}
                options={selectData}
                loading={isLoading}
                disabled={disable}
                maxCount={MAX_COUNT}
                suffixIcon={suffix}
            />
        );
    };

    return (
        <BaseSelect
            isForm
            name={name}
            rules={[{ required: isRequired, message: 'Vui lòng Chọn Người duyệt' }]}
            items={select()}
            initialValue={initialValue}
            disable={disable}
            dependencies={dependencies}
            className={className}
        />
    );
};
