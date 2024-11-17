import { FormInstance, Rule } from 'antd/es/form';

import { OnForm } from '@components/customizes/AutoComplete/TourAutoComplete/OnForm';
import { ReactNode } from 'react';
import { pageSize } from '@utils/filterSearch';
import { useGetListTourGitDropdown } from '@components/customizes/AutoComplete/TourAutoComplete/mutation';

interface TourGitSearchProps {
    name?: string;
    label?: ReactNode;
    rules?: Rule[];
    placeholder?: string;
    dataSelected: { value: string; label: string; disable?: boolean }[];
    form?: FormInstance;
    // eslint-disable-next-line no-unused-vars
    handleSelectOutSide: (value: string) => void;
}

export const TourGitSearch: React.FC<TourGitSearchProps> = props => {
    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        isQuote: true,
        pageSize: pageSize,
    };
    const { mutateAsync: getFetchDataList, isLoading } = useGetListTourGitDropdown();

    return (
        <OnForm
            {...props}
            requestSearch={paramsSearch}
            hookOnChange={getFetchDataList}
            loading={isLoading}
            handleSelectOutSide={value => props.handleSelectOutSide(value)}
        />
    );
};
