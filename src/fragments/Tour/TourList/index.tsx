import Can from '@components/common/Can';
import { FitTours } from './ListTourFit/FitTours';
import { GitTours } from './ListTourGit/GitTours';
import { SearchTour } from './Search/SearchTour';
import { TourListHeader } from './Header/TourListHeader';

type IndexTourListProps = {
    permission: string[];
    titleHeader: string;
    redirectUrl: string;
    permissionSearch: string[];
    isFitTour: boolean;
};

export const IndexTourList: React.FC<IndexTourListProps> = props => {
    return (
        <Can permissions={props.permission}>
            <div className="h-full">
                <TourListHeader title={props.titleHeader} redirectUrl={props.redirectUrl} isFitTour={props.isFitTour} />
                <div className="h-[calc(100vh_-_143px)] overflow-auto">
                    <SearchTour isFitTour={props.isFitTour} permission={props.permissionSearch} />
                    {props.isFitTour ? <FitTours /> : <GitTours />}
                </div>
            </div>
        </Can>
    );
};
