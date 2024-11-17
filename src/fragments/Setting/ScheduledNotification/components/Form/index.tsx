import { Dispatch, SetStateAction } from 'react';
import { Form, FormInstance } from 'antd';
import { useGetNotificationTimeSetup, useUpdateNotificationTimeSetup } from '../../hooks/useNotificationTimeSetup';

import { Loading } from '@components/customizes/Loading/Loading';
import { ScheduleItem } from './ScheduleItem';
import isEmpty from 'lodash/isEmpty';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { transformDataForm } from '@utils/formHelper';
import { useQueryClient } from 'react-query';

interface ScheduledNotificationFormProps {
    form: FormInstance;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    isEnableEdit: boolean;
}

const listItemByOrder = [
    {
        name: 'TourSchedule_Fit',
        childOrder: ['DepartureDate', 'PrepaidDateNo'],
    },
    {
        name: 'TransportationTourService_Plane',
        childOrder: ['DepositDate', 'NameEntryDate', 'IssuanceDate'],
    },
    {
        name: 'VisaTourService',
        childOrder: ['VisaSubmissionDate', 'VisaSubmissionToConsulateDate', 'VisaResultReturnDate'],
    },
    {
        name: 'HotelTourService',
        childOrder: ['DepositDate'],
    },
    {
        name: 'LandTourService',
        childOrder: ['DepositDate'],
    },
];

export const ScheduledNotificationForm: React.FC<ScheduledNotificationFormProps> = props => {
    const { form, setIsEnableEdit, isEnableEdit } = props;
    const queryClient = useQueryClient();

    // Query
    const { isLoading, data } = useGetNotificationTimeSetup();

    // Mutate
    const { mutateAsync: updateNotificationTimeSetup } = useUpdateNotificationTimeSetup();

    const onFinish = async () => {
        const dataForm = transformDataForm(props.form);
        const newData =
            data?.map(item => {
                const findItem = dataForm.find(x => x.id === item.id);

                if (isEmpty(findItem)) return item;
                return { ...item, value: findItem.value, timeUnit: findItem.timeUnit, isActive: findItem.isActive };
            }) ?? [];
        const res = await updateNotificationTimeSetup(newData);
        if (res.status === 204) {
            toastSuccess('', 'Cập nhật thành công!');
        }
        queryClient.invalidateQueries({ queryKey: ['fetchNotificationTimeSetup'] });
        setIsEnableEdit(false);
    };

    if (isLoading) {
        return (
            <div className="h-[calc(100vh_-_143px)] bg-white p-3 overflow-auto">
                <Loading />
            </div>
        );
    }

    const handleChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    return (
        <Form className="pb-4" form={form} onFinish={onFinish} onValuesChange={handleChange}>
            <div className="h-[calc(100vh_-_143px)] overflow-auto">
                {listItemByOrder.map(item => {
                    const listFilter = data?.filter(x => x.module === item.name);

                    return (
                        <ScheduleItem
                            moduleName={item.name}
                            data={listFilter}
                            key={item.name}
                            childOrder={item.childOrder}
                            form={form}
                        />
                    );
                })}
            </div>
        </Form>
    );
};
