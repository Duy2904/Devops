import { Col } from 'antd';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import Format from '@src/new/shared/utils/format';
import clsx from 'clsx';

interface PriceProps {
    value: number | null | undefined;
    className?: string;
    isHighlight?: boolean;
}

export const Price: React.FC<PriceProps> = props => {
    const { value, isHighlight, className } = props;
    return (
        <Col
            className={clsx(
                'text-sm text-center',
                isHighlight ? `${Color.text_4CA85E} font-extrabold` : Color.text_black_87,
                className,
            )}
        >
            {Format.formatNegativeNumber(value)}
        </Col>
    );
};
