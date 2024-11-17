import 'dayjs/locale/vi';

import { Col, Collapse, CollapseProps, Form, UploadFile } from 'antd';
import {
    CreateTourScheduleRequest,
    DiscountOnType,
    TourGitDto,
    TourInforMediaSummaryDto,
    TourScheduleDto,
    UpdateTourScheduleRequest,
} from '@sdk/tour-operations';
import { GenerateCodeProps, generateCode } from '@utils/generateCode';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import {
    canEditData,
    changeDataCloneTour,
    changeFileName,
    customerCode,
    fieldValueRenderFIT,
    routeCode,
    setCateTour,
    tourCategoryCode,
    tourType,
    twoLetterCountryCode,
} from '../Feature';
import { toastSuccess, toastWarning } from '@components/ui/Toast/Toast';
import {
    useCreateTourFit,
    useGetTourFitByCode,
    useGetTourScheduleUseId,
    useUpdateTourFit,
} from '@fragments/Tour/hooks/useTourFit';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AnyObject } from 'antd/es/_util/type';
import Can from '@components/common/Can';
import { CreateHeader } from '../Components/Header/CreateHeader';
import { DepositRule } from './DepositRule';
import { EditHeader } from '../Components/Header/EditHeader';
import { GeneralInfo } from '../Components/GeneralInfo/GeneralInfo';
import { History } from '@fragments/History';
import { Loading } from '@components/customizes/Loading/Loading';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { MediaTour } from '../Components/Media';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PromotionTour } from '../Components/Promotion';
import { Seller } from '../Components/Seller';
import { TourAmount } from '../Components/TourAmount';
import { TourCancelCondition } from '../TourFit/TourCondition/TourCancelCondition';
import { TourCommission } from '../TourFit/TourCommission/TourCommission';
import { TourDiscount } from '../TourFit/TourDiscount';
import { TourGuide } from '../Components/TourGuide';
import { TourInfo } from '../Components/ProgramInfo/TourInfo';
import { TourType } from '@src/types/TypeEnum';
import { TransportProduct } from '../Components/ProductService/TransportProduct';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { rootPathsNew } from '@src/routers/newRoute';
import { useCustomersStore } from '@store/customersStore';
import { useDebouncedCallback } from 'use-debounce';
import { useGetRouteByDestinationLocationId } from '@components/customizes/Select/Route/useRoute';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourCategorysStore } from '@store/tourCategoryStore';
import { useTourFormStore } from '@store/tourFormStore';
import { useTourLocationsStore } from '@store/tourLocationStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import { useTourTypesStore } from '@store/tourTypeStore';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export interface TourFormControlProps {
    tourType: TourType;
}

export interface RouteCloneState {
    clonedCode?: string;
}

