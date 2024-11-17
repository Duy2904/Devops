import { Checkbox, Form, FormInstance, Table } from 'antd';
import { RoomListTravellerDto, TourScheduleDto, UpdateRoomListTravellerRequest } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { ColumnsType } from 'antd/es/table';
import { StaticTag } from '@components/customizes/StaticTag';
import { convertValues } from '@utils/formHelper';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isNil from 'lodash/isNil';
import { setVisaStatusColor } from '@utils/colorStatus';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useFetchCountries } from '@components/customizes/Select/Country/useCountries';
import { useFetchPassengerTypeDefaultFIT } from '@components/customizes/Select/PassengerType/usePassenger';
import { useQueryClient } from 'react-query';
import { useUpdateRoomListOfTourFit } from '@fragments/Tour/hooks/useTourFit';

interface OrderRoomFormProps {
    orderRoomForm: FormInstance;
    dataTourFit?: TourScheduleDto;
    data?: RoomListTravellerDto[];
    isLoading?: boolean;
}

export const OrderRoomForm: React.FC<OrderRoomFormProps> = props => {
    const { orderRoomForm, dataTourFit, data, isLoading } = props;
    const queryClient = useQueryClient();
    // query

    const { mutateAsync: updateRoomListOfTourFit } = useUpdateRoomListOfTourFit();
    const { data: dataPassengerType } = useFetchPassengerTypeDefaultFIT({ isFit: true });
    const { data: dataCountries } = useFetchCountries();

    const columns: ColumnsType<RoomListTravellerDto> = [
        {
            title: '#',
            key: 'id',
            width: 30,
            align: 'center',
            render: (_, record: RoomListTravellerDto, index: number) => (
                <>
                    <BaseInput isForm isHidden type="text" name={['id', record.id!]} initialValue={record.id} />
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['isTourGuide', record.id!]}
                        initialValue={record.isTourGuide}
                    />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: 'Khách đi tour',
            key: 'infoTraveller',
            width: 200,
            render: (record: RoomListTravellerDto) => (
                <div>
                    <p className="mb-1">{record?.fullName}</p>
                    <p className="text-black/40">
                        {dataPassengerType?.data?.find(item => item.id == record?.passengerTypeId)?.name}
                    </p>
                    <p className="text-black/40 mb-1">
                        {`${record?.gender ? i18n.t(`GenderType.${record?.gender}`) : ''} ${
                            record?.dateOfBirth ? `${dayjs(record?.dateOfBirth).format(AppConfig.DateFormat)}` : ''
                        } ${dataCountries?.data?.find(item => item.id == record?.countryId)?.name ?? ''}`}
                    </p>
                    {!isNil(record?.phone) && <p className="text-black/40">SĐT: {record?.phone}</p>}
                    {!isNil(record?.identityId) && <p className="text-black/40">CCCD: {record?.identityId}</p>}
                </div>
            ),
        },
        {
            title: 'Hộ Chiếu',
            key: 'isExtra',
            width: 100,
            render: (record: RoomListTravellerDto) => (
                <>
                    <p>{`Số HC: ${record?.passport ? record?.passport : '-'}`}</p>
                    <p>{`Ngày hết hạn: ${
                        record?.expiryDate ? dayjs(record?.expiryDate).format(AppConfig.DateFormat) : '-'
                    }`}</p>
                </>
            ),
        },
        {
            title: 'Visa',
            key: 'isExtra',
            width: 100,
            align: 'center',
            render: (record: RoomListTravellerDto) => (
                <StaticTag
                    type={record.status ? i18n.t(`tourVisa.visaLineStatus.${record.status}`) : ''}
                    color={`${setVisaStatusColor(record.status ?? '')}`}
                />
            ),
        },
        {
            title: 'Loại phòng',
            key: 'roomType',
            width: 70,
            align: 'center',
            render: (record: RoomListTravellerDto) => <>{record?.roomType}</>,
        },
        {
            title: 'Số phòng (Đơn hàng bán)',
            key: 'numberOfRoom',
            width: 140,
            render: (record: RoomListTravellerDto) => (
                <>
                    <p className="mb-1">{record?.roomNumber ? `Số phòng: ${record?.roomNumber}` : ''}</p>
                    <p className="text-black/40">{record?.saleOrderOrderNo}</p>
                </>
            ),
        },
        {
            title: 'Xếp phòng',
            key: 'roomArrangement',
            width: 70,
            align: 'center',
            render: (record: RoomListTravellerDto) => (
                <BaseInput
                    isForm
                    name={['roomArrangement', record.id!]}
                    className="mb-0"
                    initialValue={record.roomArrangement}
                />
            ),
        },
        {
            title: 'Extra Bed',
            key: 'extraBed',
            width: 70,
            align: 'center',
            render: (record: RoomListTravellerDto) => (
                <>
                    <Form.Item
                        className="flex justify-center mb-0"
                        name={['extraBed', record.id!]}
                        valuePropName="checked"
                        initialValue={record.extraBed}
                    >
                        <Checkbox checked={record.extraBed}></Checkbox>
                    </Form.Item>
                </>
            ),
        },
        {
            title: 'Ghi chú',
            key: 'roomNote',
            width: 200,
            render: (record: RoomListTravellerDto) => (
                <BaseInput isForm name={['roomNote', record.id!]} className="mb-0" initialValue={record.roomNote} />
            ),
        },
    ];

    const onFinish = async (values: { [x: string]: { [y: string]: string } }) => {
        const formData = convertValues(values);
        const data = {
            id: dataTourFit?.id,
            request: formData as UpdateRoomListTravellerRequest[],
        };
        const res = await updateRoomListOfTourFit(data);
        if (res) {
            queryClient.invalidateQueries(['fetchRoomListByIdOfTourFit', dataTourFit?.id]);
            toastSuccess(i18n.t('Room List'), i18n.t('message.default.updateContentSuccess'));
        }
    };

    return (
        <div className="p-4">
            <Form form={orderRoomForm} onFinish={onFinish}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    bordered
                    pagination={false}
                    size="small"
                    scroll={{ x: 1200, y: 630 }}
                    loading={isLoading}
                />
            </Form>
        </div>
    );
};
