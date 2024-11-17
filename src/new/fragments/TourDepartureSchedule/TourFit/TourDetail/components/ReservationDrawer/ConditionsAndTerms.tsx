import { Checkbox, Col, Flex } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { ArrowRightShort } from '@src/new/components/common/SvgIcon';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { useTranslation } from 'react-i18next';

interface ConditionsAndTermsProps {
    isAllowConditions: boolean;
    setIsAllowConditions: Dispatch<SetStateAction<boolean>>;
}

const ConditionsAndTerms: React.FC<ConditionsAndTermsProps> = props => {
    const { isAllowConditions, setIsAllowConditions } = props;
    const { t } = useTranslation();

    const onClick = () => {
        setIsAllowConditions(!isAllowConditions);
    };

    return (
        <Col className={`${Color.border_EDEDED} px-3 bg-white py-2 border border-solid rounded-lg mx-2`}>
            <Flex justify="space-between" align="center">
                <Flex gap={12}>
                    <Checkbox id="agree-conditions-terms" onClick={onClick} />
                    <label htmlFor="agree-conditions-terms" className="cursor-pointer">
                        <Flex vertical>
                            <p className={`${Color.text_black_88} text-sm font-bold`}>{t('Điều kiện - Điều khoản')}</p>
                            <p className={`${Color.text_2A2A2A_60} text-xs line-clamp-1`}>
                                {t('Thanh toán, hoàn vé, hủy vé, bảo hiểm...')}
                            </p>
                        </Flex>
                    </label>
                </Flex>
                <Flex align="center" className="cursor-pointer">
                    <ArrowRightShort className="w-4 h-4" />
                </Flex>
            </Flex>
        </Col>
    );
};

export default ConditionsAndTerms;
