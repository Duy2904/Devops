import {
    QuoteApproved,
    QuoteCancelled,
    QuoteConfirmation,
    QuoteGitConfirmation,
    QuoteRejected,
} from '../content/ContentQuote';
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
    arrTitleSetting,
    arrTitleSyncError,
} from './ArrayTitle';
import {
    confirmedSO,
    guaranteeSO,
    paymentLessThanDepositSO,
    refundSO,
    waitConfirmOverloadSO,
} from '../content/ContentSaleOrder';
import {
    landTourDepositDateReminder,
    saleOrderPrepaidDateReminder,
    tourDepartureDateReminder,
    tourFlightDepositDateReminder,
    tourFlightIssuanceDateReminder,
    tourFlightNameEntryDateReminder,
    tourHotelDepositDateReminder,
    tourVisaResultReturnDateReminder,
    tourVisaSubmissionDateReminder,
    tourVisaSubmissionToConsulateDateReminder,
} from '../content/ContentSettingScheduled';
import {
    refundVoucherSendForConfirmation,
    refundvoucherConfirmation,
    voucherApproved,
    voucherRejected,
    voucherSendForApprove,
} from '../content/ContentRefundVoucher';
import { voucherApproval, voucherSendForConfirmation } from '../content/ContentReceivableVoucher';

import { ContentSyncErrorDataTourNature } from '../content/ContentSyncError';
import { DataSignal } from './NotificationFeature';
import { changeTourSO } from '../content/ContentSaleOrderChangeTour';
import { bookingSOFailed, bookingSOInProgress, bookingSOSuccess } from '../content/ContentSaleOrderBookingThienNhien';

const contentNotiForTourSchedule = (notiDetail: DataSignal['data'], fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Tour
        case 'SendForApproval': // tour send for approval
        case 'SendForApprovalTimeout': // send for approval timeout
            return waitConfirmContentTour(notiDetail);
        case 'TourApproval': // approved or rejected
            return anotherContentTour(notiDetail);
        case 'UpdateTourCodeInWaitingForApproval': // change tour code in waiting for approval
            return updateTourCodeInWaitingForApproval(notiDetail);
        case 'CancelTourSchedule': // Cancel Tour Schedule
            return cancelTourSchedule(notiDetail);
    }
};

const contentNotiForSaleOrder = (notiDetail: DataSignal['data'], fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Sale Order
        case 'SaleOrderOverload': // overload status
            return waitConfirmOverloadSO(notiDetail);
        case 'SaleOrderGuarantee': // guarantee SO - send for approval
            return guaranteeSO(notiDetail);
        case 'SaleOrderConfirming': // paid < deposit SO - send for approval
        case 'SaleOrderPaymentLessThanDeposit':
            return paymentLessThanDepositSO(notiDetail);
        case 'SaleOrderOverloadApproval': // approved or rejected overload SO
        case 'SaleOrderGuaranteeApproval': // approved or rejected guarantee SO
        case 'SaleOrderConfirmingApproval': // approved or rejected confirming SO
            return confirmedSO(notiDetail);
        case 'SaleOrderRefund': // SO - refund
            return refundSO(notiDetail);
        case 'SaleOrderTransfer': // SO - change tour
            return changeTourSO(notiDetail);
        case 'SaleOrderBookingThienNhienFailed':
            return bookingSOFailed(notiDetail);
        case 'SaleOrderBookingThienNhienInProgress':
            return bookingSOInProgress(notiDetail);
        case 'SaleOrderBookingThienNhienSuccess':
            return bookingSOSuccess(notiDetail);
    }
};

const contentNotiForReceivableVoucher = (notiDetail: DataSignal['data'], fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Receivable Voucher
        case 'VoucherSendForConfirmation': // voucher send for confirmation
            return voucherSendForConfirmation(notiDetail);
        case 'VoucherConfirmation': // approved
            return voucherApproval(notiDetail);
    }
};

