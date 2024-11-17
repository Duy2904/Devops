import 'dayjs/locale/vi';

import { DeleteTourServiceRequest, TourGitDto, TourScheduleDto } from '@sdk/tour-operations';
import { Form, FormInstance, Tabs, TabsProps } from 'antd';
import { useCreateTourService, useDeleteTourService } from '@hooks/queries/useTourService';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { ProductTypeCheckbox } from '@fragments/Tour/TourDetail/Components/ProductService/Checkbox/ProductTypeCheckbox';
import { TourServiceHotel } from './TourServiceHotel';
import { TourServiceLandTour } from './TourServiceLandTour';
import { TourServiceTransportation } from './TourServiceTransportation';
import { TourServiceVisa } from './TourServiceVisa';
import { TourType } from '@src/types/TypeEnum';
import i18n from '@src/i18n';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useProductTypesStore } from '@store/productTypeStore';
import { useTourFormStore } from '@store/tourFormStore';

interface TransportProductProps {
    infoForm?: FormInstance;
    tourService: FormInstance;
    tourTransportationForm: FormInstance;
    tourServiceVisaForm: FormInstance;
    tourServiceHotelForm: FormInstance;
    tourServiceLandTourForm: FormInstance;
    tourSchedule?: TourScheduleDto | TourGitDto;
    isCloneTour?: boolean;
    tourType?: TourType;
}

