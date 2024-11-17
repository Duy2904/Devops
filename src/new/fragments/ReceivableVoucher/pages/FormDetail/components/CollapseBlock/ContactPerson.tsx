import { ContactPersonComponent } from '@src/new/components/customs/PersonContact';
import { FormInstance } from 'antd';

interface ContactPersonProps {
    recId?: string;
    travellerId?: string;
    form?: FormInstance;
    isEnableEdit?: boolean;
}

export const ContactPerson: React.FC<ContactPersonProps> = (props) => {
    const { recId, travellerId, form, isEnableEdit } = props;
    return (
        <div className="p-4">
            <ContactPersonComponent travellerId={travellerId} canSearch={(!travellerId || !isEnableEdit) && !recId} form={form} />
        </div>
    );
};
