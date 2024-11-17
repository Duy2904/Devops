import { Button, FormInstance } from 'antd';

import { HeadContent } from '@components/ui/HeadContent';
import { HeaderTourFormComponent } from './HeaderTourForm';
import { PlusOutlined } from '@ant-design/icons';
import { TourType } from '@src/types/TypeEnum';
import i18n from '@src/i18n';
import { useNavigate } from 'react-router-dom';

interface CreateHeaderProps {
    form: FormInstance;
    onClick?: () => void;
    isLoading?: boolean;
    backUrl?: string;
    tourType?: TourType;
}

export const CreateHeader: React.FC<CreateHeaderProps> = props => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        if (!props.onClick) return;
        props.onClick();
    };

    return (
        <HeadContent
            slugContent={<HeaderTourFormComponent tourType={props.tourType} showSlug />}
            titleContent={<HeaderTourFormComponent tourType={props.tourType} showTitle />}
            buttonActionList={
                <>
                    <Button
                        className="text-xs"
                        loading={props.isLoading}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleOnClick}
                    >
                        {i18n.t('action.saveDraft')}
                    </Button>
                    <Button className="text-xs" type="default" onClick={() => navigate(`${props.backUrl}`)}>
                        {i18n.t('action.back')}
                    </Button>
                </>
            }
        />
    );
};
