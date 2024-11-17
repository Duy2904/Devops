import { Button, Flex, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { Color } from '../Color/CustomColor';

const CouponInput = () => {
    const { t } = useTranslation();

    return (
        <Flex vertical gap={8} className="w-full">
            <span className={`${Color.text_black_45} text-xs`}>Nhập mã ưu đãi</span>
            <Flex align="center" gap={4}>
                <Input placeholder="EBLM.43" className="flex-1 rounded-lg h-8" />
                <Button type="primary" className="h-8">
                    {t('Kiểm tra')}
                </Button>
            </Flex>
        </Flex>
    );
};

export default CouponInput;
