import { Button } from 'antd';
import { IconHistoryBtn } from '../../common/svg';
import i18n from '@src/i18n';

export interface HistoryBtnProps {
    onClick?: () => void;
}

export const HistoryBtn: React.FC<HistoryBtnProps> = props => {
    const { onClick } = props;
    return (
        <Button
            className="bg-greyColor-first/10 text-xs h-6 pl-1 hover:!bg-greyColor-first/10 text-brand-primary hover:!text-brand-primary border-none flex items-center justify-center"
            onClick={onClick}
        >
            <IconHistoryBtn height={20} width={24} />
            {i18n.t('Lịch sử')}
        </Button>
    );
};
