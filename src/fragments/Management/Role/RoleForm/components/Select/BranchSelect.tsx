import { AnyObject } from 'antd/es/_util/type';
import { Rule } from 'antd/es/form';
import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import { useFetchBranchs } from '@hooks/identity-next/queries/useBranch';
import { LiteAgentDto } from '@sdk/identity-next/models';
import { TableParams } from '@src/types/SearchResponse';
import { currentPage, pageSize } from '@utils/filterSearch';

interface BranchSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    title?: string;
    showTitle?: boolean;
    customTableParams: TableParams<AnyObject>;
    setCustomTableParams: Dispatch<SetStateAction<TableParams<AnyObject>>>;
}

export const BranchSelect: React.FC<BranchSelectProps> = props => {
    // State
    const [selectBranch, setSelectBranch] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);

    const { data: fetchBranchs, isLoading } = useFetchBranchs({});

    const branchsArr: LiteAgentDto[] = useMemo(() => fetchBranchs?.data ?? [], [fetchBranchs?.data]);
    if (props.customTableParams.pagination) {
        props.customTableParams.pagination.total = fetchBranchs?.totalCount;
    }

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const branchIds = value.flat();
        props.setCustomTableParams({
            ...props.customTableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
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
            defaultValue={props.customTableParams.status}
            options={selectBranch}
            isLoading={isLoading}
        />
    );
};
