import { OrderStatus, ReceivableVoucherLineDto } from '@sdk/tour-operations';
import { SaleOrderAutoComplete } from '@src/new/components/customs/AutoComplete/SaleOrderACVoucher';
import { FormInstance } from 'antd';
import React from 'react';
import { AnyObject } from 'antd/es/_util/type';
import { SaleOrderSelected } from '.';

interface SOSearchProps {
    travellerId?: string;
    name?: string | string[];
    form: FormInstance;
    recordId: string;
    listSaleOrderSelected: SaleOrderSelected[];
    arrDataLines: ReceivableVoucherLineDto[];
    inititalValue?: string;
    disabled?: boolean;
    itemReceivable?: AnyObject;
    setListSaleOrderSelected: React.Dispatch<React.SetStateAction<SaleOrderSelected[]>>;
    setTravellerId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const arrStatusAccepted = [OrderStatus.New, OrderStatus.Confirming, OrderStatus.Confirmed, OrderStatus.Deposited];

export const SOSearch: React.FC<SOSearchProps> = props => {
    const {
        name,
        form,
        recordId,
        listSaleOrderSelected,
        arrDataLines,
        inititalValue,
        disabled,
        itemReceivable,
        setListSaleOrderSelected,
        setTravellerId,
    } = props;

    return (
        <SaleOrderAutoComplete
            arrStatusAccepted={arrStatusAccepted}
            name={name}
            form={form}
            recordId={recordId}
            listSaleOrderSelected={listSaleOrderSelected}
            arrDataLines={arrDataLines}
            initialValue={inititalValue}
            disabled={disabled}
            itemReceivable={itemReceivable}
            setListSaleOrderSelected={setListSaleOrderSelected}
            setTravellerId={setTravellerId}
        />
    );
};
