import { AnyObject } from 'antd/es/_util/type';
import isEmpty from 'lodash/isEmpty';

import {
    CurrencyDto,
    ItineraryCode,
    LocationDto,
    PaginationResponseOfVatDto,
    QuoteLineDto,
    QuoteStatus,
    SearchQuoteDto,
} from '@sdk/tour-operations';
import i18n from '@src/i18n';

export const getQuoteStatus = () =>
    Object.values(QuoteStatus).map((key: string | QuoteStatus) => ({
        value: key,
        label: i18n.t(`quote.status.${key}`),
    }));

export const calculateReceivedItem = (item: AnyObject) => {
    return (item?.['quantity'] ?? 0) * (item?.['price'] ?? 0) * (item?.['times'] ?? 0) * (item?.['exchangeRate'] ?? 0);
};

export const calculateTaxItem = (received: number, vat: number) => {
    return (received / (1 + vat)) * vat;
};

export const calculateTotal = (list: AnyObject[], dataVAT: PaginationResponseOfVatDto | undefined) => {
    let total = 0;
    list.forEach(x => {
        const vat = dataVAT?.data?.find(y => y.id === x.vatId)?.value ?? 0;

        if (x.quantity > 0 && x.price > 0) {
            const received = calculateReceivedItem(x);
            total += received - calculateTaxItem(received, vat);
        }
    });
    return total;
};

export interface RouteCloneQuoteState {
    clonedId?: string;
}

export const isOnlyOneStatus = (status: QuoteStatus, rowSelected: React.Key[], quoteData: SearchQuoteDto[]) => {
    if (rowSelected?.length === 0) return false;

    const filterStatus = quoteData?.filter(item => item.id && rowSelected.includes(item.id) && item.status === status);

    return filterStatus.length === rowSelected.length;
};

export const shouldDisableAllForm = (quoteStatus: QuoteStatus | null | undefined) => {
    return quoteStatus === QuoteStatus.Confirm;
};

export const getNameItinerary = (destinationId: string, itineraryCode: ItineraryCode, locations: LocationDto[]) => {
    const tempDataFind = locations.find((item: LocationDto) => item.id === destinationId);

    return !isEmpty(tempDataFind)
        ? `${tempDataFind?.code ?? ''}${itineraryCode} - ${tempDataFind?.name ?? tempDataFind?.code}`
        : '';
};

export const getCurrencySelect = (listCurrency: CurrencyDto[], record: QuoteLineDto) => {
    return listCurrency
        .filter(x => x.id == record.currencyId)
        .map(item => ({
            value: item.id ?? '',
            label: item.name ?? '',
        }));
};
