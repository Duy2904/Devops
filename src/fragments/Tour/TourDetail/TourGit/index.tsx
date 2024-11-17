import 'dayjs/locale/vi';

import { Collapse, CollapseProps, Form, UploadFile } from 'antd';
import {
    CreateTourGitRequest,
    DiscountOnType,
    TourGitDto,
    TourInforMediaSummaryDto,
    UpdateTourGitRequest,
} from '@sdk/tour-operations';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import {
    canEditData,
    changeDataCloneTour,
    changeFileName,
    fieldValueRenderGIT,
    setCateTour,
    tourCategoryCode,
    tourType,
    twoLetterCountryCode,
} from '../Feature';
import { toastSuccess, toastWarning } from '@components/ui/Toast/Toast';
import {
    useCreateTourGit,
    useGetTourGitByCode,
    useGetTourGitUseId,
    useUpdateTourGit,
} from '@fragments/Tour/hooks/useTourGit';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AnyObject } from 'antd/es/_util/type';
import Can from '@components/common/Can';
import { CreateHeader } from '../Components/Header/CreateHeader';
import { EditHeader } from '../Components/Header/EditHeader';
import { GeneralInfo } from '../Components/GeneralInfo/GeneralInfo';
import { History } from '@fragments/History';
import { Loading } from '@components/customizes/Loading/Loading';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { MediaTour } from '../Components/Media';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { Seller } from '../Components/Seller';
import { TourAmount } from '../Components/TourAmount';
import { TourGuide } from '../Components/TourGuide';
import { TourType } from '@src/types/TypeEnum';
import { TransportProduct } from '../Components/ProductService/TransportProduct';
import dayjs from 'dayjs';
import { generateCode } from '@utils/generateCode';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useDebouncedCallback } from 'use-debounce';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourCategorysStore } from '@store/tourCategoryStore';
import { useTourFormStore } from '@store/tourFormStore';
import { useTourLocationsStore } from '@store/tourLocationStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import { useTourTypesStore } from '@store/tourTypeStore';
import utc from 'dayjs/plugin/utc';
import { PersonContact } from './PersonContact';

dayjs.extend(utc);

export interface TourFormControlProps {
    tourType: TourType;
}

export interface RouteCloneState {
    clonedCode?: string;
}

