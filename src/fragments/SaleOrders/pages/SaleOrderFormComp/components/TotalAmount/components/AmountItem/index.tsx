import { Form } from 'antd';

interface AmountItemProps {
    name?: string;
    title?: string;
    price?: string | number;
}
export const AmountItem: React.FC<AmountItemProps> = props => {
    return (
        <div className="grid grid-cols-12 gap-1 mb-4">
            <div className="col-span-8 text-xs flex items-center">{props.title}</div>
            <Form.Item className="col-span-4 text-right mb-0" name={props.name}>
                <span className="text-xs">{props.price}</span>
            </Form.Item>
        </div>
    );
};
