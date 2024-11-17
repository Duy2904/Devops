import { TagOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

interface DiscountItemInfoProps {
    code?: string;
    price?: number;
}

export const DiscountItemInfo: React.FC<DiscountItemInfoProps> = props => {
    return (
        <div className="grid grid-cols-12 gap-1">
            <Flex align="center" className="col-span-7 text-xs">
                <TagOutlined className="text-orange-600" />
                <span className="ml-2 truncate">{props.code}</span>
            </Flex>
            <p className="text-right col-span-5 text-green-500">
                -{Intl.NumberFormat('en-US').format(Number(props.price))}
            </p>
        </div>
    );
};
