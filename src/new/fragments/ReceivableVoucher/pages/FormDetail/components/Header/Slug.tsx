
import { SlugHeader } from '@src/new/components/customs/Slug';
import { rootPathsNew } from '@src/routers/newRoute';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


interface SlugProps {
    isEnableEdit: boolean;
}

export const Slug: React.FC<SlugProps> = (props) => {
    const { isEnableEdit } = props;
    const { recId } = useParams<string>();
    const { t } = useTranslation();

    const slug = [
        {
            name: t('Chứng từ thanh toán'),
            slug: '',
        },
        {
            name: t('Phiếu thu'),
            slug: rootPathsNew.receivableList,
        },
        {
            name: recId ? t('Chỉnh sửa phiếu thu') : t('Tạo mới phiếu thu'),
            slug: '',
        },
    ];

    return (

        <SlugHeader slugList={slug} showUpdated={!!recId} showBackBtn={!isEnableEdit} navigateUrl={rootPathsNew.receivableList} />
    );
};
