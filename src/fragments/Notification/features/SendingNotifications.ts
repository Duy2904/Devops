import {
    QuoteApprovedString,
    QuoteCancelledString,
    QuoteConfirmationString,
    QuoteGitConfirmationString,
    QuoteRejectedString,
} from '../content/ContentQuote';
import { voucherApprovalString, voucherSendForConfirmationString } from '../content/ContentReceivableVoucher';
import {
    refundvoucherConfirmationString,
    refundVoucherSendForConfirmationString,
    voucherApprovedString,
    voucherRejectedString,
    voucherSendForApproveString,
} from '../content/ContentRefundVoucher';
import {
    confirmedSOString,
    guaranteeSOString,
    paymentLessThanDepositSOString,
    refundSOString,
    waitConfirmOverloadSOString,
} from '../content/ContentSaleOrder';
import { bookingSOFailedString, bookingSOInProgressString, bookingSOSuccessString } from '../content/ContentSaleOrderBookingThienNhien';
import { changeTourSOString } from '../content/ContentSaleOrderChangeTour';
import {
    landTourDepositDateReminderString,
    saleOrderPrepaidDateReminderString,
    tourDepartureDateReminderString,
    tourFlightDepositDateReminderString,
    tourFlightIssuanceDateReminderString,
    tourFlightNameEntryDateReminderString,
    tourHotelDepositDateReminderString,
    tourVisaResultReturnDateReminderString,
    tourVisaSubmissionDateReminderString,
    tourVisaSubmissionToConsulateDateReminderString,
} from '../content/ContentSettingScheduled';
import { ContentSyncErrorDataTourNature } from '../content/ContentSyncError';
import {
    anotherContentTourString,
    cancelTourScheduleString,
    updateTourCodeInWaitingForApprovalString,
    waitConfirmContentTourString,
} from '../content/ContentTour';
import {
    arrTitleNotiSaleOrder,
    arrTitleNotiTourSchedule,
    arrTitleReceivableVoucher,
    arrTitleRefundVoucher,
    arrTitleSetting,
    arrTitleSyncError,
} from './ArrayTitle';
import { DataSignal } from './NotificationFeature';

const arrQuote = ['QuoteConfirmation', 'QuoteApproved', 'QuoteRejected'];

const sendingNotiForTourSchedule = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Tour
        case 'SendForApproval': // tour send for approval
        case 'SendForApprovalTimeout': // send for approval timeout
            return waitConfirmContentTourString(fetchRes.data);
        case 'TourApproval': // approved or rejected
            return anotherContentTourString(fetchRes.data);

        case 'UpdateTourCodeInWaitingForApproval': // change tour code in waiting for approval
            return updateTourCodeInWaitingForApprovalString(fetchRes.data);

        case 'CancelTourSchedule': // Cancel Tour Schedule
            return cancelTourScheduleString(fetchRes.data);
    }
};

const sendingNotiForSaleOrder = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Sale Order
        case 'SaleOrderOverload': // overload status
            return waitConfirmOverloadSOString(fetchRes.data);

        case 'SaleOrderGuarantee': // guarantee SO - send for approval
            return guaranteeSOString(fetchRes.data);

        case 'SaleOrderConfirming': // paid < deposit SO - send for approval
        case 'SaleOrderPaymentLessThanDeposit':
            return paymentLessThanDepositSOString(fetchRes.data);

        case 'SaleOrderOverloadApproval': // approved or rejected overload SO
            return confirmedSOString(fetchRes.data);

        case 'SaleOrderGuaranteeApproval': // approved or rejected guarantee SO
            return confirmedSOString(fetchRes.data);

        case 'SaleOrderConfirmingApproval': // approved or rejected confirming SO
            return confirmedSOString(fetchRes.data);

        case 'SaleOrderRefund': // SO - refund
            return refundSOString(fetchRes.data);

        case 'SaleOrderTransfer': // SO - change tour
            return changeTourSOString(fetchRes.data);
        
        case 'SaleOrderBookingThienNhienInProgress':
            return bookingSOInProgressString(fetchRes.data);
        
        case 'SaleOrderBookingThienNhienFailed':
            return bookingSOFailedString(fetchRes.data);
        
        case 'SaleOrderBookingThienNhienSuccess':
            return bookingSOSuccessString(fetchRes.data);
    }
};

const sendingNotiForReceivableVoucher = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Receivable Voucher
        case 'VoucherSendForConfirmation': // voucher send for confirmation
            return voucherSendForConfirmationString(fetchRes.data);

        case 'VoucherConfirmation': // approved
            return voucherApprovalString(fetchRes.data);
    }
};

