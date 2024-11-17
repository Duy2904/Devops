import { TourType } from '@src/types/TypeEnum';
import { rootPaths } from '@src/routers/route';

export const getLinkQuoteForm = (tourType: TourType | undefined, id?: string) => {
    let href = '#';

    switch (tourType) {
        case TourType.GIT:
            if (id) {
                href = rootPaths.quoteGitForm + '/' + id;
            } else {
                href = rootPaths.quoteGitForm;
            }
            break;

        case TourType.FIT:
            if (id) {
                href = rootPaths.quoteFitForm + '/' + id;
            } else {
                href = rootPaths.quoteFitForm;
            }
            break;
    }

    return href;
};

export const getLinkQuoteList = (tourType: TourType | undefined) => {
    let href = '#';

    switch (tourType) {
        case TourType.GIT:
            href = rootPaths.quoteGitList;
            break;

        case TourType.FIT:
            href = rootPaths.quoteFitList;
            break;
    }

    return href;
};
