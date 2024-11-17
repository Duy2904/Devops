import 'dayjs/locale/vi';

import { DatePicker, Form, FormInstance, Input } from 'antd';
import {
    RouteChangeTourSOState,
    RouteCloneSOState,
    RouteCreateSOFromTourDepartureSchedule,
    RouteCreateSOFromTourState,
    findTourScheduleFares,
} from '@fragments/SaleOrders/features';
import { TourGitDto, TourScheduleDto } from '@sdk/tour-operations';
import { filterAdvanceListTourFitFromSODetail, pageSize } from '@utils/filterSearch';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    useGetListTourFitDropdown,
    useGetListTourFitTransferDropdown,
} from '@components/customizes/AutoComplete/TourAutoComplete/mutation';
import { useTourScheduleStore, useTourSchedulesStore } from '@store/tourScheduleStore';

import { AppConfig } from '@utils/config';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { OnForm } from '@components/customizes/AutoComplete/TourAutoComplete/OnForm';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { isEmptyString } from '@utils/formHelper';
import isString from 'lodash/isString';
import locale from 'antd/es/date-picker/locale/vi_VN';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useLocation } from 'react-router-dom';
import { useQueryGetTourScheduleUseId } from '@fragments/Quote/hooks/useSearchTour';
import { useSaleOrderDetailStore } from '@fragments/SaleOrders/store/saleOrderDetailStore';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useTourFaresStore } from '@store/tourFareStore';
import { useTourSurchargeStore } from '@store/tourSurchargeStore';

interface TourInfoProps {
    form: FormInstance;
    soId?: string;
    soCode?: string;
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
    setIsConfirmOverload: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TourInfoComponent: React.FC<TourInfoProps> = props => {
    const { isFirstTimeDirty, soId, setIsFirstTimeDirty, setIsEnableEdit, setIsConfirmOverload } = props;
    const isShowTotalCapacity = useHasAnyPermission([MyPermissions.SaleOrderViewCapacity]);
    const { changeTourSOId } = (useLocation().state ?? { cloneId: false }) as RouteChangeTourSOState;
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { createSOFromTourId } = (useLocation().state ?? { createSOFromTourId: false }) as RouteCreateSOFromTourState;
    const { createSOFromTourDepartureSchedule } = (useLocation().state ?? {
        createSOFromTourDepartureSchedule: false,
    }) as RouteCreateSOFromTourDepartureSchedule;

    // Store
    const {
        tourSchedule,
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);

    const {
        tourSchedules,
        actions: { setTourSchedules },
    } = useTourSchedulesStore(state => state);
    const { saleOrderFormStatus, saleOrder } = useSaleOrderStore(state => state);
    const {
        tourId,
        travellers,
        actions: { setTourId, setSaleOrderLines },
    } = useSaleOrderDetailStore(state => state);
    const { tourFareGroupings } = useTourFaresStore(state => state);
    const {
        actions: { setTourSurcharge },
    } = useTourSurchargeStore(state => state);

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        advancedFilter: filterAdvanceListTourFitFromSODetail(dayjs().toDate()),
        pageSize: pageSize,
    };

    // State
    const [tourIdSelected, setTourIdSelected] = useState<string>('');
    const [filterTourSchedule, setFilterTourSchedule] = useState<TourScheduleDto[] | TourGitDto[]>([]);
    const [shouldReFilterListTour, setShouldReFilterListTour] = useState<boolean>(false);
    const [originalListTour, setOriginalListTour] = useState<TourScheduleDto[] | TourGitDto[]>([]);
    const [isFilteredListTour, setIsFilteredListTour] = useState<boolean>(false);

