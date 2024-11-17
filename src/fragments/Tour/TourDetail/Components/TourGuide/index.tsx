import 'dayjs/locale/vi';

import { AutoComplete, Flex, Form, FormInstance, Input, Spin } from 'antd';
import {
    CreateExistingTourGuideForTourRequest,
    CreateTourGuideForTourRequest,
    TourScheduleDto,
    TourScheduleTourGuideDto,
    UpdateExistingTourGuideForTourRequest,
} from '@sdk/tour-operations';
import Table, { ColumnsType } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';
import {
    useCreateExistingTourScheduleTourGuide,
    useCreateTourScheduleTourGuide,
    useDeleteTourScheduleTourGuide,
    useUpdateTourScheduleTourGuide,
} from '@hooks/queries/useTourScheduleTourGuide';

import { AppConfig } from '@utils/config';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { CountriesSelect } from '@components/customizes/Select/Country';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { DeleteOutlined } from '@ant-design/icons';
import { EnumOptionSelect } from '@components/customizes/Select/EnumOptionSelect';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { convertValues } from '@utils/formHelper';
import dayjs from 'dayjs';
import { getGenderTypes } from '@hooks/queries/useSaleOrderLineTravellers';
import i18n from '@src/i18n';
import isInteger from 'lodash/isInteger';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useTourFormStore } from '@store/tourFormStore';
import { useTourGuideInfos } from '@hooks/queries/useTourGuide';
import { useTourGuidesStore } from '@store/tourGuideStore';

interface TourGuideProps {
    tourGuideForm: FormInstance;
    tourSchedule?: TourScheduleDto;
}

