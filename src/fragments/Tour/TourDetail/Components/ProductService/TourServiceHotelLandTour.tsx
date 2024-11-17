import { Button, Form, FormInstance } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { AnyObject } from 'antd/es/_util/type';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { TourServiceDepositDto } from '@sdk/tour-operations';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { verifyDisableDateHotelLandTour } from './ProductServiceFeature';

interface HotelOrLandTourProps {
    hotelOrLandTourForm: FormInstance;
    infoForm?: FormInstance;
    // eslint-disable-next-line no-unused-vars
    onFinish: (values: AnyObject) => Promise<unknown>;
    dateList: TourServiceDepositDto[];
    setDateList: React.Dispatch<React.SetStateAction<TourServiceDepositDto[]>>;
    titleTourService: string;
    hasModifyTourFITPermission?: boolean;
}

export const HotelOrLandTour: React.FC<HotelOrLandTourProps> = props => {
    const valuesInfoForm = Form.useWatch([], props.infoForm);
    const valueHotelOrLandTourForm = Form.useWatch([], props.hotelOrLandTourForm);

    const handleAdd = () => {
        const data: TourServiceDepositDto = {
            order: props.dateList.length == 0 ? 1 : (props.dateList[props.dateList.length - 1].order ?? 0) + 1,
            depositDate: undefined,
        };
        props.setDateList([...props.dateList, data]);
    };

    const handleDelete = (item: TourServiceDepositDto) => {
        const newArray = props.dateList.filter(data => data.order !== item.order);
        props.setDateList(newArray);
    };

    return (
        <Form form={props.hotelOrLandTourForm} onFinish={props.onFinish} layout="horizontal">
            <BaseInput name="id" isForm isHidden />
            <BaseInput name="tourScheduleId" isForm isHidden />
            <BaseInput name="productTypeId" isForm isHidden />
            <fieldset className="p-4 rounded-md border-gray-100/40 my-4 relative">
                <legend className="!text-sm !px-2 !w-fit text-gray-500 !mb-0 !border-none">
                    {props.titleTourService}
                </legend>
                <Can permissions={[MyPermissions.TourCreate]}>
                    <div className="flex justify-end absolute -top-[23px] right-5">
                        <Button
                            className="flex items-center justify-center"
                            size="small"
                            onClick={handleAdd}
                            onKeyDown={handleAdd}
                        >
                            <p className="text-[10px]">
                                <PlusOutlined />
                                <span className="font-medium pl-2">{i18n.t('action.create')}</span>
                            </p>
                        </Button>
                    </div>
                </Can>
                {props.dateList.length > 0 && (
                    <div className="mt-5">
                        {props.dateList.map((item: TourServiceDepositDto, index: number) => {
                            return (
                                <div
                                    className="grid grid-cols-12 gap-4 mb-5"
                                    key={`${props.titleTourService}-${item.order}`}
                                >
                                    <BaseInput
                                        name={['order', `${item.order}`]}
                                        initialValue={item.order}
                                        isForm
                                        isHidden
                                    />
                                    <BaseDatePicker
                                        className="col-span-11 mb-0"
                                        name={['depositDate', `${item.order}`]}
                                        label={
                                            <p className="text-xs font-medium">
                                                {i18n.t('tour.tourDetail.depositStep')} {index + 1}
                                            </p>
                                        }
                                        initialValue={item.depositDate ? dayjs(item.depositDate) : undefined}
                                        rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                                        format="date"
                                        disabledDate={current =>
                                            verifyDisableDateHotelLandTour(
                                                current,
                                                valuesInfoForm,
                                                valueHotelOrLandTourForm,
                                                item,
                                            )
                                        }
                                        disabled={!props.hasModifyTourFITPermission || !valuesInfoForm?.departureDate}
                                        customDefaultValue={
                                            valueHotelOrLandTourForm?.depositDate?.length > 1
                                                ? dayjs(valueHotelOrLandTourForm?.depositDate[(item?.order ?? 0) - 1])
                                                : dayjs()
                                        }
                                    />
                                    <Can permissions={[MyPermissions.TourDelete]}>
                                        <DeleteOutlined
                                            className="col-span-1 mb-0"
                                            onClick={() => handleDelete(item)}
                                        />
                                    </Can>
                                </div>
                            );
                        })}
                    </div>
                )}
            </fieldset>
        </Form>
    );
};
