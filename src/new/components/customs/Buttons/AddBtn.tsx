import { Button } from 'antd';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18n from '@src/i18n';

export interface AddBtnProps {
    onClick?: () => void;
    text?: string;
}

export const AddBtn: React.FC<AddBtnProps> = props => {
    const { text, onClick } = props;
    return (
        <Button type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={onClick}>
            {text ? text : i18n.t('Thêm mới')}
        </Button>
    );
};
