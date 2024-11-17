import { FormInstance, Select } from 'antd';
import { SaleOrderByTourDto, TourVisaDto } from '@sdk/tour-operations';
import { useCallback, useEffect, useState } from 'react';
import { useGetCountries, useGetLocations, useGetSaleOrderListFromVisa } from '../../hook/useDocumentReceiptVisa';

import { AnyObject } from 'antd/es/_util/type';
import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useDebouncedCallback } from 'use-debounce';
import { useSaleOrderStore } from '@store/saleOrderStore';

interface SaleOrderSearchProps {
    form: FormInstance;
    name?: string;
    setDataSOSelected: React.Dispatch<React.SetStateAction<SaleOrderByTourDto>>;
    disabled: boolean;
    dataDocumentVisa?: TourVisaDto;
}

export const SaleOrderSearch: React.FC<SaleOrderSearchProps> = props => {
    const { form, name, setDataSOSelected, disabled, dataDocumentVisa } = props;
    const [optionData, setOptionData] = useState<AnyObject[]>([]);
    const [dataSearch, setDataSearch] = useState<SaleOrderByTourDto[]>([]);

    const { mutateAsync: fetchData, isLoading } = useGetSaleOrderListFromVisa();
    const { data: dataContries } = useGetCountries();
    const { data: dataLocation } = useGetLocations();

    const { itemReceivable } = useSaleOrderStore(state => state);

    const handleSearch = useDebouncedCallback(async (value: string) => {
        const res = await fetchData(value);
        if (res) {
            const tempData =
                res.data?.map(item => {
                    const contentCountry = fetchContentCountry(item);
                    return {
                        value: `${item.id}`,
                        label: (
                            <p className="leading-5 py-1">
                                {`${item.orderNo} - ${item.contactName} - ${item.contactPhone}`} <br />
                                {`${item.tourSchedule?.tourCode} - ${item.tourSchedule?.name} - ${contentCountry}`}
                            </p>
                        ),
                    };
                }) ?? [];
            setOptionData(tempData);
            setDataSearch(res?.data ?? []);
        }
    }, 500);

    const handleSelectSO = useCallback(
        (value: string) => {
            const { orderNo } = itemReceivable.orderData;
            const tempData = dataSearch.find(item => item.id == value);
            tempData ? setDataSOSelected(tempData ?? {}) : handleSearch(orderNo ?? '');
        },
        [dataSearch, handleSearch, itemReceivable.orderData, setDataSOSelected],
    );

    const filterOption = (input: string, option: AnyObject) => {
        const contentMerge =
            option.label.props.children[0] + option.label.props.children[1] + option.label.props.children[3]; // Get the content of the option's label
        return contentMerge.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const fetchContentCountry = useCallback(
        (item: SaleOrderByTourDto) => {
            const locationId = dataLocation?.data?.find(
                value => value.id == item.tourSchedule?.destinationLocationId,
            )?.countryId;
            return dataContries?.data?.find(item => item.id === locationId)?.name;
        },
        [dataContries?.data, dataLocation?.data],
    );

    useEffect(() => {
        if (dataDocumentVisa) {
            const contentCountry = fetchContentCountry(dataDocumentVisa);
            const tempData = {
                value: `${dataDocumentVisa.saleOrderId}`,
                label: (
                    <p className="leading-5 py-1">
                        {`${dataDocumentVisa.saleOrderOrderNo} - ${dataDocumentVisa.saleOrderContactName} - ${dataDocumentVisa.saleOrderContactPhone}`}{' '}
                        <br />
                        {`${dataDocumentVisa.tourSchedule?.tourCode} - ${dataDocumentVisa.tourSchedule?.name} - ${contentCountry}`}
                    </p>
                ),
            };
            setOptionData([tempData]);
        }
    }, [dataDocumentVisa, fetchContentCountry]);

    useEffect(() => {
        if (!isEmpty(itemReceivable.orderData) && !dataDocumentVisa?.id) {
            const { id } = itemReceivable.orderData;
            form.setFieldValue('saleOrderId', id);
            handleSelectSO(id ?? '');
        }
    }, [dataDocumentVisa?.id, form, handleSelectSO, itemReceivable.orderData]);

    const select = () => {
        return (
            <Select
                className="w-full h-fit"
                virtual={false}
                showSearch
                placeholder="--Chọn Đơn hàng bán--"
                optionFilterProp="children"
                filterOption={(input, option) => filterOption(input, option ?? [])}
                options={optionData as { label: string; value: string }[]}
                notFoundContent={isEmpty(optionData) && false}
                onSearch={handleSearch}
                onSelect={handleSelectSO}
                disabled={disabled}
                loading={isLoading}
            />
        );
    };

    return (
        <BaseSelect
            isForm
            className="w-full"
            name={name}
            items={select()}
            label={i18n.t('Đơn hàng')}
            rules={[
                {
                    required: true,
                    message: i18n.t('validation.default.validDefault'),
                },
            ]}
        />
    );
};
