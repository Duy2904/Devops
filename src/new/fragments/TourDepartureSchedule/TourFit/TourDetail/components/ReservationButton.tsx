import { Button, ConfigProvider } from 'antd';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { getActiveColors, getHoverColors } from '@src/new/shared/utils/color';

interface ReservationButtonProps {
    isAvailable?: boolean;
    onClick: () => void;
}

const ReservationButton: React.FC<ReservationButtonProps> = props => {
    const { isAvailable, onClick } = props;
    const { t } = useTranslation();

    const btnColor = isAvailable ? '#4CA85E' : '#ED311D';
    const outlineColor = isAvailable ? 'outline-[#4CA85E]' : 'outline-[#ED311D]';

    return (
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
                className={clsx(
                    'uppercase w-[248px] line-clamp-1 h-[48px] font-extrabold text-[20px] text-white outline outline-2 border-2 border-solid border-white rounded-xl shadow-lg ',
                    outlineColor,
                )}
                onClick={onClick}
            >
                {isAvailable ? t('Đặt chỗ') : t('Đặt chờ')}
            </Button>
        </ConfigProvider>
    );
};

export default ReservationButton;
