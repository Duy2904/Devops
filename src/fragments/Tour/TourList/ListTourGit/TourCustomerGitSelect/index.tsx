import FilterSearch, { currentPage, pageSize } from '@utils/filterSearch';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useGetCustomerOnFilterTourGit } from '@fragments/Tour/hooks/useTourGit';
import { useSearchTableStore } from '@store/searchTableStore';

interface TourCustomerGitSelectProps {
    className?: string;
    title?: string;
    showTitle?: boolean;
}

export const TourCustomerGitSelect: React.FC<TourCustomerGitSelectProps> = props => {
    const { data, isLoading } = useGetCustomerOnFilterTourGit();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            customerId: value,
        });
    };

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Chọn đối tượng--')}
                onChange={onChange}
                options={data}
                filterOption={FilterSearch.filterOption}
                allowClear
                loading={isLoading}
                value={tableParams.customerId}
            />
        );
    };

    return <BaseSelect className={props.className} showTitle={props?.showTitle} title={props.title} items={select()} />;
};
