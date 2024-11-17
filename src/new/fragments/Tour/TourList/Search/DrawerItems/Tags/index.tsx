import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '@src/new/components/customs/Selects/MultiSelect';
import { useGetTagsOnFilterPane } from './useTourTag';

interface TagMultiSelectProps {
    className?: string;
    placeholderContent?: string;
    title?: string;
    tags?: string[];
    setTags: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export const TagMultiSelect: React.FC<TagMultiSelectProps> = props => {
    const { tags, setTags } = props;

    const { data, isLoading } = useGetTagsOnFilterPane();

    const onChange = (value: AnyObject) => {
        const tagsSelected = value.flat();
        setTags(tagsSelected);
    };

    return (
        <MultiSelect
            className={props.className}
            title={props.title}
            onChange={onChange}
            isLoading={isLoading}
            placeholder={props.placeholderContent}
            options={data}
            values={tags}
        />
    );
};
