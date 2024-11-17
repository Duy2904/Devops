import { TitleHeader } from '../../../components/ui/TitleHeader';
import i18n from '@src/i18n';

interface HeaderComponentProps {
    refundId?: string;
}

export const HeaderRefundFormComponent = (props: HeaderComponentProps) => {
    return <TitleHeader title={props.refundId ? i18n.t(`Chỉnh sửa Phiếu hoàn`) : i18n.t('Thêm mới Phiếu hoàn')} />;
};
