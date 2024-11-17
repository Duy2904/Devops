import {
    CreatePassengerTypeSeatsRequest,
    PassengerTypeDto,
    PassengerTypeSeatDto,
    TourGitDto,
    UpdatePassengerTypeSeatsRequest,
} from '@sdk/tour-operations';
import { Form, FormInstance } from 'antd';
import { Pattern, convertValues } from '@utils/formHelper';
import { useCallback, useEffect, useState } from 'react';
import { useCreatePassengerTypeSeat, useUpdatePassengerTypeSeat } from '@hooks/queries/usePassengerTypeSeat';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { MyPermissions } from '@utils/Permissions/index.ts';
import i18n from '@src/i18n';
import { useGetPassengerTypeDefaultGIT } from '@components/customizes/Select/PassengerType/usePassenger';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourFormStore } from '@store/tourFormStore';

interface FareGitProps {
    tourSchedule?: TourGitDto;
    form: FormInstance;
    tourFareForm: FormInstance;
}

export const FareGit: React.FC<FareGitProps> = props => {
    const [passengerTypeSeat, setPassengerTypeSeat] = useState<PassengerTypeSeatDto[]>([]);
    const [passengerTypeSeatForm, setPassengerTypeSeatForm] = useState<PassengerTypeSeatDto[]>([]);
    const [capacityForm, setCapacityForm] = useState<number>(0);
    const hasModifyTourGITPermission = useHasAnyPermission([MyPermissions.TourGitCreate, MyPermissions.TourGitUpdate]);

    // Store
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus, setTotalCapacity },
    } = useTourFormStore(state => state);
    const { data: fetchPassengerTypeDefaultGIT } = useGetPassengerTypeDefaultGIT();
    const { mutateAsync: createPassengerTypeSeat } = useCreatePassengerTypeSeat();
    const { mutateAsync: updatePassengerTypeSeat } = useUpdatePassengerTypeSeat();

    const onChangeValues = (_: AnyObject, values: AnyObject) => {
        const countValue: number[] = Object.values(values?.seatCount);
        const count = countValue.reduce((acc, value) => acc + (value ?? 0), 0);
        setTotalCapacity(count);
        setCapacityForm(count);
    };

    const onFinish = async (values: { [x: string]: { [y: string]: string } }) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        if (!values && !tourScheduleId) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourFareFormSuccess: true,
            });
            return;
        }
        const formData = convertValues(values);
        const dataList = formData.map(item => {
            const dataFetch = {
                id: item.id,
                passengerTypeId: item.passengerTypeId,
                seatCount: item.seatCount ?? 0,
            };
            if (item.id === undefined) {
                const newPassengerTypeSeat: CreatePassengerTypeSeatsRequest = {
                    tourScheduleId: tourScheduleId,
                    passengerTypeSeats: [dataFetch],
                };
                return createPassengerTypeSeat(newPassengerTypeSeat);
            } else {
                const newPassengerTypeSeat: UpdatePassengerTypeSeatsRequest = {
                    passengerTypeSeats: [dataFetch],
                };
                return updatePassengerTypeSeat(newPassengerTypeSeat);
            }
        });
        try {
            await Promise.all(dataList);
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourFareFormSuccess: true,
            });
        }
    };

    const fetchPassengerTypeDefault = useCallback(async () => {
        if (fetchPassengerTypeDefaultGIT) {
            const data =
                fetchPassengerTypeDefaultGIT.data?.map((item: PassengerTypeDto) => ({
                    passengerTypeId: item.id,
                    passengerTypeCode: item.code,
                    passengerTypeName: item.name,
                })) ?? [];
            setPassengerTypeSeat(data ?? []);
        }
    }, [fetchPassengerTypeDefaultGIT]);

    const fetchPassengerTypeFromTour = useCallback(() => {
        setPassengerTypeSeatForm(props.tourSchedule?.passengerTypeSeats ?? []);
        const totalCapacity =
            props.tourSchedule?.passengerTypeSeats?.reduce((sum, value) => sum + (value?.seatCount ?? 0), 0) ?? 0;
        setTotalCapacity(totalCapacity);
        setCapacityForm(totalCapacity);
    }, [props.tourSchedule?.passengerTypeSeats, setTotalCapacity]);

    useEffect(() => {
        if (!props.tourSchedule?.passengerTypeSeats && !props.tourSchedule?.id) {
            fetchPassengerTypeDefault();
        } else {
            fetchPassengerTypeFromTour();
        }
    }, [
        fetchPassengerTypeDefault,
        fetchPassengerTypeFromTour,
        props.tourSchedule?.id,
        props.tourSchedule?.passengerTypeSeats,
    ]);

    const elementTourGit = () => {
        const selectedPassengerTypeSeat = props.tourSchedule?.passengerTypeSeats
            ? passengerTypeSeatForm
            : passengerTypeSeat;
        const data = selectedPassengerTypeSeat
            .slice()
            .sort((a, b) => (a.passengerTypeCode ?? '').localeCompare(b.passengerTypeCode ?? ''));
        return (
            <div className="px-5">
                {data.map(item => {
                    !props.tourFareForm.getFieldValue(['id', `${item.passengerTypeId}`]) &&
                        props.tourFareForm.setFieldValue(['id', `${item.passengerTypeId}`], item.id);
                    return (
                        <div className="grid grid-cols-5 gap-4 py-3" key={item.passengerTypeId}>
                            <p className="col-span-5 md:col-span-2 self-center">
                                {item.passengerTypeCode === 'ADT' && <span className="text-red-500">*</span>}{' '}
                                {item.passengerTypeName}
                            </p>
                            <BaseInput
                                isHidden
                                isForm
                                type="text"
                                name={['id', `${item.passengerTypeId}`]}
                                initialValue={item.id}
                                value={item.id}
                            />
                            <BaseInput
                                isHidden
                                isForm
                                type="text"
                                name={['passengerTypeId', `${item.passengerTypeId}`]}
                                initialValue={item.passengerTypeId}
                            />
                            <BaseInput
                                className="col-span-5 md:col-span-3 mb-0"
                                isForm
                                type="number"
                                name={['seatCount', `${item.passengerTypeId}`]}
                                min={0}
                                initialValue={item.seatCount}
                                value={item.seatCount}
                                rules={
                                    item.passengerTypeCode === 'ADT'
                                        ? [
                                              () => ({
                                                  validator(_, value) {
                                                      const data =
                                                          value > 0
                                                              ? Promise.resolve()
                                                              : Promise.reject(
                                                                    new Error(i18n.t('validation.default.errorValue')),
                                                                );
                                                      return data;
                                                  },
                                              }),
                                              { pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') },
                                          ]
                                        : [{ pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') }]
                                }
                            />
                        </div>
                    );
                })}
                <div className="grid grid-cols-5 gap-4 py-3">
                    <p className="col-span-5 md:col-span-2 self-center">{i18n.t('tour.fare.total')}</p>
                    <BaseInput
                        className="col-span-5 md:col-span-3 mb-0"
                        type="number"
                        value={capacityForm}
                        rules={[{ pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') }]}
                        disable
                    />
                </div>
            </div>
        );
    };

    return (
        <Form
            form={props.tourFareForm}
            onValuesChange={onChangeValues}
            onFinish={onFinish}
            disabled={!hasModifyTourGITPermission}
        >
            {elementTourGit()}
        </Form>
    );
};
