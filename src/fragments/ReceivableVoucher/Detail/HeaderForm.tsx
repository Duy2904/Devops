import { TitleHeader } from '../../../components/ui/TitleHeader';
import i18n from '@src/i18n';

interface HeaderComponentProps {
    recId?: string;
}

export const HeaderReceiptFormComponent = (props: HeaderComponentProps) => {
    return <TitleHeader title={props.recId ? i18n.t(`Chỉnh sửa Phiếu thu`) : i18n.t('Thêm mới Phiếu thu')} />;
};