    // Query
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdSelected);
    const { mutateAsync: getFitDropdown, isLoading } = useGetListTourFitDropdown();
    const { mutateAsync: getFitTransferDropdown, isLoading: isLoadingTourTransfer } = useGetListTourFitTransferDropdown(
        changeTourSOId ?? '',
    );

    const isEdit = useMemo(() => soId !== undefined && !clonedId && !changeTourSOId, [changeTourSOId, clonedId, soId]);

    useEffect(() => {
        if (isString(tourId)) {
            setTourIdSelected(tourId);
        }
    }, [tourId]);

    useEffect(() => {
        if (!isFilteredListTour && !isEmpty(tourSchedules)) {
            setOriginalListTour(tourSchedules);
        }
    }, [isFilteredListTour, tourSchedules]);

    const fetchTourSchedule = useCallback(async () => {
        if (dataTourSchedule) {
            setTourSchedule(dataTourSchedule);
            setTourId(dataTourSchedule.id);
        }
    }, [dataTourSchedule, setTourId, setTourSchedule]);

    useEffect(() => {
        if (tourId && tourIdSelected !== tourId && !tourIdSelected) {
            setTourIdSelected(tourId);
        }
    }, [tourId, tourIdSelected]);

    useEffect(() => {
        if (Object.keys(saleOrderFormStatus).length == 0) {
            fetchTourSchedule();
        }
    }, [fetchTourSchedule, saleOrderFormStatus]);

    useEffect(() => {
        if (tourSchedule && props.soCode) {
            const departureDate = tourSchedule?.departureDate ? dayjs(tourSchedule.departureDate) : null;
            const currentCapacity = tourSchedule.remainingCapacity ?? tourSchedule.capacity;
            const totalCapacity = isShowTotalCapacity ? `/${tourSchedule.capacity}` : '';
            const capacity = tourSchedule?.departureDate ? `${currentCapacity}${totalCapacity}` : undefined;
            props.form.setFieldsValue({
                soCode: props.soCode,
                tourScheduleId: tourSchedule.id,
                departureDate,
                capacity,
                requestGuaranteeReason: saleOrder?.requestGuaranteeReason,
                approveGuaranteeReason: saleOrder?.approveGuaranteeReason,
            });
        }
    }, [
        isShowTotalCapacity,
        props.form,
        props.soCode,
        saleOrder?.approveGuaranteeReason,
        saleOrder?.requestGuaranteeReason,
        tourSchedule,
    ]);

    useEffect(() => {
        // Set tour Id for create SO at Tour detail
        if (!props.form.getFieldValue('id') && tourSchedule?.id && createSOFromTourId) {
            setTourId(tourSchedule?.id);
        }
    }, [createSOFromTourId, props.form, setTourId, tourSchedule?.id]);

    useEffect(() => {
        // Set tour Id for create SO at Tour departure schedule detail
        if (!props.form.getFieldValue('id') && tourSchedule?.id && createSOFromTourDepartureSchedule) {
            setTourId(tourSchedule?.id);
        }
    }, [createSOFromTourDepartureSchedule, props.form, setTourId, tourSchedule?.id]);

    const onValuesChange = () => {
        if (isFirstTimeDirty && !props.isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }
    };

    const handleChangeSelect = (value: string) => {
        setIsConfirmOverload(false);
        setTourId(value);
        setTourIdSelected(value);
        setIsFilteredListTour(false);
        setTourSurcharge([]);
        setSaleOrderLines([]);
    };

    const handleFilterTourSchedule = useCallback(() => {
        const filterTourSchedules = [] as TourScheduleDto[] | TourGitDto[];

        // check all tour in list to find match tour
        originalListTour.forEach(item => {
            let availableForClone = true;

            // check base on travellers
            travellers.forEach(y => {
                if (!availableForClone) return;
                const findItem = findTourScheduleFares(item.tourScheduleFares ?? [], y);
                availableForClone = !!findItem;
            });

            if (availableForClone) {
                filterTourSchedules.push(item);
            }
        });
        setIsFilteredListTour(true);
        setFilterTourSchedule(filterTourSchedules);
    }, [originalListTour, travellers]);

    // Handle clone tour with condition can change tour select
    useEffect(() => {
        if (
            !isEmpty(tourSchedules) &&
            !isEmpty(tourFareGroupings) &&
            isEmpty(filterTourSchedule) &&
            !isFilteredListTour
        ) {
            handleFilterTourSchedule();
        }
    }, [filterTourSchedule, handleFilterTourSchedule, isFilteredListTour, tourFareGroupings, tourSchedules]);

    useEffect(() => {
        if (!isEmpty(filterTourSchedule)) {
            setTourSchedules(filterTourSchedule);
        }
    }, [filterTourSchedule, setTourSchedules]);

    useEffect(() => {
        if (shouldReFilterListTour) {
            setShouldReFilterListTour(false);
            handleFilterTourSchedule();
        }
    }, [handleFilterTourSchedule, shouldReFilterListTour]);

    useEffect(() => {
        if (!isEmpty(travellers)) {
            setShouldReFilterListTour(true);
        }
    }, [shouldReFilterListTour, travellers]);

    return (
        <Form
            form={props.form}
            className="bg-white w-full col-span-12 lg:col-span-7 p-4 border border-solid border-gray-100 overflow-hidden"
            layout="vertical"
            onValuesChange={onValuesChange}
        >
            <div className="grid grid-cols-1 gap-4">
                <Form.Item
                    name="soCode"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={<p className="mb-1">Mã đơn hàng</p>}
                >
                    <Input value={props.soCode} disabled />
                </Form.Item>
                <OnForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    name="tourScheduleId"
                    label={<p className="mb-1">Tour</p>}
                    rules={[{ required: true, message: 'Vui lòng chọn Tour' }]}
                    initialValue={tourSchedule?.id ?? ''}
                    requestSearch={paramsSearch}
                    placeholder="Nhập mã, tên tour"
                    dataSelected={
                        !isEmpty(tourSchedule) && !isEmptyString(tourSchedule?.id)
                            ? [
                                  {
                                      value: `${tourSchedule?.id}`,
                                      label: `${tourSchedule?.tourCode}-${tourSchedule?.name}`,
                                      disabled: false,
                                  },
                              ]
                            : []
                    }
                    handleSelectOutSide={id => handleChangeSelect(id)}
                    disabled={isEdit}
                    hookOnChange={changeTourSOId || clonedId ? getFitTransferDropdown : getFitDropdown}
                    loading={isLoading || isLoadingTourTransfer}
                />
                <Form.Item
                    name="departureDate"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={<p className="mb-1">Ngày khởi hành</p>}
                >
                    <DatePicker
                        locale={locale}
                        className="w-full"
                        placeholder="Ngày khởi hành"
                        format={AppConfig.DateFormat}
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    name="capacity"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={<p className="mb-1">Số chỗ còn nhận</p>}
                >
                    <Input className="w-full" placeholder="Số chỗ còn nhận" style={{ color: 'red' }} disabled />
                </Form.Item>
                {!clonedId && !changeTourSOId && saleOrder?.requestGuaranteeReason && (
                    <Form.Item
                        name="requestGuaranteeReason"
                        className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                        label={<p className="mb-1 font-semibold">Lý do gửi duyệt</p>}
                    >
                        <TextArea disabled rows={2} />
                    </Form.Item>
                )}
                {!clonedId && !changeTourSOId && saleOrder?.approveGuaranteeReason && (
                    <Form.Item
                        name="approveGuaranteeReason"
                        className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                        label={<p className="mb-1 font-semibold">Lý do duyệt đơn</p>}
                    >
                        <TextArea disabled rows={2} />
                    </Form.Item>
                )}
            </div>
        </Form>
    );
};
