import { TourSaleOrder, saleOrderApprovedStatus } from '../Features';
import { useCallback, useEffect, useState } from 'react';

import { FormInstance } from 'antd';
import { OnForm } from '@components/customizes/AutoComplete/TourAutoComplete/OnForm';
import { ReceivableVoucherDto } from '@sdk/tour-operations';
import { calTotalRemainAmt } from '@utils/saleOrderHelper';
import isEmpty from 'lodash/isEmpty';
import { pageSize } from '@utils/filterSearch';
import { useGetListTourFitDropdown } from '@components/customizes/AutoComplete/TourAutoComplete/mutation';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchSaleOrderFromTour } from '@fragments/ReceivableVoucher/hook/useReceivableVoucher';

interface TourSearchProps {
    name?: string[] | string;
    setDataTourSale: React.Dispatch<React.SetStateAction<TourSaleOrder[]>>;
    recordId: string;
    form: FormInstance;
    initialValue?: string;
    dataRec: ReceivableVoucherDto;
}

export const TourSearch: React.FC<TourSearchProps> = props => {
    const { setDataTourSale, recordId, form, initialValue, dataRec } = props;
    const [selectData, setSelectData] = useState<{ value: string; label: string; disabled: boolean }[]>([]);
    const [tourSelectId, setTourSelectId] = useState<string | undefined>(initialValue);

    const { itemReceivable } = useSaleOrderStore(state => state);

    const { data: fetchDataListSOFromTour, isSuccess } = useSearchSaleOrderFromTour(tourSelectId);
    const { mutateAsync: getFetchDataList, isLoading } = useGetListTourFitDropdown();

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
    };

    const handleSelectTour = (id: string) => {
        ['saleOrderIdLines', 'totalIncludeVatAmtLines', 'amountLines'].forEach(fieldName => {
            form.setFieldValue([fieldName, recordId], null);
        });
        setTourSelectId(id);
    };

    const handleAddDataToSO = useCallback(() => {
        const saleOrderIdOfTourSelected = dataRec?.receivableVoucherLines?.map(item => item.saleOrderId);
        const dataTourSelected =
            dataRec.receivableVoucherLines
                ?.filter(item => item.tourScheduleId === tourSelectId)
                .map(data => {
                    return {
                        value: data.tourScheduleId ?? '',
                        label: `${data.tourScheduleTourCode}-${data.tourScheduleName}`,
                        disabled: false,
                    };
                }) ?? [];
        const saleOrderOfTourSelectedBefore =
            dataRec?.receivableVoucherLines
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
                        disabled: !(calTotalRemainAmt(item) > 0 && saleOrderApprovedStatus(item.status)),
                    };
                }) ?? [];

        const dataFetch: TourSaleOrder = {
            tourId: tourSelectId ?? '',
            listSaleOrder: [...saleOrderOfTourSelectedBefore, ...listSaleOrderFetchCreate],
        };
        setDataTourSale(prevData => [...prevData, dataFetch]);
        setSelectData(prevData => [...prevData, ...dataTourSelected]);
    }, [dataRec.receivableVoucherLines, fetchDataListSOFromTour?.data, setDataTourSale, tourSelectId]);

    useEffect(() => {
        if (!isEmpty(itemReceivable.orderData)) {
            setSelectData([
                {
                    value: `${itemReceivable.orderData.tourScheduleId}`,
                    label: `${itemReceivable?.orderData.tourCode}-${itemReceivable?.orderData.tourName}`,
                    disabled: false,
                },
            ]);
        } else {
            if (dataRec) {
                const dataMap =
                    dataRec.receivableVoucherLines
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
    }, [dataRec, initialValue, itemReceivable]);

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
            dataSelected={selectData && selectData}
            handleSelectOutSide={id => handleSelectTour(id)}
            disabled={!!initialValue || !!form.getFieldValue('id')}
            hookOnChange={getFetchDataList}
            loading={isLoading}
        />
    );
};
