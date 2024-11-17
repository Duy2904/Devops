import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { rootPathsNew } from '@src/routers/newRoute';

export interface SlugTitleProps {
    refundId?: string;
}

export const SlugTitle: React.FC<SlugTitleProps> = props => {
    const slug = [
        {
            name: i18n.t('Chứng từ thanh toán'),
            slug: '',
        },
        {
            name: i18n.t('menu.refundVoucher'),
            slug: rootPathsNew.refundList,
        },
        {
            name: `${props.refundId ? i18n.t('Chỉnh sửa') : i18n.t('Thêm mới')}`,
            slug: `${props.refundId ? rootPaths.refundVoucherForm + props.refundId : rootPaths.refundVoucherForm}`,
        },
    ];

    return <SlugHeader slugList={slug} />;
};
