import {
    CreateHotelTourServiceRequest,
    TourGitDto,
    TourScheduleDto,
    TourServiceDepositDto,
} from '@sdk/tour-operations';
import { useCreateHotelTourService, useUpdateHotelTourService } from '@hooks/queries/useTourService';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { FormInstance } from 'antd';
import { HotelOrLandTour } from './TourServiceHotelLandTour';
import i18n from '@src/i18n';
import { useProductTypesStore } from '@store/productTypeStore';
import { useTourFormStore } from '@store/tourFormStore';

export interface TourHotelProps {
    tourSchedule?: TourScheduleDto | TourGitDto;
    listCodeProductType: AnyObject;
    tourServiceHotelForm: FormInstance;
    infoForm?: FormInstance;
    hasModifyTourFITPermission?: boolean;
}

export const TourServiceHotel: React.FC<TourHotelProps> = props => {
    const [dateList, setDateList] = useState<TourServiceDepositDto[]>([]);

    const { ProductTypes } = useProductTypesStore(state => state);
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    const { mutateAsync: createHotelTourService } = useCreateHotelTourService();
    const { mutateAsync: updateHotelTourService } = useUpdateHotelTourService();

    const onFinish = async (values: AnyObject) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        const { order, id } = values;
        const data = Object.keys(order ?? []).map(key => ({
            depositDate: values?.depositDate?.[key] ?? undefined,
            order: parseInt(key) ?? undefined,
        }));
        const listAfterRemoveUndefined = data.filter(item => item.depositDate !== undefined);
        const productId = ProductTypes.find(item => item.code == 'LuuTru')?.id;
        if (!tourScheduleId || !props.tourServiceHotelForm.isFieldsTouched()) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourHotelFormSuccess: true,
            });
            return;
        }
        try {
            if (!id) {
                const dataFetch: CreateHotelTourServiceRequest = {
                    tourScheduleId,
                    productTypeId: productId,
                    depositDates: listAfterRemoveUndefined,
                };
                await createHotelTourService(dataFetch);
            } else {
                await updateHotelTourService({ id, depositDates: listAfterRemoveUndefined });
            }
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourHotelFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        if (props.tourSchedule) {
            const hotelService = props.tourSchedule?.hotelTourService;
            props.tourServiceHotelForm.setFieldsValue({
                ...hotelService,
            });
            setDateList(
                hotelService?.tourServiceDeposits?.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? [],
            );
        }
    }, [props.tourSchedule, props.tourServiceHotelForm]);

    return (
        <HotelOrLandTour
            hotelOrLandTourForm={props.tourServiceHotelForm}
            infoForm={props.infoForm}
            onFinish={onFinish}
            dateList={dateList}
            setDateList={setDateList}
            titleTourService={i18n.t('tour.passengerType.hotel')}
            hasModifyTourFITPermission={props.hasModifyTourFITPermission}
        />
    );
};
