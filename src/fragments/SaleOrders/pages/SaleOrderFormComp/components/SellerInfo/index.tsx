import { Descriptions, DescriptionsProps, Select } from 'antd';

interface SellerInfoProps {
    sellerId?: string;
}

export const SellerInfoComponent: React.FC<SellerInfoProps> = props => {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Tên',
            children: 'XXXX',
        },
        {
            key: '2',
            label: 'Mã Seller',
            children: 'XXXX',
        },
    ];

    return (
        <div className="bg-white w-full col-span-12 lg:col-span-7 p-4 border border-solid border-gray-100 overflow-hidden">
            <Select
                virtual={false}
                showSearch
                className="w-full col-span-6 md:col-span-2"
                placeholder="--Chọn Seller--"
                optionFilterProp="children"
                // options={tourScheduleOptions}
                defaultValue={props.sellerId}
                allowClear
            />
            <Descriptions layout="vertical" className="py-4" items={items} column={2} />
        </div>
    );
};
