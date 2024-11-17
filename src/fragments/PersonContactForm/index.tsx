import 'dayjs/locale/vi';

import { AutoComplete, Col, Form, FormInstance, Input, Spin } from 'antd';
import { CreateTravellerRequest, TravellerDto } from '@sdk/tour-operations';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useCreateTraveller, useGetTraveller, useGetTravellers } from '@hooks/queries/useTraveller';

import { AppConfig } from '@utils/config';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CloseCircleFilled } from '@ant-design/icons';
import { EnumOptionSelect } from '@components/customizes/Select/EnumOptionSelect';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { Pattern } from '@utils/formHelper';
import dayjs from 'dayjs';
import { getGenderTypes } from '@hooks/queries/useSaleOrderLineTravellers';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useDebouncedCallback } from 'use-debounce';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { usePersonContactStore } from './store/personContactStore';

interface PersonContactFormProps {
    form: FormInstance;
    isShowUnnecessaryFields?: boolean;
    travellerId?: string;
    disabledForm?: boolean;
    className?: string;
    isEnableEdit?: boolean;
    setIsEnableEdit?: Dispatch<SetStateAction<boolean>>;
    // eslint-disable-next-line no-unused-vars
    handleDataPersonContact: (traveller: TravellerDto) => void;
    handleClearPersonContact?: () => void;
}

