import { Form, FormInstance, InputNumber } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { DeleteOutlined } from '@ant-design/icons';
import Can from '@components/common/Can';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CurrenciesSelect } from '@components/customizes/Select/Currency';
import { useGetCurrencies } from '@components/customizes/Select/Currency/useCurrencies';
import { PassengerTypeSelect } from '@components/customizes/Select/PassengerType';
import { ProductCategorySelect } from '@components/customizes/Select/ProductCategorySelect';
import { VatSelect } from '@components/customizes/Select/Vat';
import { useGetVats } from '@components/customizes/Select/Vat/useVat';
import { QuoteProductSelect } from '@fragments/Quote/components/Common/QuoteProductSelect';
import { calculateReceivedItem, calculateTaxItem, RouteCloneQuoteState } from '@fragments/Quote/features';
import { getPermission } from '@fragments/Quote/features/getPermission';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { QuoteLineDto, QuoteStatus, QuoteType } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { PermissionType, TourType } from '@src/types/TypeEnum';
import Format from '@utils/format';
import { convertValues, Pattern } from '@utils/formHelper';

import { ButtonAddRow } from '../ButtonAddRow';

interface FormPropsDetail {
    form: FormInstance;
    type: QuoteType;
    data: QuoteLineDto[];
    quoteStatus: QuoteStatus;
    isSubmitting: boolean;
    handleOnValuesChange: () => void;
}

