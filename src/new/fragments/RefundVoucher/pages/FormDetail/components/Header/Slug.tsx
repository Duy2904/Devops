
import { SlugHeader } from '@src/new/components/customs/Slug';
import { rootPathsNew } from '@src/routers/newRoute';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


interface SlugProps {
    isEnableEdit: boolean;
}

export const Slug: React.FC<SlugProps> = (props) => {
    const { isEnableEdit } = props;
    const { refundId } = useParams<string>();
    const { t } = useTranslation();

    const slug = [
        {
            name: t('Chứng từ thanh toán'),
            slug: '',
        },
        {
            name: t('Phiếu hoàn'),
            slug: rootPathsNew.refundList,
        },
        {
            name: refundId ? t('Chỉnh sửa phiếu hoàn') : t('Tạo mới phiếu hoàn'),
            slug: '',
        },
    ];

    return (

        <SlugHeader slugList={slug} showUpdated={!!refundId} showBackBtn={!isEnableEdit} navigateUrl={rootPathsNew.refundList} />
    );
};
