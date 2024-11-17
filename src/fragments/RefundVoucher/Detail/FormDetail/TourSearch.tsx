import { TourSaleOrder, saleOrderApprovedStatus } from '../Features';
import { useCallback, useEffect, useState } from 'react';

import { FormInstance } from 'antd';
import { OnForm } from '@components/customizes/AutoComplete/TourAutoComplete/OnForm';
import { ReceivableVoucherDto } from '@sdk/tour-operations';
import isEmpty from 'lodash/isEmpty';
import { pageSize } from '@utils/filterSearch';
import { useGetListTourFitDropdown } from '@components/customizes/AutoComplete/TourAutoComplete/mutation';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchSaleOrderFromTour } from '@fragments/RefundVoucher/hook/useRefundVoucher';

interface TourSearchProps {
    name?: string[] | string;
    setDataTourSale: React.Dispatch<React.SetStateAction<TourSaleOrder[]>>;
    recordId: string;
    form: FormInstance;
    initialValue?: string;
    disabled?: boolean;
    dataRefundDetail: ReceivableVoucherDto;
}

export const TourSearch: React.FC<TourSearchProps> = props => {
    const { setDataTourSale, recordId, form, initialValue, disabled, dataRefundDetail } = props;
    const [selectData, setSelectData] = useState<{ value: string; label: string; disabled: boolean }[]>([]);
    const [tourSelectId, setTourSelectId] = useState<string | undefined>(initialValue);

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
    };

    const { itemReceivable } = useSaleOrderStore(state => state);

    const { data: fetchDataListSOFromTour, isSuccess } = useSearchSaleOrderFromTour(tourSelectId);
    const { mutateAsync: getFetchDataList, isLoading } = useGetListTourFitDropdown();

    const handleSelectTour = (id: string) => {
        ['saleOrderIdLines', 'totalIncludeVatAmtLines', 'amountLines'].forEach(fieldName => {
            form.setFieldValue([fieldName, recordId], null);
        });
        setTourSelectId(id);
    };

    const handleAddDataToSO = useCallback(() => {
        const saleOrderIdOfTourSelected = dataRefundDetail?.receivableVoucherLines?.map(item => item.saleOrderId);
        const dataTourSelected =
            dataRefundDetail.receivableVoucherLines
                ?.filter(item => item.tourScheduleId === tourSelectId)
                .map(data => {
                    return {
                        value: data.tourScheduleId ?? '',
                        label: `${data.tourScheduleTourCode}-${data.tourScheduleName}`,
                        disabled: false,
                    };
                }) ?? [];
        const saleOrderOfTourSelectedBefore =
            dataRefundDetail?.receivableVoucherLines
                ?.filter(item => item.tourScheduleId === tourSelectId)
                .map(data => {
                    return {
                        value: data.saleOrderId ?? '',
                        label: data.saleOrderOrderNo ?? '',
                        disabled: false,
                    };
                }) ?? [];
        const listSaleOrderFetchCreate =
            fetchDataListSOFromTour?.data
                ?.filter(data => saleOrderApprovedStatus(data.status) && !saleOrderIdOfTourSelected?.includes(data.id))
                .map(item => {
                    return {
                        value: item.id ?? '',
                        label: item.orderNo ?? '',
                        disabled: false,
                    };
                }) ?? [];

        const dataFetch: TourSaleOrder = {
            tourId: tourSelectId ?? '',
            listSaleOrder: [...saleOrderOfTourSelectedBefore, ...listSaleOrderFetchCreate],
        };
        setDataTourSale(prevData => [...prevData, dataFetch]);
        setSelectData(prevData => [...prevData, ...dataTourSelected]);
    }, [dataRefundDetail?.receivableVoucherLines, fetchDataListSOFromTour?.data, setDataTourSale, tourSelectId]);

    useEffect(() => {
        if (!isEmpty(itemReceivable.orderData)) {
            setSelectData([
                {
                    value: `${itemReceivable.orderData.tourScheduleId}`,
                    label: `${itemReceivable.orderData.tourCode}-${itemReceivable.orderData.tourName}`,
                    disabled: false,
                },
            ]);
        } else {
            if (dataRefundDetail) {
                const dataMap =
                    dataRefundDetail.receivableVoucherLines
                        ?.filter(item => item.tourScheduleId === initialValue)
                        .map(data => {
                            return {
                                value: `${data?.tourScheduleId}`,
                                label: `${data?.tourScheduleTourCode}-${data?.tourScheduleName}`,
                                disabled: false,
                            };
                        }) ?? [];
                setSelectData(dataMap);
            }
        }
    }, [dataRefundDetail, initialValue, itemReceivable]);

    useEffect(() => {
        if (tourSelectId && isSuccess) {
            handleAddDataToSO();
            setTourSelectId(undefined);
        }
    }, [handleAddDataToSO, isSuccess, tourSelectId]);

    return (
        <OnForm
            {...props}
            className="mb-0"
            initialValue={initialValue}
            requestSearch={paramsSearch}
            dataSelected={dataRefundDetail ? selectData : []}
            handleSelectOutSide={id => handleSelectTour(id)}
            disabled={disabled}
            hookOnChange={getFetchDataList}
            loading={isLoading}
        />
    );
};
