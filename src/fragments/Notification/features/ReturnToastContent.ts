import { toastBasic } from '@components/ui/Toast/Toast';
import i18n from '@src/i18n';

import {
    QuoteApproved,
    QuoteCancelled,
    QuoteConfirmation,
    QuoteGitConfirmation,
    QuoteRejected,
} from '../content/ContentQuote';
import { voucherApproval, voucherSendForConfirmation } from '../content/ContentReceivableVoucher';
import {
    refundvoucherConfirmation,
    refundVoucherSendForConfirmation,
    voucherApproved,
    voucherRejected,
    voucherSendForApprove,
} from '../content/ContentRefundVoucher';
import {
    confirmedSO,
    guaranteeSO,
    paymentLessThanDepositSO,
    refundSO,
    waitConfirmOverloadSO,
} from '../content/ContentSaleOrder';
import { changeTourSO } from '../content/ContentSaleOrderChangeTour';
import {
    anotherContentTour,
    cancelTourSchedule,
    updateTourCodeInWaitingForApproval,
    waitConfirmContentTour,
} from '../content/ContentTour';
import {
    arrTitleNotiSaleOrder,
    arrTitleNotiTourSchedule,
    arrTitleQuote,
    arrTitleReceivableVoucher,
    arrTitleRefundVoucher,
} from './ArrayTitle';
import { DataSignal } from './NotificationFeature';
import { bookingSOFailed, bookingSOInProgress, bookingSOSuccess } from '../content/ContentSaleOrderBookingThienNhien';

const toastForTourSchedule = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Tour
        case 'SendForApproval': // tour send for approval
        case 'SendForApprovalTimeout': // send for approval timeout
            return toastBasic(i18n.t('notification.title'), waitConfirmContentTour(fetchRes.data));
        case 'TourApproval': // approved or rejected
            return toastBasic(i18n.t('notification.title'), anotherContentTour(fetchRes.data));

        case 'UpdateTourCodeInWaitingForApproval': // change tour code in waiting for approval
            return toastBasic(i18n.t('notification.title'), updateTourCodeInWaitingForApproval(fetchRes.data));

        case 'CancelTourSchedule': // Cancel Tour Schedule
            return toastBasic(i18n.t('notification.title'), cancelTourSchedule(fetchRes.data));
    }
};

const toastForSaleOrder = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Sale Order
        case 'SaleOrderOverload': // overload status
            return toastBasic(i18n.t('notification.title'), waitConfirmOverloadSO(fetchRes.data));

        case 'SaleOrderGuarantee': // guarantee SO - send for approval
            return toastBasic(i18n.t('notification.title'), guaranteeSO(fetchRes.data));

        case 'SaleOrderConfirming': // paid < deposit SO - send for approval
        case 'SaleOrderPaymentLessThanDeposit':
            return toastBasic(i18n.t('notification.title'), paymentLessThanDepositSO(fetchRes.data));

        case 'SaleOrderOverloadApproval': // approved or rejected overload SO
            return toastBasic(i18n.t('notification.title'), confirmedSO(fetchRes.data));

        case 'SaleOrderGuaranteeApproval': // approved or rejected guarantee SO
            return toastBasic(i18n.t('notification.title'), confirmedSO(fetchRes.data));

        case 'SaleOrderConfirmingApproval': // approved or rejected confirming SO
            return toastBasic(i18n.t('notification.title'), confirmedSO(fetchRes.data));

        case 'SaleOrderRefund': // SO - refund
            return toastBasic(i18n.t('notification.title'), refundSO(fetchRes.data));

        case 'SaleOrderTransfer': // SO - change tour
            return toastBasic(i18n.t('notification.title'), changeTourSO(fetchRes.data));

        case 'SaleOrderBookingThienNhienInProgress': // SO - booking
            return toastBasic(i18n.t('notification.title'), bookingSOInProgress(fetchRes.data));
        
        case 'SaleOrderBookingThienNhienFailed': // SO - booking failed
            return toastBasic(i18n.t('notification.title'), bookingSOFailed(fetchRes.data));
    
        case 'SaleOrderBookingThienNhienSuccess':
            return toastBasic(i18n.t('notification.title'), bookingSOSuccess(fetchRes.data));
    }
};

const toastForReceivableVoucher = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Receivable Voucher
        case 'VoucherSendForConfirmation': // voucher send for confirmation
            return toastBasic(i18n.t('notification.title'), voucherSendForConfirmation(fetchRes.data));

        case 'VoucherConfirmation': // approved
            return toastBasic(i18n.t('notification.title'), voucherApproval(fetchRes.data));
    }
};

const toastForRefundVoucher = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Refund Voucher
        case 'RefundVoucherSendForApproval': // voucher send for approval
            return toastBasic(i18n.t('notification.title'), voucherSendForApprove(fetchRes.data));

        case 'RefundVoucherSendForConfirmation': // refund voucher send for confirmation to KT
            return toastBasic(i18n.t('notification.title'), refundVoucherSendForConfirmation(fetchRes.data));

        case 'RefundVoucherConfirmation': // KT approved
            return toastBasic(i18n.t('notification.title'), refundvoucherConfirmation(fetchRes.data));

        case 'RefundVoucherApproved': // manager approved
            return toastBasic(i18n.t('notification.title'), voucherApproved(fetchRes.data));

        case 'RefundVoucherRejected': // manager rejected
            return toastBasic(i18n.t('notification.title'), voucherRejected(fetchRes.data));
    }
};

const toastForQuote = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Quote
        case 'QuoteConfirmation': // quote send request for approval
            return toastBasic(i18n.t('notification.title'), QuoteConfirmation(fetchRes.data));

        case 'QuoteApproved': // quote approved
            return toastBasic(i18n.t('notification.title'), QuoteApproved(fetchRes.data));

        case 'QuoteRejected': // quote rejected
            return toastBasic(i18n.t('notification.title'), QuoteRejected(fetchRes.data));

        case 'QuoteCancelled': // quote cancelled
            return toastBasic(i18n.t('notification.title'), QuoteCancelled(fetchRes.data));

        case 'QuoteGitConfirmation': // quote git send request for approval
            return toastBasic(i18n.t('notification.title'), QuoteGitConfirmation(fetchRes.data));
    }
};

export const returnToast = (fetchRes: DataSignal) => {
    let contentString;
    const titleNoti = fetchRes.title;
    if (arrTitleNotiTourSchedule.includes(titleNoti)) {
        contentString = toastForTourSchedule(fetchRes, titleNoti);
    }
    if (arrTitleNotiSaleOrder.includes(titleNoti)) {
        contentString = toastForSaleOrder(fetchRes, titleNoti);
    }
    if (arrTitleReceivableVoucher.includes(titleNoti)) {
        contentString = toastForReceivableVoucher(fetchRes, titleNoti);
    }
    if (arrTitleRefundVoucher.includes(titleNoti)) {
        contentString = toastForRefundVoucher(fetchRes, titleNoti);
    }
    if (arrTitleQuote.includes(titleNoti)) {
        contentString = toastForQuote(fetchRes, titleNoti);
    }
    return contentString;
};
