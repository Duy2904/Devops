import { ButtonQuoteList } from './Button';
import { HeadContent } from '@components/ui/HeadContent';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import { TourType } from '@src/types/TypeEnum';
import { getLinkQuoteList } from '@fragments/Quote/features/getLink';
import i18n from '@src/i18n';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';

export const HeaderQuoteList = () => {
    // Store
    const { tourType } = useQuoteStore(state => state);

    const slug = [
        {
            name: tourType === TourType.GIT ? i18n.t('menu.tourGit') : i18n.t('menu.tourFit'),
            slug: '',
        },
        {
            name: i18n.t('menu.quote'),
            slug: getLinkQuoteList(tourType),
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} showUpdated />}
            titleContent={<TitleHeader title={`${i18n.t('Danh sách')} ${i18n.t('menu.quote')}`} />}
            buttonActionList={<ButtonQuoteList />}
        />
    );
};
