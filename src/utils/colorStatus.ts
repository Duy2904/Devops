import {
    ActiveStatus,
    OrderStatus,
    QuoteStatus,
    TourScheduleStatus,
    TourVisaLineStatus,
    TourVisaStatus,
    TravellerOrderStatus,
    VoucherStatus,
} from '@sdk/tour-operations';

const colorStatusTour = [
    { status: TourScheduleStatus.New, color: 'processing' },
    { status: TourScheduleStatus.SalesOpen, color: 'success' },
    { status: TourScheduleStatus.NoSeatsAvailable, color: 'default' },
    { status: TourScheduleStatus.SaleTimeExpired, color: 'error' },
    { status: TourScheduleStatus.Cancel, color: 'error' },
    { status: TourScheduleStatus.WaitingForApproval, color: 'purple' },
    { status: TourScheduleStatus.Approved, color: 'cyan' },
    { status: TourScheduleStatus.Rejected, color: 'volcano' },
];

const colorSaleOrder = [
    { status: OrderStatus.New, color: 'processing' },
    { status: OrderStatus.Confirming, color: 'warning' },
    { status: OrderStatus.Confirmed, color: 'success' },
    { status: OrderStatus.Deposited, color: 'orange' },
    { status: OrderStatus.Paid, color: 'success' },
    { status: OrderStatus.Canceled, color: 'error' },
    { status: OrderStatus.Overload, color: 'volcano' },
    { status: OrderStatus.Deposited, color: 'cyan' },
    { status: OrderStatus.WaitRefund, color: 'warning' },
    { status: OrderStatus.SendRefund, color: 'processing' },
    { status: OrderStatus.CompletedRefund, color: 'success' },
];

const colorSaleOrderTraveller = [
    { status: TravellerOrderStatus.Reserve, color: 'processing' },
    { status: TravellerOrderStatus.Waiting, color: 'orange' },
    { status: TravellerOrderStatus.Booked, color: 'success' },
    { status: TravellerOrderStatus.Canceled, color: 'error' },
];

const colorVoucher = [
    { status: VoucherStatus.Draft, color: 'processing' },
    { status: VoucherStatus.Received, color: 'processing' },
    { status: VoucherStatus.Refunded, color: 'cyan' },
    { status: VoucherStatus.WaitingForConfirmation, color: 'purple' },
    { status: VoucherStatus.WaitingForApproval, color: 'orange' },
    { status: VoucherStatus.Confirmed, color: 'success' },
    { status: VoucherStatus.Rejected, color: 'error' },
];

const colorDocumentVisa = [
    { status: TourVisaStatus.Receive, color: 'purple' },
    { status: TourVisaStatus.Handle, color: 'processing' },
    { status: TourVisaStatus.Submit, color: 'orange' },
    { status: TourVisaStatus.Returned, color: 'success' },
    { status: TourVisaStatus.Cancel, color: 'error' },
];

const visaStatus = [
    { status: TourVisaLineStatus.Pass, color: 'success' },
    { status: TourVisaLineStatus.Wait, color: 'warning' },
    { status: TourVisaLineStatus.Fail, color: 'error' },
];

const quoteStatus = [
    { status: QuoteStatus.Draft, color: 'processing' },
    {
        status: QuoteStatus.WaitConfirm,
        color: 'purple',
    },
    {
        status: QuoteStatus.Confirm,
        color: 'success',
    },
    {
        status: QuoteStatus.Deny,
        color: 'error',
    },
    {
        status: QuoteStatus.Cancel,
        color: 'orange',
    },
];

const branchStatus = [
    { status: 'Active', color: 'success' },
    { status: 'InActive', color: 'error' },
    { status: 'Pending', color: 'default' },
];

const agentStatus = [
    { status: 'true', color: 'success' },
    { status: 'false', color: 'error' },
    { status: 'Active', color: 'success' },
    { status: 'Expired', color: 'error' },
    { status: 'Pending', color: 'default' },
];

const departmentStatus = [
    { status: ActiveStatus.Pending, color: 'warning' },
    { status: ActiveStatus.InActive, color: 'default' },
    { status: ActiveStatus.Active, color: 'success' },
];

const roleStatus = [
    { status: 'Active', color: 'success' },
    { status: 'InActive', color: 'error' },
    { status: 'Pending', color: 'default' },
];

const accountStatus = [
    { status: 'Active', color: 'success' },
    { status: 'InActive', color: 'error' },
    { status: 'Pending', color: 'default' },
];

export const setColorStatusTour = (status: TourScheduleStatus | string) => {
    return colorStatusTour.find(item => item.status === status)?.color;
};

export const setSaleOrderColor = (status: OrderStatus | string) => {
    return colorSaleOrder.find(item => item.status === status)?.color;
};

export const setSaleOrderTravellerColor = (status: OrderStatus | string) => {
    return colorSaleOrderTraveller.find(item => item.status === status)?.color;
};

export const setVoucherColor = (status: VoucherStatus | string) => {
    return colorVoucher.find(item => item.status === status)?.color;
};

export const setDocumentVisaColor = (status: TourVisaStatus | string) => {
    return colorDocumentVisa.find(item => item.status === status)?.color;
};

export const setVisaStatusColor = (status: TourVisaLineStatus | string) => {
    return visaStatus.find(item => item.status === status)?.color;
};

export const setQuoteStatusColor = (status: QuoteStatus | string) => {
    return quoteStatus.find(item => item.status === status)?.color;
};

export const setBranchStatusColor = (status: string) => {
    return branchStatus.find(item => item.status === status)?.color;
};

export const setAgentStatusColor = (status: string) => {
    return agentStatus.find(item => item.status === status)?.color;
};

export const setDepartmentStatusColor = (status: ActiveStatus | string) => {
    return departmentStatus.find(item => item.status === status)?.color;
};

export const setRoleStatusColor = (status: string) => {
    return roleStatus.find(item => item.status === status)?.color;
};

export const setAccountStatusColor = (status: string) => {
    return accountStatus.find(item => item.status === status)?.color;
};