export const FormDetail: React.FC<FormPropsDetail> = props => {
    const { form, type, data, quoteStatus, isSubmitting, handleOnValuesChange } = props;
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneQuoteState;

    // Store
    const { tourType } = useQuoteStore(state => state);

    // State
    const [isFirstTimeInitData, setIsFirstTimeInitData] = useState<boolean>(true);
    const [dataForm, setDataForm] = useState<QuoteLineDto[]>([]);
    const [dataBeforeSave, setDataBeforeSave] = useState<QuoteLineDto[]>([]);
    const dataFormWatch = Form.useWatch(type, form);
    const dataConvert = convertValues(dataFormWatch);

    // Query
    const { data: dataVAT } = useGetVats();
    const { data: dataCurrency } = useGetCurrencies(true);

    const currentCounter = useMemo(() => {
        return dataForm?.[dataForm.length - 1]?.order ?? 0;
    }, [dataForm]);

    const handleAdd = () => {
        const data: QuoteLineDto = {
            id: `${type}-${currentCounter + 1}`,
            productId: '',
            passengerTypeId: '',
            vatId: '',
            description: '',
            currencyId: '',
            order: currentCounter + 1,
        };
        setDataForm(Format.formatSortListByOrder([...dataForm, data]));
    };

    const onDelete = (record: QuoteLineDto) => {
        const newArray = dataForm.filter(item => item.id !== record.id);
        setDataForm(newArray);
        handleOnValuesChange();
    };

    const calculateReceived = useCallback(
        (id: string) => {
            const item = dataConvert?.find(x => x.id === id);

            if (isEmpty(item)) {
                return 0;
            }

            return calculateReceivedItem(item);
        },
        [dataConvert],
    );

    const calculateTotalReceived = useCallback(() => {
        let total = 0;

        dataConvert.forEach(item => {
            total += calculateReceivedItem(item);
        });

        return total;
    }, [dataConvert]);

    const calculateTaxOnRow = useCallback(
        (id: string) => {
            const item = dataConvert?.find(x => x.id === id);
            const vat = dataVAT?.data?.find(x => x.id === item?.['vatId'])?.value ?? 0;

            if (isEmpty(item)) {
                return 0;
            }

            return calculateTaxItem(calculateReceived(id), vat);
        },
        [calculateReceived, dataConvert, dataVAT?.data],
    );

    const calculateTotalTax = useCallback(() => {
        let total = 0;

        dataConvert.forEach(item => {
            total += calculateTaxOnRow(item.id);
        });

        return total;
    }, [calculateTaxOnRow, dataConvert]);

    const calculateRevenueOnRow = useCallback(
        (id: string) => {
            const item = dataConvert?.find(x => x.id === id);

            if (isEmpty(item)) {
                return 0;
            }

            return calculateReceived(item.id) - calculateTaxOnRow(item.id);
        },
        [calculateReceived, calculateTaxOnRow, dataConvert],
    );

    const calculateTotalRevenue = useCallback(() => {
        let total = 0;

        dataConvert.forEach(item => {
            total += calculateRevenueOnRow(item.id);
        });

        return total;
    }, [calculateRevenueOnRow, dataConvert]);

    const handleChangeProductCategory = (id: string) => () => {
        form.setFieldValue([type, 'productId', id], '');
    };

    const handleInitDataFromAPI = useCallback(() => {
        const newData = data.map((x, index) => ({
            ...x,
            'product.productCategoryId': x.product?.productCategoryId,
            order: x.order ? x.order : index + 1,
        }));

        setDataForm(Format.formatSortListByOrder(newData));
        setIsFirstTimeInitData(false);
        setDataBeforeSave(data);
    }, [data]);

    const handleChangeCurrency = useCallback(
        (currencyId: string, rowId: string) => {
            const findCurrency = dataCurrency?.data?.find(x => x.id === currencyId);
            form.setFieldValue([type, 'exchangeRate', rowId], findCurrency?.currencyCode === 'VND' ? 1 : undefined);
        },
        [dataCurrency?.data, form, type],
    );

    useEffect(() => {
        if (isSubmitting) {
            setDataBeforeSave(data);
        }
    }, [data, isSubmitting]);

    useEffect(() => {
        if (
            (!isEmpty(data) && isFirstTimeInitData && !isSubmitting) ||
            JSON.stringify(dataBeforeSave) !== JSON.stringify(data)
        ) {
            handleInitDataFromAPI();
        }
    }, [data, dataBeforeSave, handleInitDataFromAPI, isFirstTimeInitData, isSubmitting]);

    const columns: ColumnsType<QuoteLineDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 40,
            align: 'center',
            render: (_, record: QuoteLineDto, index: number) => (
                <>
                    <BaseInput isForm isHidden type="text" name={[type, 'type', record.id!]} initialValue={type} />
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={[type, 'order', record.id!]}
                        initialValue={record.order}
                    />
                    <BaseInput
                        className="mb-0"
                        isForm
                        isHidden
                        type="text"
                        name={[type, 'id', record.id!]}
                        initialValue={record.id}
                    />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('quote.table.descriptions')}
                </p>
            ),
            dataIndex: 'description',
            key: 'description',
            width: 200,
            render: (_, record: QuoteLineDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="text"
                    name={[type, 'description', record.id!]}
                    initialValue={record.description}
                    rules={[{ required: true, message: i18n.t(`validation.default.validDefault`) }]}
                    showCount
                    maxCountNumber={500}
                />
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('quote.table.productCategory')}
                </p>
            ),
            dataIndex: 'product.productCategoryId',
            key: 'product.productCategoryId',
            width: 200,
            render: (value, record: QuoteLineDto) => (
                <ProductCategorySelect
                    isForm
                    className="mb-0"
                    name={[type, 'product.productCategoryId', record.id!]}
                    initialValue={value}
                    rules={[{ required: true, message: i18n.t(`saleorder.surcharge.require.requireProduct`) }]}
                    onChange={handleChangeProductCategory(record.id!)}
                />
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('quote.table.product')}
                </p>
            ),
            dataIndex: 'productId',
            key: 'productId',
            width: 200,
            render: (value, record: QuoteLineDto) => {
                const productCategoryId = dataConvert?.find(x => x.id === record.id)?.['product.productCategoryId'];
                return (
                    <QuoteProductSelect
                        isForm
                        className="mb-0"
                        productCategoryId={productCategoryId}
                        disabled={
                            !dataFormWatch?.['product.productCategoryId'][record.id!] ||
                            (quoteStatus === QuoteStatus.Confirm && !clonedId)
                        }
                        initialValue={value}
                        rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                        name={[type, 'productId', record.id!]}
                    />
                );
            },
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('quote.table.passengerType')}
                </p>
            ),
            dataIndex: 'passengerType.name',
            key: 'passengerType.name',
            width: 200,
            render: (_, record: QuoteLineDto) => (
                <PassengerTypeSelect
                    isForm
                    className="mb-0"
                    name={[type, 'passengerTypeId', record?.id ?? '']}
                    initialValue={record?.passengerTypeId}
                    isDisableOption
                    placeholder={i18n.t('tour.fare.passengerType')}
                    rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                    isFit={tourType === TourType.FIT}
                    isGit={tourType === TourType.GIT}
                />
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('quote.table.quantity')}
                </p>
            ),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 80,
            render: (value: string, record: QuoteLineDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="number"
                    name={[type, 'quantity', record.id!]}
                    initialValue={value}
                    rules={[
                        { required: true, message: i18n.t(`validation.default.validDefault`) },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                />
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('quote.table.price')}
                </p>
            ),
            dataIndex: 'price',
            key: 'price',
            width: 200,
            render: (value: string, record: QuoteLineDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="number"
                    name={[type, 'price', record.id!]}
                    initialValue={value}
                    rules={[
                        { required: true, message: i18n.t(`validation.default.validDefault`) },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                />
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('Số lần')}
                </p>
            ),
            dataIndex: 'times',
            key: 'times',
            width: 200,
            render: (value: string, record: QuoteLineDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="number"
                    name={[type, 'times', record.id!]}
                    initialValue={value}
                    rules={[
                        { required: true, message: i18n.t(`validation.default.validDefault`) },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                />
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('tour.tourDetail.currencyType')}
                </p>
            ),
            dataIndex: 'currencyId',
            key: 'currencyId',
            width: 200,
            render: (value: string, record: QuoteLineDto) => {
                return (
                    <CurrenciesSelect
                        className="mb-0"
                        isForm
                        rules={[{ required: true, message: i18n.t('validation.tour.validCurrencyType') }]}
                        name={[type, 'currencyId', record.id!]}
                        initialValue={value}
                        onChange={(value: string) => handleChangeCurrency(value, record.id!)}
                        showAll
                    />
                );
            },
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('Tỷ giá')}
                </p>
            ),
            dataIndex: 'exchangeRate',
            key: 'exchangeRate',
            width: 200,
            render: (value: string, record: QuoteLineDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="number"
                    name={[type, 'exchangeRate', record.id!]}
                    initialValue={value}
                    rules={[
                        { required: true, message: i18n.t(`validation.default.validDefault`) },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                />
            ),
        },
        {
            title: type === QuoteType.Revenue ? i18n.t('quote.table.income') : i18n.t('quote.table.outcome'),
            dataIndex: 'amount',
            key: 'amount',
            width: 200,
            render: (_, record: QuoteLineDto) => (
                <InputNumber
                    className="w-full mb-0"
                    disabled
                    value={Intl.NumberFormat('en-US').format(Number(calculateReceived(record.id!)))}
                />
            ),
        },
        {
            title: i18n.t('quote.table.vat'),
            dataIndex: 'vat',
            key: 'vat',
            width: 200,
            render: (_, record: QuoteLineDto) => (
                <VatSelect isForm className="mb-0" name={[type, 'vatId', record.id!]} initialValue={record?.vatId} />
            ),
        },
        {
            title: i18n.t('quote.table.tax'),
            dataIndex: 'tax',
            key: 'tax',
            width: 200,
            render: (_, record: QuoteLineDto) => (
                <InputNumber
                    className="w-full mb-0"
                    disabled
                    value={Intl.NumberFormat('en-US').format(Number(calculateTaxOnRow(record.id!)))}
                />
            ),
        },
        {
            title: type === QuoteType.Revenue ? i18n.t('quote.table.revenue') : i18n.t('quote.table.cost'),
            dataIndex: 'revenue',
            key: 'revenue',
            width: 200,
            render: (_, record: QuoteLineDto) => (
                <InputNumber
                    className="w-full mb-0"
                    disabled
                    value={Intl.NumberFormat('en-US').format(Number(calculateRevenueOnRow(record.id!)))}
                />
            ),
        },
        {
            title: i18n.t('quote.table.note'),
            dataIndex: 'note',
            key: 'note',
            width: 200,
            render: (value: string, record: QuoteLineDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="text"
                    name={[type, 'note', record.id!]}
                    initialValue={value}
                    showCount
                    maxCountNumber={500}
                />
            ),
        },
        {
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: QuoteLineDto) => (
                <Can permissions={getPermission(tourType, [PermissionType.Update])}>
                    <div className="flex gap-4 justify-center">
                        <DeleteOutlined onClick={() => onDelete(record)} />
                    </div>
                </Can>
            ),
        },
    ];

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                    <Table.Summary.Cell index={7}></Table.Summary.Cell>
                    <Table.Summary.Cell index={8}></Table.Summary.Cell>
                    <Table.Summary.Cell index={9}></Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={10}>
                        {Format.formatNumber(calculateTotalReceived())}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={11}></Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={12}>
                        {Format.formatNumber(calculateTotalTax())}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={13}>
                        {Format.formatNumber(calculateTotalRevenue())}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={14}></Table.Summary.Cell>
                    <Table.Summary.Cell index={15}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <div>
            <ButtonAddRow title="" handleAdd={handleAdd} />
            <Table
                className="w-max-[1366px] text-center overflow-x-auto block"
                size="small"
                bordered
                columns={columns}
                rowKey="id"
                dataSource={dataForm}
                scroll={{ x: 2020, y: 500 }}
                pagination={false}
                summary={handleSummary}
            />
        </div>
    );
};
