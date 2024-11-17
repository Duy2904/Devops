import { SlugHeader } from '@components/ui/Slug';
import { rootPaths } from '@src/routers/route';
import { useMemo } from 'react';

export interface SlugTitleProps {
    soId: string;
}

export const SlugTitle: React.FC<SlugTitleProps> = props => {
    const { soId } = props;

    const slug = useMemo(
        () => [
            {
                name: 'Vận Hành',
                slug: '',
            },
            {
                name: 'Đơn hàng bán',
                slug: rootPaths.saleOrders,
            },
            {
                name: `${soId ? 'Chỉnh sửa' : 'Thêm mới'}`,
                slug: `${soId ? rootPaths.saleOrderForm + '/' + soId : rootPaths.saleOrderForm}`,
            },
        ],
        [soId],
    );
    return <SlugHeader slugList={slug} />;
};
