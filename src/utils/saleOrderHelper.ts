import { SaleOrderDto } from '../../sdk/tour-operations';

export const calTotalRemainAmt = (saleOrder?: SaleOrderDto) => {
    return (saleOrder?.totalIncludeVatAmt ?? 0) - (saleOrder?.paymentAmt ?? 0);
};

export const calTotalRemainRefundVoucherAmt = (saleOrder?: SaleOrderDto) => {
    const countFirst =
        (saleOrder?.paymentAmt ?? 0) - (saleOrder?.nonRefundableVisaFees ?? 0) - (saleOrder?.penaltyFee ?? 0);
    return Math.abs(countFirst) - (saleOrder?.totalReturnAmt ?? 0);
};
