import { BaseSelect } from '@src/new/components/customs/Selects/BaseSelect';
import { Select } from 'antd';
import { filterOptions } from '@src/new/shared/utils/commons';
import { useFetchDestinationDropdown } from './useLocation';
import { useTranslation } from 'react-i18next';

interface DestinationSelectProps {
    className?: string;
    title?: string;
    destinationId?: string;
    setDestinationId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const DestinationSelect: React.FC<DestinationSelectProps> = props => {
    const { destinationId, setDestinationId } = props;
    const { data, isLoading } = useFetchDestinationDropdown();
    const { t } = useTranslation();

    const onChange = (value: string) => {
        setDestinationId(value);
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
                value={destinationId}
            />
        );
    };

    return <BaseSelect className={props.className} title={props.title} items={select()} />;
};