const contentNotiForRefundVoucher = (notiDetail: DataSignal['data'], fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Refund Voucher
        case 'RefundVoucherSendForApproval': // voucher send for approval
            return voucherSendForApprove(notiDetail);
        case 'RefundVoucherSendForConfirmation': // refund voucher send for confirmation to KT
            return refundVoucherSendForConfirmation(notiDetail);
        case 'RefundVoucherConfirmation': // KT approved
            return refundvoucherConfirmation(notiDetail);
        case 'RefundVoucherApproved': // manager approved
            return voucherApproved(notiDetail);
        case 'RefundVoucherRejected': // manager rejected
            return voucherRejected(notiDetail);
    }
};

const contentNotiForQuote = (notiDetail: DataSignal['data'], fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Quote
        case 'QuoteConfirmation': // quote send request for approval
            return QuoteConfirmation(notiDetail);
        case 'QuoteApproved': // quote approved
            return QuoteApproved(notiDetail);
        case 'QuoteRejected': // quote rejected
            return QuoteRejected(notiDetail);
        case 'QuoteCancelled': // quote cancelled
            return QuoteCancelled(notiDetail);
        case 'QuoteGitConfirmation': // quote git send request for approval
            return QuoteGitConfirmation(notiDetail);
    }
};

const contentNotiForSetting = (notiDetail: DataSignal['data'], fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Setting Notification
        case 'TourDepartureDateReminder': // Ngày khởi hành của tour
            return tourDepartureDateReminder(notiDetail);
        case 'TourFlightDepositDateReminder': // Vé máy bay - Ngày đặt cọc
            return tourFlightDepositDateReminder(notiDetail);
        case 'TourFlightNameEntryDateReminder': // Vé máy bay - Ngày vào tên
            return tourFlightNameEntryDateReminder(notiDetail);
        case 'TourFlightIssuanceDateReminder': // Vé máy bay - Ngày xuất vé
            return tourFlightIssuanceDateReminder(notiDetail);
        case 'SaleOrderPrepaidDateReminder': // SO - Ngày đến hạn thanh toán
            return saleOrderPrepaidDateReminder(notiDetail);
        case 'TourVisaSubmissionDateReminder': // Visa - Hạn thu hồ sơ
            return tourVisaSubmissionDateReminder(notiDetail);
        case 'TourVisaSubmissionToConsulateDateReminder': // Visa - Ngày nộp cho lãnh sự
            return tourVisaSubmissionToConsulateDateReminder(notiDetail);
        case 'TourVisaResultReturnDateReminder': // Visa - Ngày dự kiến kết quả
            return tourVisaResultReturnDateReminder(notiDetail);
        case 'TourHotelDepositDateReminder': // Lưu trú - Ngày thanh toán
            return tourHotelDepositDateReminder(notiDetail);
        case 'LandTourDepositDateReminder': // Land tour - Ngày thanh toán
            return landTourDepositDateReminder(notiDetail);
    }
};

export const renderNotiDetail = (item: DataSignal, notiDetail: DataSignal['data']) => {
    let contentString;
    const titleNoti = item.title;
    if (arrTitleNotiTourSchedule.includes(titleNoti)) {
        contentString = contentNotiForTourSchedule(notiDetail, titleNoti);
    }
    if (arrTitleNotiSaleOrder.includes(titleNoti)) {
        contentString = contentNotiForSaleOrder(notiDetail, titleNoti);
    }
    if (arrTitleReceivableVoucher.includes(titleNoti)) {
        contentString = contentNotiForReceivableVoucher(notiDetail, titleNoti);
    }
    if (arrTitleRefundVoucher.includes(titleNoti)) {
        contentString = contentNotiForRefundVoucher(notiDetail, titleNoti);
    }
    if (arrTitleQuote.includes(titleNoti)) {
        contentString = contentNotiForQuote(notiDetail, titleNoti);
    }
    if (arrTitleSetting.includes(titleNoti)) {
        contentString = contentNotiForSetting(notiDetail, titleNoti);
    }
    if (arrTitleSyncError.includes(titleNoti)) {
        contentString = ContentSyncErrorDataTourNature(notiDetail);
    }
    return contentString;
};
