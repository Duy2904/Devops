import { Form } from 'antd';

interface AmountItemProps {
    title?: string;
    price?: string;
    className?: string;
}

export const AmountItem: React.FC<AmountItemProps> = props => {
    return (
        <div className="grid grid-cols-12 gap-1 mb-4">
            <div className="col-span-4 flex items-center font-semibold">{props.title}</div>
            <Form.Item className="col-span-8 text-right mb-0">
                <span className={`text-xs break-all ${props.className}`}>{props.price}</span>
            </Form.Item>
        </div>
    );
};
