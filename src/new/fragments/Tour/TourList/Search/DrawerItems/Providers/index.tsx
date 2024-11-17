import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '@src/new/components/customs/Selects/MultiSelect';
import { useGetTourProviders } from './useTourProvider';
interface TourProviderMultiSelectProps {
    className?: string;
    placeholderContent?: string;
    title?: string;
    providers?: string[];
    setProviders: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export const ProviderMultiSelect: React.FC<TourProviderMultiSelectProps> = props => {
    const { providers, setProviders } = props;

    const { data, isLoading } = useGetTourProviders();

    const onChange = (value: AnyObject) => {
        const valueSelected = value.flat();
        setProviders(valueSelected);
    };

    return (
        <MultiSelect
            className={props.className}
            title={props.title}
            onChange={onChange}
            isLoading={isLoading}
            placeholder={props.placeholderContent}
            options={data}
            values={providers}
        />
    );
};
