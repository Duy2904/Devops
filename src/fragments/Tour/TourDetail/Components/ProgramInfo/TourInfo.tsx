import 'dayjs/locale/vi';

import { Form, FormInstance } from 'antd';
import { TourGitDto, TourScheduleDto } from '@sdk/tour-operations';

import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { Pattern } from '@utils/formHelper';
import { TourType } from '@src/types/TypeEnum';
import { canEditData } from '../../Feature';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import useHasAnyPermission from '@hooks/useHasAnyPermission';

interface TourInfoProps {
    form: FormInstance;
    tourType?: TourType;
    isCloneTour?: boolean;
    tourSchedule?: TourScheduleDto | TourGitDto;
}

export const TourInfo: React.FC<TourInfoProps> = props => {
    const { form } = props;
    const values = Form.useWatch([], { form, preserve: false });
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]);

    const startDayChange = (data: dayjs.Dayjs | null) => {
        const dayNext =
            (values.numberOfDays ?? 0) >= (values.numberOfNights ?? 0) ? values.numberOfDays : values.numberOfNights;
        const fetchData = data?.add(dayNext > 1 ? dayNext - 1 : 0, 'day');
        form.setFieldsValue({ endDate: fetchData });
    };

    return (
        <>
            {/* Số ngày - Số đêm */}
            <div className="grid grid-cols-2 gap-4">
                <BaseInput
                    isForm
                    type="number"
                    label={i18n.t('tour.tourDetail.numberOfDays')}
                    name="numberOfDays"
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (values?.numberOfDays && values?.numberOfNights) {
                                    const diff = (values?.numberOfDays ?? 0) - (values?.numberOfNights ?? 0);
                                    if (value >= 0 && Math.abs(diff) <= 1) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error(i18n.t('validation.default.errorDateNumber')));
                                    }
                                }
                                return Promise.resolve();
                            },
                        }),
                        { pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') },
                    ]}
                    className="col-span-2 lg:col-span-1"
                    min={0}
                />
                <BaseInput
                    isForm
                    type="number"
                    label={i18n.t('tour.tourDetail.numberOfNights')}
                    name="numberOfNights"
                    rules={[
                        () => ({
                            validator(_, value) {
                                const diff = (values?.numberOfDays ?? 0) - (values?.numberOfNights ?? 0);
                                if (values?.numberOfDays && values?.numberOfNights) {
                                    if (value >= 0 && Math.abs(diff) <= 1) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error(i18n.t('validation.default.errorDateNumber')));
                                    }
                                }
                                return Promise.resolve();
                            },
                        }),
                        { pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') },
                    ]}
                    className="col-span-2 lg:col-span-1"
                    min={0}
                />
            </div>
            {/* Ngày khởi hành - Ngày kết thúc */}
            <div className="grid grid-cols-2 gap-4">
                <BaseDatePicker
                    name="departureDate"
                    label={i18n.t('tour.tourDetail.departureDate')}
                    rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                    isRequired
                    className="col-span-2 lg:col-span-1"
                    onChange={e => startDayChange(e)}
                    format={'dateTime'}
                    showTime={{ defaultValue: dayjs('00:00', 'HH:mm'), minuteStep: 5 }}
                    customDefaultValue={form.getFieldValue('saleEndDate')}
                    disabledDate={current =>
                        current <=
                        (props.tourType == TourType.FIT ? dayjs(values?.saleEndDate) : dayjs().subtract(1, 'day'))
                    }
                    disabled={
                        (props.tourType == TourType.FIT
                            ? !values?.numberOfDays || !values?.numberOfNights || !values?.saleEndDate
                            : !values?.numberOfDays || !values?.numberOfNights) ||
                        !hasModifyTourFITPermission ||
                        !canEditData(props.tourSchedule?.status)
                    }
                />
                <BaseDatePicker
                    name="endDate"
                    label={i18n.t('tour.tourDetail.endDay')}
                    className="col-span-2 lg:col-span-1"
                    format="dateTime"
                    showTime={{ defaultValue: dayjs('00:00', 'HH:mm'), minuteStep: 5 }}
                    disabled={!values?.departureDate || !hasModifyTourFITPermission}
                    disabledDate={current => current <= values?.departureDate}
                />
            </div>
            {/* Chuyến đi - Chuyến về */}
            <div className="grid grid-cols-2 gap-4">
                <BaseInput
                    isForm
                    label={i18n.t('tour.tourDetail.positionTo')}
                    name="departureTrip"
                    className="col-span-2 lg:col-span-1"
                    showCount
                    maxCountNumber={500}
                />
                <BaseInput
                    isForm
                    label={i18n.t('tour.tourDetail.positionBack')}
                    name="returnTrip"
                    className="col-span-2 lg:col-span-1"
                    showCount
                    maxCountNumber={500}
                />
            </div>
        </>
    );
};
