import { Button, Col, ConfigProvider } from 'antd';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { InfoOutlined } from '@src/new/components/common/SvgIcon';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { getActiveColors, getHoverColors } from '@src/new/shared/utils/color';

interface ConfirmButtonProps {
    isAvailable: boolean;
    isLoading?: boolean;
    onSubmit: () => void;
    disabled?: boolean;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = props => {
    const { isAvailable, isLoading, disabled, onSubmit } = props;
    const { t } = useTranslation();

    const btnColor = isAvailable ? '#4CA85E' : '#ED311D';
    const textColor = isAvailable ? Color.text_449554 : Color.text_ED311D;
    const borderColor = isAvailable ? Color.border_4CA85E : Color.border_ED311D;

    return (
        <Col className={clsx('border-2 border-solid rounded-xl bg-white p-1', borderColor)}>
            <p className={clsx('min-h-[20px] flex justify-center items-center gap-1 text-xs font-semibold', textColor)}>
                {isAvailable ? t('Giữ chỗ trong vòng 24 giờ') : t('Hết chỗ')}

                <InfoOutlined className={clsx('w-3 h-3', textColor)} />
            </p>

            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: btnColor,
                            colorPrimaryHover: getHoverColors(btnColor),
                            colorPrimaryActive: getActiveColors(btnColor),
                            lineWidth: 0,
                        },
                    },
                }}
            >
                <Button
                    type="primary"
                    className="uppercase w-full mt-1 line-clamp-1 h-10 font-extrabold text-[20px] text-white rounded-lg"
                    loading={isLoading}
                    disabled={isLoading || disabled}
                    onClick={onSubmit}
                >
                    {isAvailable ? t('Đặt chỗ') : t('Đặt chờ')}
                </Button>
            </ConfigProvider>
        </Col>
    );
};

export default ConfirmButton;
