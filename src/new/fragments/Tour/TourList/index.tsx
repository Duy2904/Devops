import Can from '@components/common/Can';
import { FitTours } from './ListTourFit';
import { GitTours } from './ListTourGit/GitTours';
import { SearchTourFit } from './Search/SearchTourFit';
import { TourListHeader } from './Header/TourListHeader';

type IndexTourListProps = {
    permission: string[];
    titleHeader: string;
    redirectUrl: string;
    isFitTour: boolean;
};

export const IndexTourList: React.FC<IndexTourListProps> = props => {
    return (
        <Can permissions={props.permission}>
            <div className="h-full">
                <TourListHeader title={props.titleHeader} redirectUrl={props.redirectUrl} isFitTour={props.isFitTour} />
                {props.isFitTour && <SearchTourFit />}
                <div className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                    {props.isFitTour ? <FitTours /> : <GitTours />}
                </div>
            </div>
        </Can>
    );
};
