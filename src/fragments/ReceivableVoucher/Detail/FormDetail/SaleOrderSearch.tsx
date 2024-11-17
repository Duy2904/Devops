import { FormInstance, Select } from 'antd';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { calTotalRemainAmt } from '@utils/saleOrderHelper';
import isNil from 'lodash/isNil';
import { toastWarning } from '@components/ui/Toast/Toast';
import { useFetchSaleOrder } from '@fragments/ReceivableVoucher/hook/useReceivableVoucher';

interface SaleOrderSearchProps {
    name?: string[] | string;
    optionData: { value: string; label: string }[];
    form: FormInstance;
    recordId: string;
    setListSaleOrderSelected: React.Dispatch<React.SetStateAction<{ id: string; saleOrderSelected: string }[]>>;
    listSaleOrderSelected: { id: string; saleOrderSelected: string }[];
    initialValue?: string;
    recId?: string;
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
        recId,
        setTravellerId,
    } = props;
    const [saleOrderId, setSaleOrderId] = useState<string | undefined>(initialValue);

    const { data, isSuccess } = useFetchSaleOrder(saleOrderId);

    const clearFields = () => {
        ['totalIncludeVatAmtLines', 'amountLines'].forEach(fieldName => {
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
    };

    const setDataToForm = useCallback(() => {
        if (!saleOrderId || !isSuccess) return;

        if (!recId) {
            const totalRemainAmt = calTotalRemainAmt(data);
            form.setFieldValue(['totalIncludeVatAmtLines', recordId], totalRemainAmt);
            form.setFieldValue(['amountLines', recordId], totalRemainAmt);
            setTravellerId(data.travellerId ?? '');

            const contactPhone = form.getFieldValue('contactPhone');
            const contactEmail = form.getFieldValue('contactEmail');
            const contactAddress = form.getFieldValue('contactAddress');

            if (!contactPhone && !contactEmail && !contactAddress) {
                form.setFieldsValue({
                    contactPhone: data.contactPhone,
                    contactName: data.contactName,
                    contactEmail: data.contactEmail,
                    contactAddress: data.contactAddress,
                    travellerId: data.travellerId,
                });
            }
            if (isNil(form.getFieldValue('currencyId'))) {
                form.setFieldValue('currencyId', data.currency?.id);
            }

            setSaleOrderId(undefined);
        }
    }, [data, form, isSuccess, recId, recordId, saleOrderId, setTravellerId]);

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
                disabled={!!initialValue || !!form.getFieldValue('id')}
            />
        );
    };

    return <BaseSelect isForm className="w-full mb-0" name={name} items={select()} initialValue={initialValue} />;
};
