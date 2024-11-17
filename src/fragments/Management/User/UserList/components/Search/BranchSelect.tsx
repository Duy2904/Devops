import { ReactNode, useEffect, useMemo, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { LiteAgentDto } from '@sdk/identity-next/models';
import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import { Rule } from 'antd/es/form';
import { pageSize } from '@utils/filterSearch';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchBranchs } from '@hooks/identity-next/queries/useBranch';
import { useSearchTableStore } from '@store/searchTableStore';

interface BranchSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    title?: string;
    showTitle?: boolean;
}

export const BranchSelect: React.FC<BranchSelectProps> = props => {
    // State
    const [selectBranch, setSelectBranch] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data: fetchBranchs, isLoading } = useFetchBranchs({});

    const branchsArr: LiteAgentDto[] = useMemo(() => fetchBranchs?.data ?? [], [fetchBranchs?.data]);
    if (tableParams.pagination) {
        tableParams.pagination.total = fetchBranchs?.totalCount;
    }

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const branchIds = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: 1, pageSize: pageSize, showSizeChanger: true },
            branchIds: branchIds,
        });
    }, 500);

    useEffect(() => {
        const selectBranchTemp = branchsArr?.map(branch => ({
            value: branch.id ?? '',
            label: branch.name ?? '',
        }));
        setSelectBranch(selectBranchTemp);
    }, [branchsArr]);

    return (
        <MultiSelect
            className={props.className}
            showTitle={props?.showTitle}
            title={props.title}
            onChange={onChange}
            placeholder={'--Tất cả--'}
            defaultValue={tableParams.branchIds}
            options={selectBranch}
            isLoading={isLoading}
        />
    );
};
