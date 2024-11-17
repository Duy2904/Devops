import { useParams } from 'react-router-dom';

import i18n from '@src/i18n';
import { SlugHeader } from '@src/new/components/customs/Slug';
import { rootPathsNew } from '@src/routers/newRoute';

interface SlugProps {
    isEnableEdit: boolean;
}

export const Slug: React.FC<SlugProps> = props => {
    const { isEnableEdit } = props;
    const { soId } = useParams<string>();

    const slug = [
        {
            name: i18n.t('menu.saleOrder'),
            slug: rootPathsNew.saleOrders,
        },
        {
            name: i18n.t(soId ? 'Cập nhật đơn hàng bán' : 'Thêm mới đơn hàng bán'),
            slug: '',
        },
    ];
    return <SlugHeader slugList={slug} showUpdated showBackBtn={!isEnableEdit} navigateUrl={rootPathsNew.saleOrders} />;
};
