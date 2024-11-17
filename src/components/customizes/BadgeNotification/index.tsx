import { Col, Flex } from 'antd';

import ic_bell from '@assets/images/bell.svg';

interface BadgeNotificationProps {
    count?: number;
}

export const BadgeNotification: React.FC<BadgeNotificationProps> = props => {
    const { count } = props;

    return (
        <Col className="w-10 h-10 rounded-md bg-brand-primary/[12%] cursor-pointer">
            <Flex className="relative w-full h-full" align="center" justify="center">
                <img className=" fill-brand-primary" src={ic_bell} alt="bell_icon" />
                <Flex
                    align="center"
                    justify="center"
                    className="absolute min-w-[20px] h-5 border border-solid border-white rounded-full bg-brand-secondary -top-2 -right-2"
                >
                    <label className="text-[9px] px-1 text-white font-medium cursor-pointer">
                        {count ? (count > 99 ? '99+' : count) : 0}
                    </label>
                </Flex>
            </Flex>
        </Col>
    );
};
