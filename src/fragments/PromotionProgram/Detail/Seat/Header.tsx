import { HeadContent } from '@components/ui/HeadContent';
import { ReactNode } from 'react';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

interface HeaderSeatDetailProps {
    discountId?: string;
    buttonList?: ReactNode;
}

export const HeaderSeatDetail = (props: HeaderSeatDetailProps) => {
    const slug = [
        {
            name: i18n.t('Chương trình khuyến mãi'),
            slug: '',
        },
        {
            name: i18n.t('menu.promoteFromSeat'),
            slug: rootPaths.promoteBySeat,
        },
        {
            name: `${props.discountId ? i18n.t('Chỉnh sửa') : i18n.t('Thêm mới')}`,
            slug: `${props.discountId ? rootPaths.promoteBySeat + props.discountId : rootPaths.promoteBySeat}`,
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} />}
            titleContent={<TitleHeader title={props.discountId ? i18n.t(`Chỉnh sửa`) : i18n.t('Thêm mới')} />}
            buttonActionList={props.buttonList}
        />
    );
};
