import { Col } from 'antd';
import { ReactNode } from 'react';
interface TagCouponProps {
    name: string;
    icon: ReactNode;
    bgColor?: string;
    borderColor?: string;
}

const TagCoupon = ({ name, icon, bgColor, borderColor }: TagCouponProps) => {
    return (
        <Col className={`${borderColor} border border-solid h-5 flex items-center rounded`}>
            <span className="inline-block pl-[5px] pr-[4px]">{icon}</span>
            <span className={`${bgColor} text-white w-full px-[6px] flex items-center text-xs h-full rounded-[3px]`}>
                {name}
            </span>
        </Col>
    );
};

export default TagCoupon;
