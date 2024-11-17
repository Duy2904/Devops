import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, FormInstance, Input } from 'antd';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { Pattern } from '@utils/formHelper';
import { RouteSelect } from '@components/customizes/Select/Route';
import TextArea from 'antd/es/input/TextArea';
import { TourFitSearch } from './TourFitSearch';
import { TourGitSearch } from './TourGitSearch';
import { TourType } from '@src/types/TypeEnum';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useParams } from 'react-router-dom';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface InfoFormCommonProps {
    form: FormInstance;
    orderNo: string;
    setTourIdSelected: Dispatch<SetStateAction<string>>;
    setIsInitSeatFirstTime?: Dispatch<SetStateAction<boolean>>;
}

export const InfoFormCommon: React.FC<InfoFormCommonProps> = props => {
    const { form, orderNo, setTourIdSelected, setIsInitSeatFirstTime } = props;
    const { quoteId } = useParams<string>();
    const [isChangeDestination, setIsChangeDestination] = useState<boolean>(false);

    // Store
    const { tourSchedule } = useTourScheduleStore(state => state);
    const { tourType } = useQuoteStore(state => state);

    // handle change tour select
    const handleChangeSelect = (value: string) => {
        setTourIdSelected(value);
        setIsInitSeatFirstTime && setIsInitSeatFirstTime(true);
    };

    // init data to form
    useEffect(() => {
        if (!isEmpty(tourSchedule) && orderNo) {
            form.setFieldsValue({
                orderNo: orderNo,
                tourScheduleId: tourSchedule.id,
            });
            setTourIdSelected(tourSchedule.id!);
        }
    }, [form, orderNo, setTourIdSelected, tourSchedule]);

    useEffect(() => {
        if (tourSchedule && tourType === TourType.FIT) {
            setIsChangeDestination(true);
        }
    }, [tourType, tourSchedule]);

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput isForm isHidden type="text" name="id" />
                <Form.Item name="orderNo" label={<p className="mb-1 font-semibold">Mã</p>}>
                    <Input value={orderNo} disabled />
                </Form.Item>
                {tourType === TourType.GIT ? (
                    <TourGitSearch
                        name="tourScheduleId"
                        label={<p className="mb-1">Tour</p>}
                        rules={[{ required: true, message: 'Vui lòng chọn Tour' }]}
                        placeholder="Nhập mã, tên tour"
                        dataSelected={
                            quoteId || !isEmpty(tourSchedule)
                                ? [
                                      {
                                          value: `${tourSchedule.id}`,
                                          label: `${tourSchedule.tourCode}-${tourSchedule.name}`,
                                      },
                                  ]
                                : []
                        }
                        form={form}
                        handleSelectOutSide={value => handleChangeSelect(value)}
                    />
                ) : (
                    <TourFitSearch
                        name="tourScheduleId"
                        label={<p className="mb-1">Tour</p>}
                        rules={[{ required: true, message: 'Vui lòng chọn Tour' }]}
                        placeholder="Nhập mã, tên tour"
                        dataSelected={
                            quoteId || !isEmpty(tourSchedule)
                                ? [
                                      {
                                          value: `${tourSchedule.id}`,
                                          label: `${tourSchedule.tourCode}-${tourSchedule.name}`,
                                      },
                                  ]
                                : []
                        }
                        form={form}
                        handleSelectOutSide={value => handleChangeSelect(value)}
                    />
                )}
                {tourType === TourType.GIT ? (
                    <BaseInput
                        isForm
                        className="col-span-4 md:col-span-2 lg:col-span-1"
                        name="tourRoute"
                        label={<p className="mb-1">Tuyến</p>}
                    />
                ) : (
                    <Form.Item label={<p className="mb-1 font-semibold">Hành trình</p>}>
                        <RouteSelect
                            label={i18n.t('tour.tourDetail.trip')}
                            rules={[{ required: true, message: i18n.t('validation.tour.validTrip') }]}
                            className="col-span-2 lg:col-span-1"
                            disable={true}
                            destinationId={tourSchedule?.destinationLocationId}
                            initialValue={tourSchedule?.routeId}
                            isChangeDestination={isChangeDestination}
                            setIsChangeDestination={setIsChangeDestination}
                        />
                    </Form.Item>
                )}
                <Form.Item label={<p className="mb-1 font-semibold">Thời gian</p>}>
                    <Input
                        value={
                            tourSchedule.numberOfDays && tourSchedule.numberOfNights
                                ? `${tourSchedule.numberOfDays} Ngày ${tourSchedule.numberOfNights} Đêm`
                                : ''
                        }
                        disabled
                    />
                </Form.Item>
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="description"
                    label={<p className="mb-1">Diễn giải</p>}
                    rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                    showCount
                    maxCountNumber={500}
                />
            </div>
            <p className="mb-1 font-semibold">Số lượng hành khách</p>
            <div className="grid grid-cols-3 gap-4">
                <BaseInput
                    isForm
                    type="number"
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="adtQuantity"
                    label={<p className="mb-1">Người lớn</p>}
                    rules={[
                        { required: true, message: i18n.t('validation.default.validDefault') },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                />
                <BaseInput
                    isForm
                    type="number"
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="chdQuantity"
                    label={<p className="mb-1">Trẻ em</p>}
                    rules={[
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                />
                <BaseInput
                    isForm
                    type="number"
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="infQuantity"
                    label={<p className="mb-1">Em bé</p>}
                    rules={[
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                />
            </div>
            <Form.Item
                name="note"
                className="col-span-4 md:col-span-2 lg:col-span-1 mb-0 pb-4"
                label={<p className="mb-1 font-semibold">Ghi chú</p>}
            >
                <TextArea rows={2} showCount maxLength={500} />
            </Form.Item>
        </div>
    );
};
