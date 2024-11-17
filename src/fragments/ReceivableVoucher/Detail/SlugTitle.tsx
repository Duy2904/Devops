import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export interface SlugTitleProps {
    recId?: string;
}

export const SlugTitle: React.FC<SlugTitleProps> = props => {
    const slug = [
        {
            name: i18n.t('Chứng từ thanh toán'),
            slug: '',
        },
        {
            name: i18n.t('Phiếu thu'),
            slug: rootPaths.receivableVoucher,
        },
        {
            name: `${props.recId ? i18n.t('Chỉnh sửa') : i18n.t('Thêm mới')}`,
            slug: `${props.recId ? rootPaths.receivableVoucherForm + props.recId : rootPaths.receivableVoucherForm}`,
        },
    ];

    return <SlugHeader slugList={slug} />;
};