export const PersonContactForm: React.FC<PersonContactFormProps> = props => {
    const {
        travellerId,
        isShowUnnecessaryFields,
        disabledForm,
        form,
        className,
        isEnableEdit,
        setIsEnableEdit,
        handleDataPersonContact,
        handleClearPersonContact,
    } = props;
    const values = Form.useWatch([], form);
    const genderTypes = getGenderTypes();

    // State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [traveller, setTraveller] = useState<TravellerDto[]>([]);
    const [searchSuggestions, setSearchSuggestions] = useState<{ value: string; label: string }[]>([]);

    // Store
    const {
        personContactDetail,
        isCreatingPersonContact,
        actions: { setPersonContactDetail, resetPersonContactStore, setIsCreatingPersonContact },
    } = usePersonContactStore(state => state);

    // Query & Mutate
    const { data: dataTravellerDefault } = useGetTraveller(travellerId ?? '');
    const { mutateAsync: getTravellers } = useGetTravellers();
    const { mutateAsync: createTraveller } = useCreateTraveller();

    const fetchSearchSuggestions = useCallback(
        async (value: string) => {
            if (!value) {
                setSearchSuggestions([]);
                setTraveller([]);
                setIsLoading(false);
                return;
            }
            const data = await getTravellers({
                advancedSearch: {
                    fields: ['phone'],
                    keyword: value,
                },
                pageSize: 5,
            });
            if (data) {
                setTraveller(data.data ?? []);
                const dataFetch =
                    data.data?.map(Guide => ({
                        value: Guide?.id ?? '',
                        label: `${Guide?.phone} - ${Guide?.lastName} ${Guide?.firstName}`,
                    })) ?? [];
                setSearchSuggestions(dataFetch);
                setIsLoading(false);
            }
            setIsLoading(false);
        },
        [getTravellers],
    );

    const onSelect = (value: string) => {
        const foundTraveller = traveller.find(item => item.id === value);
        if (foundTraveller) {
            const newValue = {
                ...foundTraveller,
                id: foundTraveller?.id,
                fullName: `${foundTraveller?.lastName ?? ''} ${foundTraveller?.firstName ?? ''}`,
                dateOfBirth: foundTraveller.dateOfBirth ? dayjs(foundTraveller.dateOfBirth) : null,
            };
            form.setFieldsValue(newValue);
            setPersonContactDetail(foundTraveller);
            handleDataPersonContact(foundTraveller);
        }
    };

    const handleSearch = useDebouncedCallback((value: string) => {
        fetchSearchSuggestions(value);
    }, 500);

    const onFieldClear = () => {
        const clearValues = {
            travellerId: undefined,
            fullName: undefined,
            id: undefined,
            firstName: undefined,
            lastName: undefined,
            dateOfBirth: undefined,
            email: undefined,
            phone: undefined,
            address: undefined,
            customerCode: undefined,
            gender: undefined,
        };
        form.setFieldsValue(clearValues);
        resetPersonContactStore();
        setIsDisabled(false);
        setSearchSuggestions([]);
        resetPersonContactStore();
        handleClearPersonContact && handleClearPersonContact();
    };

    const onFinish = async (values: CreateTravellerRequest) => {
        try {
            const result = await createTraveller(values);

            if (result.status === 200) {
                setPersonContactDetail({ ...values, id: result.data });
                handleDataPersonContact({ ...values, id: result.data });
            }
        } catch (error) {
            return error;
        }
    };

    const handleValuesChange = () => {
        if (isCreatingPersonContact) {
            setIsCreatingPersonContact(false);
        }

        if (!isEnableEdit) {
            setIsEnableEdit && setIsEnableEdit(true);
        }

        if (!isEmpty(personContactDetail)) {
            resetPersonContactStore();
        }
    };

    useEffect(() => {
        if (personContactDetail.id && !isDisabled) {
            setIsDisabled(true);
        } else if (!personContactDetail.id && isDisabled) {
            setIsDisabled(false);
        }
    }, [isDisabled, personContactDetail.id]);

    useEffect(() => {
        if (!isEmpty(values) && values?.fullName) {
            const shortPhone = values?.phone?.slice(-5);
            const valueSplit = values?.fullName?.split(' ');
            const lastName = valueSplit[0] ?? '';
            const firstName = valueSplit?.slice(1).join(' ') ?? '';

            const customerCode = `${shortPhone}.${Format.formatStringNoAccentsUppercase(values?.fullName)}`;
            form.setFieldsValue({
                ...values,
                customerCode,
                firstName,
                lastName,
                fullName: values?.fullName,
            });
        }
    }, [form, values]);

    useEffect(() => {
        if (!isEmpty(dataTravellerDefault)) {
            const newValues = {
                ...dataTravellerDefault,
                travellerId: dataTravellerDefault?.id,
                fullName: `${dataTravellerDefault?.lastName} ${dataTravellerDefault?.firstName}`,
                dateOfBirth: dataTravellerDefault?.dateOfBirth ? dayjs(dataTravellerDefault?.dateOfBirth) : undefined,
            };
            form.setFieldsValue(newValues);
            setPersonContactDetail(dataTravellerDefault);
        }
    }, [dataTravellerDefault, form, setPersonContactDetail]);

    useEffect(() => {
        return () => {
            resetPersonContactStore();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Form
            form={form}
            disabled={disabledForm}
            layout="vertical"
            preserve={false}
            onFinish={onFinish}
            onValuesChange={handleValuesChange}
        >
            <Col className={className}>
                {/* Số điện thoại - Họ và tên */}
                <div className="grid grid-cols-2 gap-5 pt-5">
                    {/* Hidden data Form */}
                    <BaseInput name={'id'} isHidden isForm />
                    <BaseInput name={'firstName'} isHidden isForm />
                    <BaseInput name={'lastName'} isHidden isForm />

                    {/* Enable Data Form */}
                    <Form.Item
                        label={i18n.t('personContact.phone')}
                        name={'phone'}
                        className="col-span-1"
                        rules={[
                            {
                                pattern: AppConfig.PhoneRegex,
                                message: i18n.t('validation.default.errorPhone'),
                            },
                            {
                                pattern: Pattern.decimal3,
                                message: i18n.t('validation.default.errorPhone'),
                            },
                            {
                                required: true,
                                message: i18n.t('validation.default.validPhone'),
                            },
                        ]}
                    >
                        {useHasAnyPermission([MyPermissions.MasterDataView]) ? (
                            <AutoComplete
                                options={searchSuggestions}
                                onSelect={onSelect}
                                onSearch={(value: string) => {
                                    setIsLoading(true);
                                    handleSearch(value);
                                }}
                                virtual={false}
                            >
                                <Input
                                    addonBefore="+84"
                                    allowClear={{ clearIcon: <CloseCircleFilled onClick={onFieldClear} /> }}
                                    suffix={isLoading && <Spin size="small" />}
                                />
                            </AutoComplete>
                        ) : (
                            <Input
                                allowClear={{ clearIcon: <CloseCircleFilled onClick={onFieldClear} /> }}
                                suffix={isLoading && <Spin size="small" />}
                            />
                        )}
                    </Form.Item>
                    <BaseInput
                        isForm
                        name="fullName"
                        className="col-span-1"
                        label={i18n.t('personContact.fullName')}
                        rules={[{ required: true, message: i18n.t('validation.default.validFullName') }]}
                        disable={isDisabled}
                        showCount
                        maxCountNumber={40}
                    />
                </div>

                {/* Email - Địa chỉ */}
                <div className="grid grid-cols-2 gap-5">
                    <BaseInput
                        isForm
                        type={'mail'}
                        name={'email'}
                        className="col-span-1"
                        label={i18n.t('personContact.mail')}
                        rules={[
                            {
                                type: 'email',
                                message: i18n.t('validation.default.validMail'),
                            },
                        ]}
                        disable={isDisabled}
                    />
                    <BaseInput
                        isForm
                        name={'address'}
                        className="col-span-1"
                        label={i18n.t('personContact.address')}
                        disable={isDisabled}
                        showCount
                        maxCountNumber={500}
                    />
                </div>
                {/* Mã Khách hàng - Giới tính - Ngày sinh */}
                <div className="grid grid-cols-3 gap-5">
                    <BaseInput
                        isForm
                        name={'customerCode'}
                        className="col-span-1"
                        label={i18n.t('personContact.personCode')}
                        disable
                        isHidden={!isShowUnnecessaryFields}
                    />
                    {isShowUnnecessaryFields && (
                        <>
                            <EnumOptionSelect
                                isForm
                                name={'gender'}
                                label={i18n.t('GenderType.title')}
                                className="col-span-1"
                                placeholder={i18n.t('GenderType.title')}
                                disable={isDisabled}
                                optionValue={genderTypes}
                            />
                            <BaseDatePicker
                                label={i18n.t('personContact.dateOfBirth')}
                                name={'dateOfBirth'}
                                className="col-span-1"
                                format="date"
                                disabled={isDisabled}
                            />
                        </>
                    )}
                </div>
            </Col>
        </Form>
    );
};