export const TourGitFormControl: React.FC<TourFormControlProps> = props => {
    const [form] = Form.useForm();
    const [tourService] = Form.useForm();
    const [tourTransportationForm] = Form.useForm();
    const [tourServiceVisaForm] = Form.useForm();
    const [tourServiceHotelForm] = Form.useForm();
    const [tourServiceLandTourForm] = Form.useForm();
    const [tourFareForm] = Form.useForm();
    const [tourGuideForm] = Form.useForm();
    const [surchargeForm] = Form.useForm();
    const [tourCancelForm] = Form.useForm();
    const [uploadFileForm] = Form.useForm();
    const [personContactForm] = Form.useForm();

    const navigate = useNavigate();
    const { tourCode } = useParams<string>();
    const { clonedCode } = (useLocation().state ?? { clonedCode: false }) as RouteCloneState;
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]);

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

    const isCloned = !tourCode && clonedCode;
    const createdDate = new Date();
    const offset = (createdDate.getTimezoneOffset() / 60) * -1;

    // Store
    const {
        tourSchedule,
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);
    const {
        tourScheduleFormStatus,
        totalCapacity,
        actions: { setMediaList, setTourScheduleFormStatus },
    } = useTourFormStore(state => state);
    const { locations } = useTourLocationsStore(state => state);
    const { TourCategories } = useTourCategorysStore(state => state);
    const { tourTypes } = useTourTypesStore(state => state);

    // Mutate
    const { mutateAsync: getTourGitUseId } = useGetTourGitUseId();
    const { data: getTourGitUseCode, refetch } = useGetTourGitByCode(tourCode ? tourCode : clonedCode!);
    const { mutateAsync: createTourGit } = useCreateTourGit();
    const { mutateAsync: updateTourGit } = useUpdateTourGit();

    const cloneTour = useCallback(
        (response: TourGitDto) => {
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
            form.setFieldsValue({ ...fieldValueRenderGIT(response), travellerId: response?.traveller?.id });
        },
        [form, setMediaList, setTourSchedule],
    );

    const fetchAndUpdateForm = useCallback(
        (response: TourGitDto) => {
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
            if (getTourGitUseCode) {
                setTourScheduleId(getTourGitUseCode.id ?? '');
                if (isCloned) {
                    cloneTour(getTourGitUseCode);
                } else {
                    fetchAndUpdateForm(getTourGitUseCode);
                }
                setIsLoading(false);
                setIsOB(prev => {
                    prev = true;
                    return prev;
                });
            }
        },
        [cloneTour, fetchAndUpdateForm, getTourGitUseCode, isCloned],
    );

    const handleValuesChange = useDebouncedCallback((_: AnyObject, allValues: AnyObject) => {
        if (tourSchedule?.status && !canEditData(tourSchedule?.status)) return null;

        const { tourTypeId, destinationLocationId, departureDate, tourCategoryId } = allValues;
        if (tourCategoryId && tourTypeId && destinationLocationId && departureDate) {
            const tourCategoryCodeRes = tourCategoryCode(TourCategories, allValues);
            const isCheckOB = setCateTour(tourCategoryCodeRes);
            const tourTypeRes = tourType(tourTypes, tourTypeId);
            const twoLetterCountryCodeRes = twoLetterCountryCode(locations, destinationLocationId);
            const listData = {
                tourType: tourTypeRes,
                twoLetterCode: twoLetterCountryCodeRes,
                tourCategoryCode: tourCategoryCodeRes,
                departureDate,
                currentDate: dayjs(createdDate),
                isOB: isCheckOB ? isCheckOB : false,
            };

            const dataCodeGenTemp = generateCode(listData, props.tourType);
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
    }, 1000);

    const submitAllForm = useCallback(async () => {
        const forms = [
            { title: i18n.t('tour.formTour.generalInfo'), form: form.validateFields() },
            { title: i18n.t('tour.formTour.personContact'), form: personContactForm.validateFields() },
            {
                title: i18n.t('tour.formTour.quantityCustomer'),
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

        const formListValidate = forms;
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
    }, [
        form,
        personContactForm,
        tourCancelForm,
        tourFareForm,
        tourGuideForm,
        tourServiceHotelForm,
        tourServiceLandTourForm,
        tourServiceVisaForm,
        tourTransportationForm,
        uploadFileForm,
    ]);

    const onSubmit = async () => {
        submitAllForm();
    };

    const onFinish = async (values: AnyObject) => {
        setIsLoadingButton(true);
        try {
            if (tourSchedule?.id && !isCloned) {
                await updateForm(values as UpdateTourGitRequest);
            } else {
                await createForm(values as CreateTourGitRequest);
            }
        } catch (error) {
            setIsLoadingButton(false);
            return error;
        }
    };

    const createForm = async (values: CreateTourGitRequest) => {
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
        delete data.itineraryCode;

        const responseScheduleId = await createTourGit({ data: { ...data, capacity: totalCapacity } });
        if (responseScheduleId) {
            const { tourCode: newTourCode } = await getTourGitUseId(responseScheduleId);
            setTourScheduleId(responseScheduleId);
            if (newTourCode) {
                setTourScheduleFormStatus({
                    ...tourScheduleFormStatus,
                    isInfoFormSuccess: true,
                    tourCode: newTourCode,
                    tourScheduleId: responseScheduleId,
                    message: i18n.t('message.default.createContentSuccess'),
                });
            }
        }
    };

    const updateForm = async (values: UpdateTourGitRequest) => {
        if (!tourSchedule.id) return;

        const data = {
            ...values,
            id: tourSchedule.id,
        };
        const responseSchedule = await updateTourGit({
            id: tourSchedule.id,
            data: {
                ...data,
                capacity: totalCapacity,
                offset: offset,
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
            key: '2',
            label: <>{i18n.t('tour.formTour.quantityCustomer')}</>,
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
            key: '3',
            label: <>{i18n.t('tour.formTour.personContact')}</>,
            children: (
                <PersonContact
                    form={form}
                    formContact={personContactForm}
                    travellerId={(tourSchedule as TourGitDto)?.traveller?.id}
                />
            ),
        },
        {
            key: '4',
            label: i18n.t('tour.formTour.tourGuide'),
            children: (
                <div className="py-5">
                    <TourGuide tourSchedule={tourSchedule} tourGuideForm={tourGuideForm} />
                </div>
            ),
        },
        {
            key: '5',
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
            key: '6',
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
            targetPath = `${rootPaths.gitTours}`;
        } else {
            targetPath = `${rootPaths.gitTourForm}/${tourScheduleFormStatus.tourCode}`;
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
        tourFareForm,
        tourGuideForm,
        tourScheduleFormStatus,
        tourService,
        tourServiceHotelForm,
        tourServiceLandTourForm,
        tourServiceVisaForm,
        tourTransportationForm,
        uploadFileForm,
    ]);

    useEffect(() => {
        handleFormSubmission();
        handleSuccessStatus();
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
        <Can permissions={[MyPermissions.TourGitView, MyPermissions.TourGitCreate, MyPermissions.TourGitUpdate]}>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex flex-col relative">
                    {isLoadingButton && <LoadingSubmit contentLoading={i18n.t('default.processing')} />}
                    <div className="p-4">
                        {!tourCode || isCloned ? (
                            <Can permissions={[MyPermissions.TourGitCreate]}>
                                <CreateHeader
                                    form={form}
                                    onClick={onSubmit}
                                    isLoading={isLoadingButton}
                                    backUrl={rootPaths.gitTours}
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
                                backUrl={rootPaths.gitTours}
                                tourType={props.tourType}
                                setIsOpenHistory={setIsOpenHistory}
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-12 gap-4 px-4">
                        <div className="col-span-12 lg:col-span-4 lg:h-[calc(100vh_-_240px)] overflow-auto">
                            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseLeft} />
                        </div>
                        <div className="col-span-12 lg:col-span-8 lg:h-[calc(100vh_-_240px)] overflow-auto">
                            <Collapse
                                defaultActiveKey={['1', '2', '3', '4', '5', '6']}
                                expandIconPosition={'end'}
                                items={itemCollapseRight}
                            />
                        </div>
                    </div>
                    {/* Lịch sử thao tác */}
                    {tourScheduleId && (
                        <History
                            tableName="TourGit"
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
