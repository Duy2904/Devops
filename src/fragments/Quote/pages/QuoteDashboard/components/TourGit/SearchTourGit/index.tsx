import { OnSearch } from '@components/customizes/AutoComplete/TourAutoComplete/OnSearch';
import { pageSize } from '@utils/filterSearch';

interface SearchTourGitProps {
    className?: string;
    title?: string;
    placeholder?: string;
}

export const SearchTourGit: React.FC<SearchTourGitProps> = props => {
    const { className, title, placeholder } = props;

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
    };

    return (
        <OnSearch className={className} title={title} placeholder={placeholder} requestSearch={paramsSearch} isGit />
    );
};
