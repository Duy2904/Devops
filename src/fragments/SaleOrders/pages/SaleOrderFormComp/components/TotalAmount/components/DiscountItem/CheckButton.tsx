import { Flex } from 'antd';
import { ReactNode, useMemo } from 'react';

interface CheckButtonProps {
    isChecked: boolean;
    children: ReactNode;
}

export const CheckButton: React.FC<CheckButtonProps> = props => {
    const { isChecked, children } = props;
    const dotStyle = useMemo(
        () =>
            `block absolute -left-[4px] w-2 h-2 bg-white border rounded-full border-solid  ${
                isChecked ? `border-green-500` : `border-black`
            }`,
        [isChecked],
    );

    const dotTopStyle = useMemo(() => `-top-1 ${isChecked ? 'border-green-500' : 'border-black'}`, [isChecked]);

    const dotBottomStyle = useMemo(
        () => `-bottom-[5px] ${isChecked ? 'border-green-500' : 'border-black'}`,
        [isChecked],
    );

    return (
        <Flex
            vertical
            justify="center"
            className={`relative px-5 border-0 border-l ${
                isChecked ? 'border-green-500' : 'border-black'
            } border-dashed`}
        >
            <span className={`${dotStyle} ${dotTopStyle}`} />
            {children}
            <span className={`${dotStyle} ${dotBottomStyle}`} />
        </Flex>
    );
};
