import { CreateLandTourServiceRequest, TourGitDto, TourScheduleDto, TourServiceDepositDto } from '@sdk/tour-operations';
import { useCreateLandTourTourService, useUpdateLandTourTourService } from '@hooks/queries/useTourService';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { FormInstance } from 'antd';
import { HotelOrLandTour } from './TourServiceHotelLandTour';
import i18n from '@src/i18n';
import { useProductTypesStore } from '@store/productTypeStore';
import { useTourFormStore } from '@store/tourFormStore';

export interface TourServiceLandTourProps {
    tourSchedule?: TourScheduleDto | TourGitDto;
    listCodeProductType: AnyObject;
    tourServiceLandTourForm: FormInstance;
    infoForm?: FormInstance;
    hasModifyTourFITPermission?: boolean;
}

export const TourServiceLandTour: React.FC<TourServiceLandTourProps> = props => {
    const [dateList, setDateList] = useState<TourServiceDepositDto[]>([]);

    const { ProductTypes } = useProductTypesStore(state => state);
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    const { mutateAsync: createLandTourTourService } = useCreateLandTourTourService();
    const { mutateAsync: updateLandTourTourService } = useUpdateLandTourTourService();

    const onFinish = async (values: AnyObject) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        const { order, id } = values;
        const data = Object.keys(order ?? []).map(key => ({
            depositDate: values?.depositDate?.[key] ?? undefined,
            order: parseInt(key) ?? undefined,
        }));
        const listAfterRemoveUndefined = data.filter(item => item.depositDate !== undefined);
        const productId = ProductTypes.find(item => item.code == 'LandTour')?.id;
        if (!tourScheduleId || !props.tourServiceLandTourForm.isFieldsTouched()) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourLandTourFormSuccess: true,
            });
            return;
        }
        try {
            if (!id) {
                const dataFetch: CreateLandTourServiceRequest = {
                    tourScheduleId,
                    productTypeId: productId,
                    depositDates: listAfterRemoveUndefined,
                };
                await createLandTourTourService(dataFetch);
            } else {
                await updateLandTourTourService({ id, depositDates: listAfterRemoveUndefined });
            }
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourLandTourFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        if (props.tourSchedule) {
            const landTourService = props.tourSchedule?.landTourService;
            props.tourServiceLandTourForm.setFieldsValue({
                ...landTourService,
            });
            setDateList(
                landTourService?.tourServiceDeposits?.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ?? [],
            );
        }
    }, [props.tourSchedule, props.tourServiceLandTourForm]);

    return (
        <HotelOrLandTour
            hotelOrLandTourForm={props.tourServiceLandTourForm}
            infoForm={props.infoForm}
            onFinish={onFinish}
            dateList={dateList}
            setDateList={setDateList}
            titleTourService={i18n.t('tour.passengerType.landTour')}
            hasModifyTourFITPermission={props.hasModifyTourFITPermission}
        />
    );
};
