import { TourGitFormControl } from '@fragments/Tour/TourDetail/TourGit';
import { TourType } from '@src/types/TypeEnum';

export const TourGitForm: React.FC = () => {
    return <TourGitFormControl tourType={TourType.GIT} />;
};

