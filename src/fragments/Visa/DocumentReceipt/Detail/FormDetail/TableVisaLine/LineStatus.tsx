import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { Select } from 'antd';
import { getTourVisaLineStatus } from '../../../hook/useDocumentReceiptVisa';

interface LineStatusProps {
    name: string[];
    initialValue?: string;
}

export const LineStatus: React.FC<LineStatusProps> = props => {
    const { name, initialValue } = props;
    const dataSelect = getTourVisaLineStatus();

    const select = () => {
        return (
            <Select className="w-full" virtual={false} showSearch optionFilterProp="children" options={dataSelect} />
        );
    };

    return <BaseSelect className="mb-0" isForm name={name} items={select()} initialValue={initialValue} />;
};
