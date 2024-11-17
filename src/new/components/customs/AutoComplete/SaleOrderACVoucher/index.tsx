import { EmptyComponent } from '@src/new/components/common/Empty';
import { Col, Form, Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FormInstance, Rule } from 'antd/es/form';
import React, { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchSaleOrderFromVoucher } from './useSearch';
import isEmpty from 'lodash/isEmpty';
import { DropdownRemainAmtDto, OrderStatus, ReceivableVoucherLineDto, SearchSaleOrderViewDto } from '@sdk/tour-operations';
import { toastWarning } from '@components/ui/Toast/Toast';
import isNil from 'lodash/isNil';
import { SaleOrderSelected } from '@src/new/fragments/ReceivableVoucher/pages/FormDetail/components/CollapseBlock/TableData';

interface SaleOrderAutoCompleteProps {
    className?: string;
    label?: React.ReactNode;
    name?: string | string[];
    rules?: Rule[];
    initialValue?: string;
    placeholder?: string;
    disabled?: boolean;
    key?: string;

    form: FormInstance;
    arrStatusAccepted?: OrderStatus[];
    recordId: string;
    listSaleOrderSelected: SaleOrderSelected[];
    arrDataLines?: ReceivableVoucherLineDto[];
    itemReceivable?: AnyObject;
    setListSaleOrderSelected: React.Dispatch<React.SetStateAction<SaleOrderSelected[]>>;
    setTravellerId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const SaleOrderAutoComplete: React.FC<SaleOrderAutoCompleteProps> = props => {
    const {
        className,
        label,
        name,
        rules,
        initialValue,
        placeholder,
        disabled,
        key = '',

        form,
        arrStatusAccepted,
        recordId,
        listSaleOrderSelected,
        arrDataLines,
        itemReceivable,
        setListSaleOrderSelected,
        setTravellerId,
    } = props;

    const [options, setOptions] = useState<{ value: string | undefined; label: ReactNode }[]>([]);
    const [dataList, setDataList] = useState<DropdownRemainAmtDto[]>([]);
    const [isEmptyData, setIsEmptyData] = useState<boolean>(false);

    const { mutateAsync: fetchData, isLoading } = useFetchSaleOrderFromVoucher(key);

    const filterOption = (input: string, option: AnyObject) => {
        const contentMerge =
            option.label.props.children.props.children[0].props.children +
            option.label.props.children.props.children[1].props.children +
            option.label.props.children.props.children[2].props.children; // Get the content of the option's label
        return contentMerge.toString().toLowerCase().includes(input.toLowerCase());
    };

    const clearFields = () => {
        ['tourScheduleIdLines', 'saleOrderIdLines', 'totalIncludeVatAmtLines', 'amountLines'].forEach(fieldName => {
            form.setFieldValue([fieldName, recordId], null);
        });
    };

    const setTravelId = (dataSelected: DropdownRemainAmtDto) => {
        if (dataSelected.travellerId) {
            form.setFieldValue('travellerId', dataSelected.travellerId);
            setTravellerId(dataSelected.travellerId);
        }
    };

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (value.length == 0) {
            setIsEmptyData(false);
            return;
        }
        const advancedSearchKeyword = {
            fields: ['OrderNo', 'TourCode', 'TourName'],
            keyword: value,
        };
        const res = await fetchData({
            statuses: arrStatusAccepted,
            travellerId: form.getFieldValue('travellerId'),
            advancedSearch: advancedSearchKeyword,
            pageSize: 10,
        });
        if (!isEmpty(res)) {
            const tempData =
                res?.map(item => {
                    return {
                        value: `${item.id}`,
                        label: (
                            <Col className="py-2">
                                {item ? (
                                    <Fragment>
                                        <p className="text-sm text-blue-600 font-bold">{item.orderNo}</p>
                                        <p className="text-sm font-semibold mt-2 mb-1">{item.tourName}</p>
                                        <p className="text-xs bg-slate-200 rounded-md w-fit p-1 px-2 border border-solid border-gray-300">
                                            {item.tourCode}
                                        </p>
                                    </Fragment>
                                ) : (
                                    '-'
                                )}
                            </Col>
                        ),
                    };
                }) ?? [];
            setOptions(tempData);
            setDataList(res);
        } else {
            setIsEmptyData(true);
        }
    }, 500);

    const handleSelect = (id: string) => {
        const dataSelected = dataList.find(item => item.id == id);
        const alreadySelected = listSaleOrderSelected.find(item => item.orderId === id && item.id !== recordId);

        if (alreadySelected) {
            toastWarning('Cảnh báo', 'Đơn hàng bán đã được chọn trước đó');
            clearFields();
            return;
        }

        const updatedList = listSaleOrderSelected.map(item => {
            if (item.id === recordId) {
                return { ...item, orderId: dataSelected?.id ?? '', orderNo: dataSelected?.orderNo ?? '' };
            }
            return item;
        });

        if (!listSaleOrderSelected.some(item => item.id === recordId)) {
            updatedList.push({ id: recordId, orderId: dataSelected?.id ?? '', orderNo: dataSelected?.orderNo ?? '' });
        }

        form.setFieldValue(['totalIncludeVatAmtLines', recordId], dataSelected?.remainAmt);
        form.setFieldValue(['amountLines', recordId], dataSelected?.remainAmt);
        form.setFieldValue(['tourScheduleIdLines', recordId], dataSelected?.tourScheduleId);

        setListSaleOrderSelected(updatedList);
        dataSelected && setTravelId(dataSelected);
    };

    const optionRender = (item: AnyObject) => {
        return item.saleOrderId && {
            value: item.saleOrderId,
            label: (
                <Col className="py-2">
                    {item ? (
                        <Fragment>
                            <p className="text-sm text-blue-600 font-bold">{item.saleOrderOrderNo}</p>
                            <p className="text-sm font-semibold mt-2 mb-1">{item.tourScheduleName}</p>
                            <p className="text-xs bg-slate-200 rounded-md w-fit p-1 px-2 border border-solid border-gray-300">
                                {item.tourScheduleTourCode}
                            </p>
                        </Fragment>
                    ) : (
                        '-'
                    )}
                </Col>
            ),
        }
    }

    const optionRenderFromItemReceivable = (item: SearchSaleOrderViewDto) => {
        return {
            value: item.id,
            label: (
                <Col className="py-2">
                    {item ? (
                        <Fragment>
                            <p className="text-sm text-blue-600 font-bold">{item.orderNo}</p>
                            <p className="text-sm font-semibold mt-2 mb-1">{item.tourName}</p>
                            <p className="text-xs bg-slate-200 rounded-md w-fit p-1 px-2 border border-solid border-gray-300">
                                {item.tourCode}
                            </p>
                        </Fragment>
                    ) : (
                        '-'
                    )}
                </Col>
            ),
        }
    }

    const defaultOptionFromDataRecLines = useMemo(() => {
        const tempData = arrDataLines?.find(item => item.id === recordId);
        if (tempData) {
            return optionRender(tempData);
        }
        return null;
    }, [arrDataLines, recordId])

    const optionsData = useMemo(() => {
        const optionsMap = options.filter(data => !isNil(data.value));
        const optionsWithDuplicates = defaultOptionFromDataRecLines ? [defaultOptionFromDataRecLines, ...optionsMap] : optionsMap;
        const uniqueArray = optionsWithDuplicates.filter(
            (value, index, self) =>
                index === self.findIndex((obj) => obj.value === value.value)
        );
        return uniqueArray;
    }, [defaultOptionFromDataRecLines, options])

    useEffect(() => {
        if (itemReceivable?.orderData) {
            const dataOption = optionRenderFromItemReceivable(itemReceivable.orderData);
            setOptions([dataOption]);
        }
    }, [itemReceivable?.orderData])

    return (
        <Form.Item
            className={`${className} mb-0`}
            label={label}
            name={name}
            rules={rules}
            initialValue={initialValue}
        >
            <Select
                className="w-full h-fit"
                options={optionsData}
                filterOption={(input, option) => filterOption(input, option ?? [])}
                placeholder={placeholder}
                virtual={false}
                disabled={disabled}
                loading={isLoading}
                notFoundContent={isEmptyData && <EmptyComponent />} // disable Dropdown if haven't options
                onSearch={handleSearch}
                onSelect={handleSelect}
                showSearch
            />
        </Form.Item>
    );
};