const sendingNotiForRefundVoucher = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Refund Voucher
        case 'RefundVoucherSendForApproval': // voucher send for approval
            return voucherSendForApproveString(fetchRes.data);

        case 'RefundVoucherSendForConfirmation': // refund voucher send for confirmation to KT
            return refundVoucherSendForConfirmationString(fetchRes.data);

        case 'RefundVoucherConfirmation': // KT approved
            return refundvoucherConfirmationString(fetchRes.data);

        case 'RefundVoucherApproved': // manager approved
            return voucherApprovedString(fetchRes.data);

        case 'RefundVoucherRejected': // manager rejected
            return voucherRejectedString(fetchRes.data);
    }
};

const sendingNotiForQuote = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Quote
        case 'QuoteConfirmation': // quote send request for approval
            return QuoteConfirmationString(fetchRes.data);

        case 'QuoteApproved': // quote approved
            return QuoteApprovedString(fetchRes.data);

        case 'QuoteRejected': // quote rejected
            return QuoteRejectedString(fetchRes.data);

        case 'QuoteCancelled': // quote cancelled
            return QuoteCancelledString(fetchRes.data);

        case 'QuoteGitConfirmation': // quote send request for approval
            return QuoteGitConfirmationString(fetchRes.data);
    }
};

const sendingNotiForSettingScheduled = (fetchRes: DataSignal, fetchResTitle: string) => {
    switch (fetchResTitle) {
        // Setting scheduled
        case 'TourDepartureDateReminder': // Ngày khởi hành của tour
            return tourDepartureDateReminderString(fetchRes.data);

        case 'TourFlightDepositDateReminder': // Vé máy bay - Ngày đặt cọc
            return tourFlightDepositDateReminderString(fetchRes.data);

        case 'TourFlightNameEntryDateReminder': // Vé máy bay - Ngày vào tên
            return tourFlightNameEntryDateReminderString(fetchRes.data);

        case 'TourFlightIssuanceDateReminder': // Vé máy bay - Ngày xuất vé
            return tourFlightIssuanceDateReminderString(fetchRes.data);

        case 'SaleOrderPrepaidDateReminder': // SO - Ngày đến hạn thanh toán
            return saleOrderPrepaidDateReminderString(fetchRes.data);

        case 'TourVisaSubmissionDateReminder': // Visa - Hạn thu hồ sơ
            return tourVisaSubmissionDateReminderString(fetchRes.data);

        case 'TourVisaSubmissionToConsulateDateReminder': // Visa - Ngày nộp cho lãnh sự
            return tourVisaSubmissionToConsulateDateReminderString(fetchRes.data);

        case 'TourVisaResultReturnDateReminder': // Visa - Ngày dự kiến kết quả
            return tourVisaResultReturnDateReminderString(fetchRes.data);

        case 'TourHotelDepositDateReminder': // Lưu trú - Ngày thanh toán
            return tourHotelDepositDateReminderString(fetchRes.data);

        case 'LandTourDepositDateReminder': // Land tour - Ngày thanh toán
            return landTourDepositDateReminderString(fetchRes.data);
    }
};

const sendingNotiForSyncErrorData = (fetchRes: DataSignal) => {
    return ContentSyncErrorDataTourNature(fetchRes.data);
};

const returnDataSending = (fetchRes: DataSignal) => {
    let contentString;
    const titleNoti = fetchRes.title;
    if (arrTitleNotiTourSchedule.includes(titleNoti)) {
        contentString = sendingNotiForTourSchedule(fetchRes, titleNoti);
    }
    if (arrTitleNotiSaleOrder.includes(titleNoti)) {
        contentString = sendingNotiForSaleOrder(fetchRes, titleNoti);
    }
    if (arrTitleReceivableVoucher.includes(titleNoti)) {
        contentString = sendingNotiForReceivableVoucher(fetchRes, titleNoti);
    }
    if (arrTitleRefundVoucher.includes(titleNoti)) {
        contentString = sendingNotiForRefundVoucher(fetchRes, titleNoti);
    }
    if (arrQuote.includes(titleNoti)) {
        contentString = sendingNotiForQuote(fetchRes, titleNoti);
    }
    if (arrTitleSetting.includes(titleNoti)) {
        contentString = sendingNotiForSettingScheduled(fetchRes, titleNoti);
    }
    if (arrTitleSyncError.includes(titleNoti)) {
        contentString = sendingNotiForSyncErrorData(fetchRes);
    }

    return contentString;
};

export const sendingNotifications = (fetchRes: DataSignal) => {
    const contentString = returnDataSending(fetchRes) as string;
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification(contentString);
        }
    });
};
