import { useMemo } from 'react';

import { getLinkQuoteForm, getLinkQuoteList } from '@fragments/Quote/features/getLink';
import { SlugHeader } from '@components/ui/Slug';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';

export interface SlugTitleProps {
    quoteId: string;
}

export const SlugTitle: React.FC<SlugTitleProps> = props => {
    const { quoteId } = props;

    const { tourType } = useQuoteStore(state => state);

    const slug = useMemo(
        () => [
            {
                name: 'Danh sách chiết tính giá',
                slug: tourType ? getLinkQuoteList(tourType) : '',
            },
            {
                name: `${quoteId ? 'Chỉnh sửa' : 'Thêm mới'}`,
                slug: tourType ? getLinkQuoteForm(tourType, quoteId) : '',
            },
        ],
        [quoteId, tourType],
    );

    return <SlugHeader slugList={slug} />;
};