export const TourFitFormControl: React.FC<TourFormControlProps> = props => {
    const [form] = Form.useForm();
    const [tourService] = Form.useForm();
    const [tourTransportationForm] = Form.useForm();
    const [tourServiceVisaForm] = Form.useForm();
    const [tourServiceHotelForm] = Form.useForm();
    const [tourServiceLandTourForm] = Form.useForm();
    const [tourFareForm] = Form.useForm();
    const [tourGuideForm] = Form.useForm();
    const [surchargeForm] = Form.useForm();
    const [tourDiscountForm] = Form.useForm();
    const [tourCancelForm] = Form.useForm();
    const [tourAgentComForm] = Form.useForm();
    const [tourReferrerComForm] = Form.useForm();
    const [uploadFileForm] = Form.useForm();
    const formUseWatch = Form.useWatch([], form);

    const navigate = useNavigate();
    const { tourCode } = useParams<string>();
    const { clonedCode } = (useLocation().state ?? { clonedCode: false }) as RouteCloneState;

    const [isLoading, setIsLoading] = useState<boolean>(true); // loading when get data the first time
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false); // loading when button create/edit form
    const [isBack, setIsBack] = useState<boolean>(false); // check form is updating can't back another view
    const [isOB, setIsOB] = useState<boolean>(false); // check tour is Outbound
    const [tourCodeGen, setTourCodeGen] = useState<string>(''); // get & set value for code tour after generate
    const [files, setFiles] = useState<UploadFile[]>([]); // get & set value for media file of tour
    const [tourScheduleId, setTourScheduleId] = useState<string>(''); // get & set value for tour Id
    const [changeStatus, setChangeStatus] = useState<boolean>(false); // check status of tour
    const [isCloneTour, setIsCloneTour] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]);

    const isCloned = !tourCode && clonedCode;
    const createdDate = new Date();
    const offset = (createdDate.getTimezoneOffset() / 60) * -1;
    const {
        tourSchedule,
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);
    const {
        tourScheduleFormStatus,
        actions: { setMediaList, setTourScheduleFormStatus },
    } = useTourFormStore(state => state);
    const { locations } = useTourLocationsStore(state => state);
    const { TourCategories } = useTourCategorysStore(state => state);
    const { customers } = useCustomersStore(state => state);
    const { tourTypes } = useTourTypesStore(state => state);

    const { mutateAsync: getTourScheduleId } = useGetTourScheduleUseId();
    const { data: tourDetailByCode, refetch } = useGetTourFitByCode(tourCode ? tourCode : clonedCode!);
    const { mutateAsync: createTourSchedule } = useCreateTourFit();
    const { mutateAsync: updateTourSchedule } = useUpdateTourFit();
    const { data: dataRoute } = useGetRouteByDestinationLocationId(formUseWatch?.destinationId);

    const cloneTour = useCallback(
        (response: TourScheduleDto | TourGitDto) => {
            setIsCloneTour(true);
            const initFiles =
                response.tourScheduleMedias?.map((item: TourInforMediaSummaryDto) => {
                    const tempName = changeFileName(item, response);
                    const resMedia = {
                        fileName: tempName,
                        name: tempName,
                        url: `${item.mediaFileFilePath}`,
                        uid: item.id,
                    } as UploadFile;
                    return resMedia;
                }) ?? [];
            setFiles(initFiles);
            setMediaList(initFiles);
            const resDataChange = changeDataCloneTour(response);
            setTourSchedule(resDataChange);
            form.setFieldsValue(fieldValueRenderFIT(response));
        },
        [form, setMediaList, setTourSchedule],
    );

    const fetchAndUpdateForm = useCallback(
        (response: TourScheduleDto) => {
            form.setFieldsValue({
                ...response,
                departureDate: response.departureDate ? dayjs(response.departureDate) : null,
                endDate: response.endDate ? dayjs(response.endDate) : null,
                saleStartDate: response.saleStartDate ? dayjs(response.saleStartDate) : null,
                saleEndDate: response.saleEndDate ? dayjs(response.saleEndDate) : null,
                discountOnTypes: response.discountOnTypes?.filter(item => item !== DiscountOnType.EarlyBirdLastMinute),
            });
            setTourSchedule(response);
            setTourCodeGen(response.tourCode!);
        },
        [form, setTourSchedule],
    );

    const fetchTourSchedule = useCallback(
        async (tourCode: string | undefined) => {
            if (!tourCode) return setIsLoading(false);
            if (tourDetailByCode) {
                setTourScheduleId(tourDetailByCode.id ?? '');
                if (isCloned) {
                    cloneTour(tourDetailByCode);
                } else {
                    fetchAndUpdateForm(tourDetailByCode);
                }
                setIsLoading(false);
                setIsOB(prev => {
                    prev = true;
                    return prev;
                });
            }
        },
        [tourDetailByCode, isCloned, cloneTour, fetchAndUpdateForm],
    );

    const handleValuesChange = useDebouncedCallback((_: AnyObject, allValues: AnyObject) => {
        if (tourSchedule?.status && !canEditData(tourSchedule?.status)) return null;

        const { tourTypeId, destinationLocationId, routeId, departureDate, customerId, tourCategoryId, tourNature } =
            allValues;

        if (tourCategoryId && tourTypeId && destinationLocationId && customerId && tourNature) {
            const tourCategoryCodeRes = tourCategoryCode(TourCategories, allValues);
            const isCheckOB = setCateTour(tourCategoryCodeRes);
            const tourTypeRes = tourType(tourTypes, tourTypeId);
            const twoLetterCountryCodeRes = twoLetterCountryCode(locations, destinationLocationId);
            const customerCodeRes = customerCode(customers, customerId);
            const routeCodeRes = routeId && routeCode(dataRoute?.data ?? [], routeId);
            const listData: GenerateCodeProps = {
                tourType: tourTypeRes,
                twoLetterCode: twoLetterCountryCodeRes,
                tourCategoryCode: tourCategoryCodeRes,
                codeRoute: routeCodeRes,
                departureDate: departureDate ?? undefined,
                currentDate: dayjs(createdDate),
                customerCode: customerCodeRes,
                isOB: isCheckOB ? isCheckOB : false,
                tourNatureType: tourNature,
            };

            const dataCodeGenTemp: string = departureDate && generateCode(listData, props.tourType);
            const dataCodeGen = !tourSchedule.tourCode?.startsWith(dataCodeGenTemp)
                ? dataCodeGenTemp
                : tourSchedule.tourCode;

            if (dataCodeGen) {
                setTourCodeGen(dataCodeGen);
            }

            const formValues = {
                tourCode: dataCodeGen,
                ...(isCloned && {}),
            };

            form.setFieldsValue(formValues);

            return dataCodeGen;
        }
        return null;
    }, 500);

    const onSubmit = async () => {
        const commonForms = [
            { title: i18n.t('tour.formTour.generalInfo'), form: form.validateFields() },
            {
                title: `${i18n.t('tour.fare.title')}`,
                form: tourFareForm.validateFields(),
            },
            {
                title: `${i18n.t('tour.formTour.service')}: ${i18n.t('tour.passengerType.transport')}`,
                form: tourTransportationForm.validateFields(),
            },
            {
                title: `${i18n.t('tour.formTour.service')}: ${i18n.t('tour.passengerType.visa')}`,
                form: tourServiceVisaForm.validateFields(),
            },
            {
                title: `${i18n.t('tour.formTour.service')}: ${i18n.t('tour.passengerType.hotel')}`,
                form: tourServiceHotelForm.validateFields(),
            },
            {
                title: `${i18n.t('tour.formTour.service')}: ${i18n.t('tour.passengerType.landTour')}`,
                form: tourServiceLandTourForm.validateFields(),
            },
            { title: i18n.t('tour.formTour.tourGuide'), form: tourGuideForm.validateFields() },
            { title: i18n.t('tour.formTour.cancelTour'), form: tourCancelForm.validateFields() },
            { title: i18n.t('tour.formTour.media'), form: uploadFileForm.validateFields() },
        ];

        const onlyFitForm = [
            { title: i18n.t('tour.surcharge.title'), form: surchargeForm.validateFields() },
            {
                title: `${i18n.t('tour.formTour.commission')} ${i18n.t('tour.commission.agent')}`,
                form: tourAgentComForm.validateFields(),
            },
            {
                title: `${i18n.t('tour.formTour.commission')} ${i18n.t('tour.commission.referrer')}`,
                form: tourReferrerComForm.validateFields(),
            },
            {
                title: i18n.t('CTKM EarlyBird, LastMinute'),
                form: tourDiscountForm.validateFields(),
            },
        ];

        const formListValidate = [...commonForms, ...onlyFitForm];

        try {
            const errors = await Promise.all(
                formListValidate.map(async item => {
                    try {
                        await item.form;
                        return null;
                    } catch (error) {
                        return item.title;
                    }
                }),
            );
            const filteredErrors = errors.filter(error => error !== null);
            if (filteredErrors.length > 0) {
                const errorMessage: ReactNode = filteredErrors.map(error => <li key={error}>{error}</li>);
                toastWarning(i18n.t('validation.tour.validForm'), <ul>{errorMessage}</ul>);
            } else {
                form.submit();
            }
        } catch (errors) {
            return errors;
        }
    };

    const onFinish = async (values: CreateTourScheduleRequest | UpdateTourScheduleRequest) => {
        setIsLoadingButton(true);
        try {
            if (tourSchedule?.id && !isCloned) {
                await updateForm(values);
            } else {
                await createForm(values);
            }
        } catch (error) {
            setIsLoadingButton(false);
            return error;
        }
    };

    const createForm = async (values: CreateTourScheduleRequest) => {
        let codes;
        if (isCloned) {
            codes = handleValuesChange({}, values);
        }
        const data = {
            ...values,
            tourCode: tourCodeGen || (codes ?? ''),
            createdDate: createdDate,
            tourScheduleId: tourScheduleId,
            offset: offset,
        };
        data.saleStartDate = dayjs(values.saleStartDate).startOf('day').toDate();
        data.saleEndDate = dayjs(values.saleEndDate).endOf('day').toDate();
        const discountTypes = (values.discountOnTypes ?? []).filter(
            item => item !== DiscountOnType.EarlyBirdLastMinute,
        );
        data.discountOnTypes = [...discountTypes, DiscountOnType.EarlyBirdLastMinute];

        const responseScheduleId = await createTourSchedule({ data });
        if (responseScheduleId) {
            const { tourCode: newTourCode } = await getTourScheduleId(responseScheduleId);
            setTourScheduleId(responseScheduleId);
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isInfoFormSuccess: true,
                tourCode: newTourCode ?? '',
                tourScheduleId: responseScheduleId,
                message: i18n.t('message.default.createContentSuccess'),
            });
        }
    };

    const updateForm = async (values: UpdateTourScheduleRequest) => {
        if (!tourSchedule.id) return;
        const data = {
            ...values,
            id: tourSchedule.id,
        };
        const discountTypes = (values.discountOnTypes ?? []).filter(
            item => item !== DiscountOnType.EarlyBirdLastMinute,
        );
        const responseSchedule = await updateTourSchedule({
            id: tourSchedule.id,
            data: {
                ...data,
                offset: offset,
                saleStartDate: dayjs(data.saleStartDate).startOf('day').toDate(),
                saleEndDate: dayjs(data.saleEndDate).endOf('day').toDate(),
                discountOnTypes: [...discountTypes, DiscountOnType.EarlyBirdLastMinute],
            },
        });
        if (responseSchedule) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isInfoFormSuccess: true,
                tourCode: responseSchedule?.tourCode,
                tourScheduleId: responseSchedule?.id,
                message: i18n.t('message.default.updateContentSuccess'),
            });
        }
    };

    const itemCollapseLeft: CollapseProps['items'] = [
        {
            key: '1',
            label: i18n.t('tour.formTour.generalInfo'),
            children: (
                <Form
                    form={form}
                    initialValues={tourSchedule ?? []}
                    layout="vertical"
                    onFinish={onFinish}
                    preserve={false}
                    onValuesChange={handleValuesChange}
                    disabled={!hasModifyTourFITPermission}
                >
                    <GeneralInfo
                        form={form}
                        isOB={isOB}
                        tourCode={tourCodeGen}
                        isCloned={isCloneTour}
                        tourType={props.tourType}
                        tourSchedule={tourSchedule}
                    />
                </Form>
            ),
        },
    ];

    const itemCollapseRight: CollapseProps['items'] = [
        {
            key: '1',
            label: i18n.t('tour.formTour.program'),
            children: (
                <Form
                    form={form}
                    initialValues={tourSchedule ?? []}
                    layout="vertical"
                    onFinish={onFinish}
                    preserve={false}
                    onValuesChange={handleValuesChange}
                    disabled={!hasModifyTourFITPermission}
                >
                    <div className="p-5">
                        <TourInfo
                            form={form}
                            tourType={props.tourType}
                            isCloneTour={isCloneTour}
                            tourSchedule={tourSchedule}
                        />
                    </div>
                </Form>
            ),
        },
        {
            key: '2',
            label: i18n.t('tour.formTour.service'),
            children: (
                <TransportProduct
                    infoForm={form}
                    tourService={tourService}
                    tourTransportationForm={tourTransportationForm}
                    tourServiceVisaForm={tourServiceVisaForm}
                    tourServiceHotelForm={tourServiceHotelForm}
                    tourServiceLandTourForm={tourServiceLandTourForm}
                    tourSchedule={tourSchedule}
                    isCloneTour={isCloneTour}
                    tourType={props.tourType}
                />
            ),
        },
        {
            key: '3',
            label: <>{i18n.t('tour.formTour.payment')}</>,
            children: (
                <TourAmount
                    form={form}
                    tourFareForm={tourFareForm}
                    surchargeForm={surchargeForm}
                    tourSchedule={tourSchedule}
                    tourType={props.tourType}
                />
            ),
        },
        {
            key: '4',
            label: <>{i18n.t('tour.formTour.condition')}</>,
            children: (
                <Col className="px-5">
                    <Form
                        form={form}
                        initialValues={tourSchedule ?? []}
                        layout="vertical"
                        onFinish={onFinish}
                        preserve={false}
                        onValuesChange={handleValuesChange}
                        disabled={!hasModifyTourFITPermission}
                    >
                        <DepositRule form={form} tourSchedule={tourSchedule} />
                        <PromotionTour />
                    </Form>
                    <TourDiscount form={form} tourDiscountForm={tourDiscountForm} tourSchedule={tourSchedule} />
                    <TourCancelCondition
                        form={form}
                        tourCancelForm={tourCancelForm}
                        tourSchedule={tourSchedule}
                        isCloned={isCloneTour}
                    />
                    <TourCommission
                        agentForm={tourAgentComForm}
                        referrerForm={tourReferrerComForm}
                        tourSchedule={tourSchedule}
                    />
                </Col>
            ),
        },
        {
            key: '5',
            label: i18n.t('tour.formTour.tourGuide'),
            children: (
                <div className="py-5">
                    <TourGuide tourSchedule={tourSchedule} tourGuideForm={tourGuideForm} />
                </div>
            ),
        },
        {
            key: '6',
            label: i18n.t('tour.formTour.seller'),
            children: (
                <Form
                    form={form}
                    initialValues={tourSchedule ?? []}
                    layout="vertical"
                    onFinish={onFinish}
                    preserve={false}
                    onValuesChange={handleValuesChange}
                    disabled={!hasModifyTourFITPermission}
                >
                    <Seller form={form} />
                </Form>
            ),
        },
        {
            key: '7',
            label: i18n.t('tour.formTour.media'),
            children: (
                <MediaTour
                    files={files}
                    uploadFileForm={uploadFileForm}
                    tourType={props.tourType}
                    tourData={tourSchedule}
                />
            ),
        },
    ];

    const returnTargetPath = useCallback(() => {
        let targetPath;
        if (isBack) {
            targetPath = `${rootPathsNew.tourFit}`;
        } else {
            targetPath = `${rootPaths.fitTourForm}/${tourScheduleFormStatus.tourCode}`;
        }

        return targetPath;
    }, [isBack, tourScheduleFormStatus.tourCode]);

    // Check all form is success.
    const checkCommonSuccessStatus = useCallback(() => {
        const successStatus = [
            tourScheduleFormStatus.isInfoFormSuccess,
            tourScheduleFormStatus.isTourServiceChecked,
            tourScheduleFormStatus.isTourTransportationFormSuccess,
            tourScheduleFormStatus.isTourVisaFormSuccess,
            tourScheduleFormStatus.isTourHotelFormSuccess,
            tourScheduleFormStatus.isTourLandTourFormSuccess,
            tourScheduleFormStatus.isTourFareFormSuccess,
            tourScheduleFormStatus.isTourGuideFormSuccess,
            tourScheduleFormStatus.isUploadMediaFormSuccess,
            tourScheduleFormStatus.isSurchargeFormSuccess,
            tourScheduleFormStatus.isTourCancelFormSuccess,
            tourScheduleFormStatus.isTourAgentComFormSuccess,
            tourScheduleFormStatus.isTourReferrerComFormSuccess,
            tourScheduleFormStatus.isTourDiscountFormSuccess,
        ];

        return successStatus.every(success => success);
    }, [tourScheduleFormStatus]);

    const handleSuccessStatus = useCallback(() => {
        if (checkCommonSuccessStatus()) {
            setTourScheduleFormStatus({});
            toastSuccess('', tourScheduleFormStatus.message ?? '');

            // Create tourSchedule successful.
            const targetPath = returnTargetPath();
            navigate(targetPath);
            setIsLoadingButton(false);

            if (!isBack) {
                setIsBack(false);
                setIsCloneTour(false);
                tourCode == tourCodeGen ? refetch() : fetchTourSchedule(tourScheduleFormStatus.tourCode);
            }
        }
    }, [
        checkCommonSuccessStatus,
        fetchTourSchedule,
        isBack,
        navigate,
        refetch,
        returnTargetPath,
        setTourScheduleFormStatus,
        tourCode,
        tourCodeGen,
        tourScheduleFormStatus.message,
        tourScheduleFormStatus.tourCode,
    ]);

    const handleFormSubmission = useCallback(() => {
        const formStatus = tourScheduleFormStatus;
        if (formStatus.tourScheduleId) {
            const forms = [
                {
                    form: tourService,
                    success: formStatus.isInfoFormSuccess && formStatus.isTourServiceChecked == undefined,
                },
                {
                    form: tourTransportationForm,
                    success: formStatus.isTourTransportationFormSuccess == undefined,
                },
                { form: tourServiceVisaForm, success: formStatus.isTourVisaFormSuccess == undefined },
                { form: tourServiceHotelForm, success: formStatus.isTourHotelFormSuccess == undefined },
                { form: tourServiceLandTourForm, success: formStatus.isTourLandTourFormSuccess == undefined },
                {
                    form: tourFareForm,
                    success: formStatus.isTourFareFormSuccess == undefined,
                },
                { form: surchargeForm, success: formStatus.isSurchargeFormSuccess == undefined },
                { form: tourDiscountForm, success: formStatus.isTourDiscountFormSuccess == undefined },
                { form: tourCancelForm, success: formStatus.isTourCancelFormSuccess == undefined },
                { form: tourAgentComForm, success: formStatus.isTourAgentComFormSuccess == undefined },
                { form: tourReferrerComForm, success: formStatus.isTourReferrerComFormSuccess == undefined },
                { form: tourGuideForm, success: formStatus.isTourGuideFormSuccess == undefined },
                { form: uploadFileForm, success: formStatus.isUploadMediaFormSuccess == undefined },
            ];

            for (const { form, success } of forms) {
                if (success) {
                    form.submit();
                    return;
                }
            }
        }
    }, [
        surchargeForm,
        tourAgentComForm,
        tourCancelForm,
        tourDiscountForm,
        tourFareForm,
        tourGuideForm,
        tourReferrerComForm,
        tourScheduleFormStatus,
        tourService,
        tourServiceHotelForm,
        tourServiceLandTourForm,
        tourServiceVisaForm,
        tourTransportationForm,
        uploadFileForm,
    ]);

    useEffect(() => {
        handleSuccessStatus();
        handleFormSubmission();
    }, [handleFormSubmission, handleSuccessStatus]);

    useEffect(() => {
        if (!tourCode) {
            setTourSchedule({});
        }
    }, [setTourSchedule, tourCode]);

    useEffect(() => {
        fetchTourSchedule(tourCode ?? clonedCode);
    }, [clonedCode, fetchTourSchedule, tourCode]);

    useEffect(() => {
        if (changeStatus) {
            refetch();
        }
    }, [changeStatus, refetch]);

    return (
        <Can
            permissions={[
                MyPermissions.TourFitView,
                MyPermissions.AgencyTourFitView,
                MyPermissions.TourFitCreate,
                MyPermissions.TourFitUpdate,
            ]}
        >
            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex flex-col relative">
                    {isLoadingButton && <LoadingSubmit contentLoading={i18n.t('default.processing')} />}
                    <div>
                        {!tourCode || isCloned ? (
                            <Can permissions={[MyPermissions.TourFitCreate]}>
                                <CreateHeader
                                    form={form}
                                    onClick={onSubmit}
                                    isLoading={isLoadingButton}
                                    backUrl={rootPathsNew.tourFit}
                                    tourType={props.tourType}
                                />
                            </Can>
                        ) : (
                            <EditHeader
                                tourSchedule={tourSchedule}
                                form={form}
                                onClick={() => {
                                    onSubmit();
                                    setIsBack(true);
                                }}
                                onClickNotBack={onSubmit}
                                isLoading={isLoadingButton}
                                changeStatus={changeStatus}
                                setChangeStatus={setChangeStatus}
                                backUrl={rootPathsNew.tourFit}
                                tourType={props.tourType}
                                setIsOpenHistory={setIsOpenHistory}
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-4 lg:h-[calc(100vh_-_210px)] overflow-auto">
                            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseLeft} />
                        </div>
                        <div className="col-span-12 lg:col-span-8 lg:h-[calc(100vh_-_210px)] overflow-auto">
                            <Collapse
                                defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']}
                                expandIconPosition={'end'}
                                items={itemCollapseRight}
                            />
                        </div>
                    </div>
                    {/* Lịch sử thao tác */}
                    {tourScheduleId && (
                        <History
                            tableName="TourSchedule"
                            title={i18n.t('Lịch sử thao tác')}
                            id={tourScheduleId}
                            isOpenHistory={isOpenHistory}
                            setIsOpenHistory={setIsOpenHistory}
                        />
                    )}
                </div>
            )}
        </Can>
    );
};
