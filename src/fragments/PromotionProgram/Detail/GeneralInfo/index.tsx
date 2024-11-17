import { Checkbox, Col, Form, FormInstance } from 'antd';
import { DiscountConditionType, DiscountDetailDto } from '@sdk/tour-operations';
import { useCallback, useEffect } from 'react';

import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CurrenciesSelect } from '@components/customizes/Select/Currency';
import { MultipleTourSearch } from './MultipleSearch';
import { checkRegexCode } from '@fragments/PromotionProgram/Feature';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { useGetTourFitById } from '@fragments/PromotionProgram/hook/usePromoteProgram';

interface GeneralInfoProps {
    infoForm: FormInstance;
    data?: DiscountDetailDto;
    isMultipleSelect?: boolean;
}

export const GeneralInfo: React.FC<GeneralInfoProps> = props => {
    const { infoForm, data, isMultipleSelect } = props;
    const startDateForm = Form.useWatch('startDate', infoForm);
    const tourScheduleIdForm = Form.useWatch('tourScheduleIds', infoForm);

    const { mutateAsync: getTourFitById } = useGetTourFitById();

    useEffect(() => {
        if (data) {
            const tempDataSelected = data?.tourScheduleDiscounts?.map(item => item.tourScheduleId ?? '');
            infoForm.setFieldValue('tourScheduleIds', tempDataSelected);
        }
    }, [data, infoForm]);

    const handleChangeTourSchedule = useCallback(async () => {
        if (tourScheduleIdForm && !isMultipleSelect) {
            const fetchData = await getTourFitById(tourScheduleIdForm);
            if (fetchData) {
                infoForm.setFieldsValue({
                    startDate: dayjs(fetchData?.saleStartDate),
                    endDate: dayjs(fetchData?.saleEndDate),
                });
            }
        }
    }, [getTourFitById, infoForm, isMultipleSelect, tourScheduleIdForm]);

    useEffect(() => {
        handleChangeTourSchedule();
    }, [handleChangeTourSchedule]);

    return (
        <Col className="p-4">
            <Col className="grid grid-cols-3 items-center gap-4">
                <BaseInput isForm name="id" isHidden />
                {(data || isMultipleSelect) && (
                    <BaseInput
                        isForm
                        name="code"
                        className={`${isMultipleSelect ? 'col-span-2 lg:col-span-2' : 'col-span-3 lg:col-span-3'}`}
                        label={i18n.t('Mã CTKM')}
                        disable={!isMultipleSelect || data?.isUsed}
                        showCount={isMultipleSelect}
                        maxCountNumber={isMultipleSelect ? 25 : undefined}
                        rules={[
                            {
                                required: isMultipleSelect,
                                message: i18n.t('validation.default.validDefault'),
                            },
                            {
                                validator(_, value) {
                                    if (checkRegexCode(value) && isMultipleSelect) {
                                        return Promise.reject(
                                            new Error(
                                                `${i18n.t('validation.default.errorValue')} (${i18n.t(
                                                    'Mã CTKM không chứa ký tự đặc biệt hoặc chữ thường',
                                                )})`,
                                            ),
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    />
                )}
                {isMultipleSelect && (
                    <Form.Item
                        className="col-span-1 lg:col-span-1 flex justify-center mb-0"
                        name="isActive"
                        valuePropName="checked"
                    >
                        <Checkbox>{i18n.t('Sử dụng')}</Checkbox>
                    </Form.Item>
                )}
            </Col>
            <BaseInput
                isForm
                name="name"
                label={i18n.t('Tên CTKM')}
                disable={data?.isUsed}
                showCount
                maxCountNumber={250}
            />
            {!isMultipleSelect && (
                <Col className="flex flex-wrap items-center justify-between gap-4">
                    <Form.Item name="isActive" valuePropName="checked">
                        <Checkbox disabled={data?.isUsed}>{i18n.t('Sử dụng')}</Checkbox>
                    </Form.Item>
                    <Form.Item name="isEarlyBird" valuePropName="checked">
                        <Checkbox disabled={data?.isUsed}>{i18n.t('EarlyBird')}</Checkbox>
                    </Form.Item>
                    <Form.Item name="isLastMinute" valuePropName="checked">
                        <Checkbox
                            disabled={
                                (data?.isUsed &&
                                    !data?.discountLines?.findIndex(
                                        item => item.discountConditionType === DiscountConditionType.LastPlaces,
                                    )) ||
                                (data?.isUsed && data?.discountLines?.length == 2)
                            }
                        >
                            {i18n.t('LastMinute')}
                        </Checkbox>
                    </Form.Item>
                </Col>
            )}
            <MultipleTourSearch
                label={i18n.t('Tour')}
                name="tourScheduleIds"
                infoForm={infoForm}
                disable={data?.isUsed}
                isMultiple={isMultipleSelect}
                discountData={data}
            />

            <Col className="grid grid-cols-2 gap-4">
                <BaseDatePicker
                    name="startDate"
                    label={i18n.t('Ngày hiệu lực')}
                    rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                    isRequired
                    className="col-span-2 lg:col-span-1"
                    format={'date'}
                    disabled={data?.isUsed || !isMultipleSelect}
                    disabledDate={current => current <= dayjs().subtract(1, 'day')}
                    onChange={() => infoForm.setFieldValue('endDate', undefined)}
                    initialValue={data?.startDate ? dayjs(data?.startDate) : undefined}
                />
                <BaseDatePicker
                    name="endDate"
                    label={i18n.t('Ngày hết hiệu lực ')}
                    rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                    isRequired
                    className="col-span-2 lg:col-span-1"
                    format={'date'}
                    customDefaultValue={infoForm.getFieldValue('startDate')}
                    disabled={!startDateForm || data?.isUsed || !isMultipleSelect}
                    disabledDate={current => current <= dayjs(startDateForm).subtract(1, 'day')}
                />
            </Col>
            <CurrenciesSelect
                isForm
                name="currencyId"
                label={i18n.t('Loại tiền')}
                rules={[
                    {
                        required: true,
                        message: i18n.t('validation.default.validDefault'),
                    },
                ]}
                disable={data?.isUsed}
            />
        </Col>
    );
};
