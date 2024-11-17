import { FormInstance } from 'antd';

import { NotificationTimeSetupDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { FormItem } from '../FormItem';

interface ScheduleItemProps {
    moduleName: string;
    data: NotificationTimeSetupDto[] | undefined;
    childOrder: string[];
    form: FormInstance;
}

const renderListItem = (childOrder: string[], data: NotificationTimeSetupDto[] | undefined, form: FormInstance) => {
    return (
        <>
            {childOrder?.map(item => {
                const findItem = data?.find(x => x.eventKey === item) ?? {};
                return <FormItem key={findItem?.id} item={findItem} form={form} />;
            })}
        </>
    );
};

export const ScheduleItem: React.FC<ScheduleItemProps> = props => {
    const { moduleName, childOrder, data, form } = props;

    return (
        <div>
            <p className="font-bold pb-2">{i18n.t(`setting.scheduledNotification.table.${moduleName}`)}</p>
            {renderListItem(childOrder, data, form)}
        </div>
    );
};
