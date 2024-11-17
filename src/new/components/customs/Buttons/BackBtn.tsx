import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useBackStore } from '@src/new/shared/stores/backStore';

import { IconBack } from '../../common/svg';

interface BackBtnProps {
    navigateUrl: string;
}

export const BackBtn: React.FC<BackBtnProps> = props => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { pathStore, setPathStore } = useBackStore(state => state);

    const handleBack = () => {
        if (pathname != pathStore && pathname) {
            navigate(-1);
            setTimeout(() => {
                setPathStore(pathname);
            }, 1000);
        } else {
            navigate(props.navigateUrl);
        }
    };

    return (
        <Button
            className="bg-greyColor-first/10 text-xs h-6 px-2 hover:!bg-greyColor-first/10 text-brand-primary hover:!text-brand-primary border-none"
            icon={<IconBack fill="#222529" />}
            onClick={handleBack}
        >
            {t('Trở lại')}
        </Button>
    );
};
