import { TourFitAutoComplete } from '@src/new/components/customs/AutoComplete/TourFitAutoComplete';
import { pageSize } from '@src/new/shared/types/BaseTypes';

interface TourFitSearchSOProps {
    className?: string;
    title?: string;
    placeholder?: string;
}

export const TourFitSearchSO: React.FC<TourFitSearchSOProps> = props => {
    const { className, title, placeholder } = props;

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
    };

    return (
        <TourFitAutoComplete
            className={className}
            title={title}
            placeholder={placeholder}
            requestSearch={paramsSearch}
        />
    );
};
