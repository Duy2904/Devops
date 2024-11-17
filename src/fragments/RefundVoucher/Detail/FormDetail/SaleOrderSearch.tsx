import { FormInstance, Select } from 'antd';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { ReceivableVoucherDto, SaleOrderDto, VoucherStatus } from '@sdk/tour-operations';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { calTotalRemainRefundVoucherAmt } from '@utils/saleOrderHelper';
import isNil from 'lodash/isNil';
import { toastWarning } from '@components/ui/Toast/Toast';
import { useFetchSaleOrder } from '@fragments/RefundVoucher/hook/useRefundVoucher';

interface SaleOrderSearchProps {
    name?: string[] | string;
    optionData: { value: string; label: string }[];
    form: FormInstance;
    recordId: string;
    setListSaleOrderSelected: React.Dispatch<React.SetStateAction<{ id: string; saleOrderSelected: string }[]>>;
    listSaleOrderSelected: { id: string; saleOrderSelected: string }[];
    initialValue?: string;
    disabled?: boolean;
    dataRefundDetail: ReceivableVoucherDto;
    setTravellerId: Dispatch<SetStateAction<string | undefined>>;
}

export const SaleOrderSearch: React.FC<SaleOrderSearchProps> = props => {
    const {
        name,
        optionData,
        form,
        recordId,
        setListSaleOrderSelected,
        listSaleOrderSelected,
        initialValue,
        disabled,
        dataRefundDetail,
        setTravellerId,
    } = props;
    const [saleOrderId, setSaleOrderId] = useState<string | undefined>(initialValue);

    const { data } = useFetchSaleOrder(saleOrderId);

    const clearFields = () => {
        ['totalIncludeVatAmtLines'].forEach(fieldName => {
            form.setFieldValue([fieldName, recordId], null);
        });
    };

    const handleSelectSO = (id: string) => {
        clearFields();

        const alreadySelected = listSaleOrderSelected.find(
            item => item.saleOrderSelected === id && item.id !== recordId,
        );
        if (alreadySelected) {
            toastWarning('Cảnh báo', 'Đơn hàng bán đã được chọn trước đó');
            form.setFieldValue(['saleOrderIdLines', recordId], null);
            return;
        }

        setSaleOrderId(id);

        const updatedList = listSaleOrderSelected.map(item => {
            if (item.id === recordId) {
                return { ...item, saleOrderSelected: id };
            }
            return item;
        });

        if (!listSaleOrderSelected.some(item => item.id === recordId)) {
            updatedList.push({ id: recordId, saleOrderSelected: id });
        }
        setListSaleOrderSelected(updatedList);
        setDataToForm();
    };

    const setDataContactPerson = useCallback(
        (data: SaleOrderDto) => {
            setTravellerId(data?.travellerId ?? '');
            if (
                !form.getFieldValue('contactPhone') &&
                !form.getFieldValue('contactEmail') &&
                !form.getFieldValue('contactPhone') &&
                !form.getFieldValue('contactAddress')
            ) {
                form.setFieldsValue({
                    contactPhone: data?.contactPhone,
                    contactName: data?.contactName,
                    contactEmail: data?.contactEmail,
                    contactAddress: data?.contactAddress,
                    travellerId: data?.travellerId,
                });
            }
        },
        [form, setTravellerId],
    );
    const setCurrencyId = useCallback(
        (data: SaleOrderDto) => {
            if (isNil(form.getFieldValue('currencyId'))) {
                form.setFieldValue('currencyId', data?.currency?.id);
            }
        },
        [form],
    );

    const setDataToForm = useCallback(() => {
        if (data) {
            const calcDataAmount = calTotalRemainRefundVoucherAmt({ ...data });
            if (
                !dataRefundDetail.status ||
                (dataRefundDetail.status &&
                    [
                        VoucherStatus.Draft,
                        VoucherStatus.WaitingForApproval,
                        VoucherStatus.Refunded,
                        VoucherStatus.Rejected,
                    ].includes(dataRefundDetail.status))
            ) {
                form.setFieldValue(['totalIncludeVatAmtLines', recordId], calcDataAmount);
                (!dataRefundDetail.status ||
                    (dataRefundDetail.status && !form.getFieldValue(['amountLines', recordId]))) &&
                    form.setFieldValue(['amountLines', recordId], calcDataAmount);
            }
            setDataContactPerson(data);
            setCurrencyId(data);
        }
    }, [data, dataRefundDetail.status, form, recordId, setCurrencyId, setDataContactPerson]);

    useEffect(() => {
        setDataToForm();
    }, [setDataToForm]);

    const select = () => {
        return (
            <Select
                className="w-full"
                virtual={false}
                showSearch
                placeholder="--Chọn Đơn hàng bán--"
                optionFilterProp="children"
                filterOption={FilterSearch.filterOption}
                options={optionData}
                onSelect={handleSelectSO}
                disabled={disabled}
            />
        );
    };

    return <BaseSelect isForm className="w-full mb-0" name={name} items={select()} initialValue={initialValue} />;
};
