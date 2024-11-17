import { Button, FormInstance } from 'antd';
import { useNavigate } from 'react-router-dom';

import { FieldTimeOutlined, SaveOutlined } from '@ant-design/icons';
import Can from '@components/common/Can';
import i18n from '@src/i18n';
import { MyPermissions } from '@utils/Permissions/index.ts';

import { DrawerSaleOrderList } from './DrawerSaleOrderList';

interface ButtonPromotionDetailProps {
    infoForm: FormInstance;
    backRedirect: string;
    discountId?: string;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonPromotionDetail: React.FC<ButtonPromotionDetailProps> = props => {
    const { infoForm, backRedirect, discountId, setIsOpenHistory } = props;
    const navigate = useNavigate();

    return (
        <>
            <Can permissions={[MyPermissions.DiscountCreate, MyPermissions.DiscountUpdate]}>
                <Button className="text-xs" type="primary" icon={<SaveOutlined />} onClick={() => infoForm.submit()}>
                    {i18n.t('action.save')}
                </Button>
            </Can>
            {discountId && (
                <>
                    <Can permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                        <DrawerSaleOrderList discountId={discountId ?? ''} />
                    </Can>
                    <Button className="text-xs" icon={<FieldTimeOutlined />} onClick={() => setIsOpenHistory(true)}>
                        {i18n.t('Lịch sử')}
                    </Button>
                </>
            )}
            <Button className="text-xs" onClick={() => navigate(backRedirect)}>
                {i18n.t('Quay lại')}
            </Button>
        </>
    );
};
