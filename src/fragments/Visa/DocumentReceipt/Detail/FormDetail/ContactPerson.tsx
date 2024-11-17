import { ContactPersonComponent } from '@src/new/components/customs/PersonContact';
import { FormInstance } from 'antd';

interface ContactPersonProps {
    travellerId?: string;
    form?: FormInstance;
}

export const ContactPerson: React.FC<ContactPersonProps> = (props) => {
    const { travellerId, form } = props;
    return (
        <div className="p-4">
            <ContactPersonComponent travellerId={travellerId} canSearch={false} form={form} />
        </div>
    );
};
