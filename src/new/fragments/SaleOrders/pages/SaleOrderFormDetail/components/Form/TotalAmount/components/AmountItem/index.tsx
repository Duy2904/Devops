import { Price } from '@src/new/fragments/SaleOrders/components/Price';

interface AmountItemProps {
    name?: string;
    title?: string;
    price?: number;
}
export const AmountItem: React.FC<AmountItemProps> = props => {
    return (
        <div className="grid grid-cols-12 gap-1">
            <div className="col-span-8 text-xs flex items-center">{props.title}</div>
            <Price value={props.price} className="font-bold col-span-4 text-right" />
        </div>
    );
};