export const TransportProduct: React.FC<TransportProductProps> = props => {
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourCreate, MyPermissions.TourUpdate]);
    const [transportFromTour, setTransportFromTour] = useState<AnyObject>([]);
    const [productTypeFromTour, setProductTypeFromTour] = useState<AnyObject>([]);
    const [activeKeyTab, setActiveKeyTab] = useState<string>();

    const { mutateAsync: deleteTourService } = useDeleteTourService();
    const { mutateAsync: createTourService } = useCreateTourService();

    const { ProductTypes } = useProductTypesStore(state => state);
    const [listCodeProductType, setListCodeProductType] = useState<AnyObject>(
        ProductTypes?.filter(item => productTypeFromTour.includes(item.id ?? '')).map(item => item.code) ?? [],
    );
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    const changeListProductType = (checkedValues: CheckboxValueType[]) => {
        const data = checkedValues
            .filter(item => !productTypeFromTour.includes(item))
            .concat(productTypeFromTour.filter((value: string) => !checkedValues.includes(value)))[0];
        const lastData = ProductTypes.find(item => item.id == data)?.code;
        if (listCodeProductType.includes(lastData)) {
            setActiveKeyTab(undefined);
            lastData == 'DiChuyen' && props.tourTransportationForm.resetFields();
        } else {
            setActiveKeyTab(lastData);
        }
        setProductTypeFromTour(checkedValues);
        setListCodeProductType(
            ProductTypes.filter(item => checkedValues.includes(item.id ?? '')).map(item => item.code),
        );
    };

    const itemTab: TabsProps['items'] = [
        listCodeProductType.find((item: string) => item === 'DiChuyen') && {
            forceRender: true,
            label: i18n.t('tour.passengerType.transport'),
            key: 'DiChuyen',
            children: (
                <TourServiceTransportation
                    tourSchedule={props.tourSchedule}
                    transportFromTour={transportFromTour}
                    setTransportFromTour={setTransportFromTour}
                    listCodeProductType={listCodeProductType}
                    tourTransportationForm={props.tourTransportationForm}
                    infoForm={props.infoForm}
                    hasModifyTourFITPermission={hasModifyTourFITPermission}
                    isCloneTour={props.isCloneTour}
                />
            ),
        },
        listCodeProductType.find((item: string) => item === 'Visa') && {
            forceRender: true,
            label: i18n.t('tour.passengerType.visa'),
            key: 'Visa',
            children: (
                <TourServiceVisa
                    tourSchedule={props.tourSchedule}
                    listCodeProductType={listCodeProductType}
                    tourVisaForm={props.tourServiceVisaForm}
                    infoForm={props.infoForm}
                    hasModifyTourFITPermission={hasModifyTourFITPermission}
                    tourType={props.tourType}
                />
            ),
        },
        listCodeProductType.find((item: string) => item === 'LuuTru') && {
            forceRender: true,
            label: i18n.t('tour.passengerType.hotel'),
            key: 'LuuTru',
            children: (
                <TourServiceHotel
                    tourSchedule={props.tourSchedule}
                    listCodeProductType={listCodeProductType}
                    tourServiceHotelForm={props.tourServiceHotelForm}
                    infoForm={props.infoForm}
                    hasModifyTourFITPermission={hasModifyTourFITPermission}
                />
            ),
        },
        listCodeProductType.find((item: string) => item === 'LandTour') && {
            forceRender: true,
            label: i18n.t('tour.passengerType.landTour'),
            key: 'LandTour',
            children: (
                <TourServiceLandTour
                    tourSchedule={props.tourSchedule}
                    listCodeProductType={listCodeProductType}
                    tourServiceLandTourForm={props.tourServiceLandTourForm}
                    infoForm={props.infoForm}
                    hasModifyTourFITPermission={hasModifyTourFITPermission}
                />
            ),
        },
    ];

    const setFormStatus = (productType: string) => {
        if (!listCodeProductType.includes(productType)) {
            return true;
        }
    };

    const onFinish = async () => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        if (!tourScheduleId) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourTransportationFormSuccess: setFormStatus('DiChuyen'),
                isTourVisaFormSuccess: setFormStatus('Visa'),
                isTourHotelFormSuccess: setFormStatus('LuuTru'),
                isTourLandTourFormSuccess: setFormStatus('LandTour'),
                isTourServiceChecked: true,
            });
            return;
        }

        const productTypeIdsRemoved =
            props.tourSchedule?.productTypeIds?.filter(
                itemInTourSchedule => !productTypeFromTour?.includes(itemInTourSchedule),
            ) ?? [];
        const productTypeIdsAdded =
            props.isCloneTour && !props.tourSchedule?.id
                ? productTypeFromTour
                : productTypeFromTour.filter(
                    (itemInForm: string) => !props.tourSchedule?.productTypeIds?.includes(itemInForm),
                );
        const fetchRemoveData =
            productTypeIdsRemoved?.length > 0
                ? productTypeIdsRemoved?.map((value: string) => {
                    const dataFetch: DeleteTourServiceRequest = {
                        tourScheduleId,
                        productTypeId: value,
                    };
                    return deleteTourService(dataFetch);
                })
                : undefined;

        const fetchAddedData =
            productTypeIdsAdded.length > 0
                ? createTourService({
                    tourScheduleId,
                    productTypeIds: productTypeIdsAdded,
                })
                : undefined;

        try {
            await Promise.all([fetchRemoveData, fetchAddedData]);
        } finally {
            if (productTypeFromTour.length == 0) {
                setTourScheduleFormStatus({
                    ...tourScheduleFormStatus,
                    isTourTransportationFormSuccess: true,
                    isTourVisaFormSuccess: true,
                    isTourHotelFormSuccess: true,
                    isTourLandTourFormSuccess: true,
                    isTourServiceChecked: true,
                });
            } else {
                setTourScheduleFormStatus({
                    ...tourScheduleFormStatus,
                    isTourTransportationFormSuccess: setFormStatus('DiChuyen'),
                    isTourVisaFormSuccess: setFormStatus('Visa'),
                    isTourHotelFormSuccess: setFormStatus('LuuTru'),
                    isTourLandTourFormSuccess: setFormStatus('LandTour'),
                    isTourServiceChecked: true,
                });
            }
        }
    };

    useEffect(() => {
        setListCodeProductType(
            ProductTypes.filter(item => productTypeFromTour.includes(item.id ?? '')).map(item => item.code),
        );
    }, [ProductTypes, productTypeFromTour]);

    useEffect(() => {
        if (props.tourSchedule) {
            setTransportFromTour(props.tourSchedule?.transportationIds ?? []);
            setProductTypeFromTour(props.tourSchedule?.productTypeIds ?? []);
        }
    }, [props.tourSchedule]);

    return (
        <div className="py-4 px-5">
            <Form form={props.tourService} onFinish={onFinish}>
                <ProductTypeCheckbox
                    inForm
                    className="customize-checkbox m-0"
                    onChange={changeListProductType}
                    initialValue={productTypeFromTour}
                    disable={!hasModifyTourFITPermission}
                />
            </Form>
            <Tabs
                type="card"
                className={`tabs-product ${listCodeProductType.length > 0 && 'mt-4'}`}
                defaultActiveKey="DiChuyen"
                activeKey={activeKeyTab}
                onChange={(value: string) => setActiveKeyTab(value)}
                size="small"
                items={itemTab}
            />
        </div>
    );
};
