import { TourFitFormControl } from '@fragments/Tour/TourDetail/TourFit';
import { TourType } from '@src/types/TypeEnum';

export const TourFitForm: React.FC = () => {
    return <TourFitFormControl tourType={TourType.FIT} />;
};