// eslint-disable-next-line no-unused-vars
export const TourGuide: React.FC<TourGuideProps> = props => {
    const genderTypes = getGenderTypes();
    const [searchSuggestions, setSearchSuggestions] = useState<{ value: string; label: string }[]>([]);
    const [count, setCount] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [itemFocus, setItemFocus] = useState<string>('');
    const {
        tourGuides,
        actions: { setTourGuides },
    } = useTourGuidesStore(state => state);
    const {
        tourGuidesForm,
        tourScheduleFormStatus,
        actions: { setTourGuidesForm, setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    const { mutateAsync: getTourGuideInfos } = useTourGuideInfos();
    const { mutateAsync: createTourScheduleTourGuide } = useCreateTourScheduleTourGuide();
    const { mutateAsync: createExistingTourScheduleTourGuide } = useCreateExistingTourScheduleTourGuide();
    const { mutateAsync: updateTourScheduleTourGuide } = useUpdateTourScheduleTourGuide();
    const { mutateAsync: deleteTourScheduleTourGuide } = useDeleteTourScheduleTourGuide();

    const getDateOfBirthInitialValue = (record: TourScheduleTourGuideDto, value: string | undefined) => {
        const dateOfBirth = record.tourGuide?.dateOfBirth;
        return dateOfBirth ? dayjs(value ?? dateOfBirth) : undefined;
    };

    const columns: ColumnsType<TourScheduleTourGuideDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (value: string, record: TourScheduleTourGuideDto, index: number) => (
                <>
                    <BaseInput isForm isHidden type="text" name={['id', record.id!]} initialValue={value} />
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['tourGuideId', record.id!]}
                        initialValue={record.tourGuideId}
                    />
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['tourScheduleId', record.id!]}
                        initialValue={record.tourScheduleId}
                    />
                    <BaseInput isForm isHidden type="text" name={['order', record.id!]} initialValue={record.order} />
                    <p>{index + 1}</p>
                </>
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('personContact.phone')}
                </p>
            ),
            dataIndex: 'phone',
            key: 'phone',
            width: 200,
            render: (value: string, record: TourScheduleTourGuideDto) => (
                <Form.Item
                    className="mb-0"
                    name={['phone', record.id!]}
                    initialValue={value ?? record.tourGuide?.phone}
                    rules={[
                        {
                            pattern: AppConfig.PhoneRegex,
                            message: i18n.t('validation.default.errorPhone'),
                        },
                        {
                            required: true,
                            message: i18n.t('validation.default.validPhone'),
                        },
                    ]}
                >
                    <AutoComplete
                        options={searchSuggestions}
                        onSelect={onSelect}
                        onSearch={(value: string) => {
                            setIsLoading(true);
                            handleSearch(value);
                        }}
                        onFocus={() => setItemFocus(record.id!)}
                        disabled={record.tourGuideId !== undefined}
                    >
                        <Input allowClear suffix={isLoading && record.id == itemFocus && <Spin size="small" />} />
                    </AutoComplete>
                </Form.Item>
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('personContact.fullName')}
                </p>
            ),
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: (value: string, record: TourScheduleTourGuideDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    name={['name', record.id!]}
                    initialValue={value ?? record.tourGuide?.name}
                    value={value ?? record.tourGuide?.name}
                    disable={record.tourGuideId !== undefined}
                    rules={[{ required: true, message: i18n.t('validation.default.validFullName') }]}
                />
            ),
        },
        {
            title: i18n.t('personContact.dateOfBirth'),
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            width: 150,
            render: (value: string, record: TourScheduleTourGuideDto) => (
                <BaseDatePicker
                    className="mb-0"
                    name={['dateOfBirth', record.id!]}
                    initialValue={getDateOfBirthInitialValue(record, value)}
                    format="date"
                    disabled={record.tourGuideId !== undefined}
                />
            ),
        },
        {
            title: i18n.t('GenderType.title'),
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            render: (value: string, record: TourScheduleTourGuideDto) => (
                <EnumOptionSelect
                    isForm
                    className="mb-0"
                    name={['gender', record.id!]}
                    initialValue={value ?? record.tourGuide?.gender}
                    disable={record.tourGuideId !== undefined}
                    optionValue={genderTypes}
                    placeholder={i18n.t('GenderType.title')}
                />
            ),
        },
        {
            title: i18n.t('personContact.passport'),
            dataIndex: 'passport',
            key: 'passport',
            width: 120,
            render: (value: string, record: TourScheduleTourGuideDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="text"
                    name={['passport', record.id!]}
                    initialValue={value ?? record.tourGuide?.passport}
                    disable={record.tourGuideId !== undefined}
                />
            ),
        },
        {
            title: i18n.t('personContact.identityId'),
            dataIndex: 'identityID',
            key: 'identityID',
            width: 120,
            render: (value: string, record: TourScheduleTourGuideDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="text"
                    name={['identityID', record.id!]}
                    initialValue={value ?? record.tourGuide?.identityID}
                    disable={record.tourGuideId !== undefined}
                />
            ),
        },
        {
            title: i18n.t('personContact.country'),
            dataIndex: 'countryId',
            key: 'countryId',
            width: 180,
            render: (value: string, record: TourScheduleTourGuideDto) => (
                <CountriesSelect
                    isForm
                    className="mb-0"
                    name={['countryId', record.id!]}
                    initialValue={value ?? record.tourGuide?.countryId}
                    disabled={record.tourGuideId !== undefined}
                />
            ),
        },
        {
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: TourScheduleTourGuideDto) => (
                <Can permissions={[MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]}>
                    <Flex className="gap-4" justify="center">
                        <Form.Item className="mb-0">
                            {!record.id?.startsWith('tourGuide') ? (
                                <DeleteButton
                                    titleName={i18n.t('tour.tourGuide.title')}
                                    content={`${i18n.t('tour.tourGuide.title')}: ${record?.tourGuide?.name}`}
                                    onOk={async () => {
                                        await deleteTourScheduleTourGuide(record.id ?? '');
                                        const newArray = tourGuidesForm.filter(item => item.id !== record.id);
                                        setTourGuidesForm(newArray);
                                        toastSuccess(
                                            i18n.t('message.default.deleteContentSuccess'),
                                            `${i18n.t('tour.tourGuide.title')}:${record?.tourGuide?.name}`,
                                        );
                                    }}
                                />
                            ) : (
                                <DeleteOutlined
                                    onClick={() => {
                                        const newArray = tourGuidesForm.filter(item => item.id !== record.id);
                                        setTourGuidesForm(newArray);
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Flex>
                </Can>
            ),
        },
    ];

    const fetchSearchSuggestions = useCallback(
        async (value: string) => {
            if (!value) {
                setTourGuides([]);
                setSearchSuggestions([]);
                setIsLoading(false);
                return;
            }
            const data = await getTourGuideInfos({
                advancedSearch: {
                    fields: ['phone'],
                    keyword: value,
                },
            });
            if (data) {
                setTourGuides(data.data ?? []);
                const tourGuideIdList = tourGuidesForm.map(item => item.tourGuideId);
                const dataFetch =
                    data.data
                        ?.filter(item => !tourGuideIdList.includes(item.id))
                        .map(Guide => ({
                            value: Guide.id ?? '',
                            label: Guide.phone ?? '',
                        })) ?? [];
                setSearchSuggestions(dataFetch);
                setIsLoading(false);
            }
            setIsLoading(false);
        },
        [getTourGuideInfos, setTourGuides, tourGuidesForm],
    );

    const handleSearch = useDebouncedCallback((value: string) => {
        fetchSearchSuggestions(value);
    }, 500);

    const onSelect = (value: string) => {
        const foundTourGuide = tourGuides.find(item => item.id === value);
        if (foundTourGuide) {
            const updatedTourGuide = tourGuidesForm?.map(item => {
                if (item.id === itemFocus) {
                    return {
                        ...foundTourGuide,
                        id: itemFocus + '-gotData',
                        tourGuideId: value,
                        tourScheduleId: tourScheduleFormStatus.tourScheduleId,
                        order: item.order,
                        tourGuide: foundTourGuide,
                    };
                } else {
                    return { ...item };
                }
            });
            setTourGuidesForm(updatedTourGuide as TourScheduleTourGuideDto[]);
        }
    };

    const handleAdd = () => {
        setSearchSuggestions([]);
        const data: TourScheduleTourGuideDto = {
            id: `tourGuide-${count}`,
            tourGuideId: undefined,
            order: count + 1,
        };
        const newData = data ?? [];
        setCount(prevCount => prevCount + 1);
        setTourGuidesForm([...tourGuidesForm, newData]);
    };

    const onFinish = async (values: { [x: string]: { [y: string]: string } }) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        if (!values?.id || !tourScheduleId) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourGuideFormSuccess: true,
            });
            return;
        }

        const formData = convertValues(values);
        const dataList = formData.map(item => {
            if (item.id.startsWith('tourGuide')) {
                delete item.id;
                item.tourScheduleId = tourScheduleId;
                if (item.tourGuideId === undefined) {
                    return createTourScheduleTourGuide(item as CreateTourGuideForTourRequest);
                } else {
                    return createExistingTourScheduleTourGuide(item as CreateExistingTourGuideForTourRequest);
                }
            } else {
                const fetchData: UpdateExistingTourGuideForTourRequest = {
                    id: item.id,
                    tourGuideId: item.tourGuideId,
                    order: item.order,
                };
                return updateTourScheduleTourGuide(fetchData);
            }
        });

        try {
            await Promise.all(dataList);
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourGuideFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        if (props.tourSchedule) {
            setTourGuidesForm(Format.formatSortListByOrder(props.tourSchedule?.tourScheduleTourGuides));
            const numArray = (props.tourSchedule?.tourScheduleTourGuides ?? []).map(item => item.order ?? 0);
            setCount(isInteger(Math.max(...numArray)) ? Math.max(...numArray) : 1);
        }
    }, [props.tourSchedule, setTourGuidesForm]);

    return (
        <Form form={props.tourGuideForm} onFinish={onFinish}>
            <div className="px-5 my-3">
                <CreateActionButton title={i18n.t('tour.tourGuide.title')} handleAdd={handleAdd} />
                <Table
                    dataSource={tourGuidesForm}
                    columns={columns}
                    rowKey="id"
                    bordered
                    pagination={false}
                    size="small"
                    scroll={{ x: 500 }}
                />
            </div>
        </Form>
    );
};
