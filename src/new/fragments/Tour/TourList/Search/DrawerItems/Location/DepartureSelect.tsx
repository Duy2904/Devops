import { BaseSelect } from '@src/new/components/customs/Selects/BaseSelect';
import { Select } from 'antd';
import { filterOptions } from '@src/new/shared/utils/commons';
import { useFetchDepartureDropdown } from './useLocation';
import { useTranslation } from 'react-i18next';

interface DepartureSelectProps {
    className?: string;
    title?: string;
    departureId?: string;
    setDepartureId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const DepartureSelect: React.FC<DepartureSelectProps> = props => {
    const { departureId, setDepartureId } = props;
    const { data, isLoading } = useFetchDepartureDropdown();
    const { t } = useTranslation();

    const onChange = (value: string) => {
        setDepartureId(value);
    };

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={t('Tất cả địa điểm')}
                onChange={onChange}
                options={data}
                filterOption={filterOptions}
                allowClear
                loading={isLoading}
                value={departureId}
            />
        );
    };

    return <BaseSelect className={props.className} title={props.title} items={select()} />;
};
