/* eslint-disable no-unused-vars */
export enum TourPermissions {
    AgencyQuoteView = 'Permissions.AgencyQuote.View',
    AgencyQuoteGitView = 'Permissions.AgencyQuoteGit.View',
    AgencyReceivableVoucherApprove = 'Permissions.AgencyReceivableVoucher.Approve',
    AgencyReceivableVoucherCreate = 'Permissions.AgencyReceivableVoucher.Create',
    AgencyReceivableVoucherDelete = 'Permissions.AgencyReceivableVoucher.Delete',
    AgencyReceivableVoucherUpdate = 'Permissions.AgencyReceivableVoucher.Update',
    AgencyReceivableVoucherView = 'Permissions.AgencyReceivableVoucher.View',
    AgencyRefundVoucherCreate = 'Permissions.AgencyRefundVoucher.Create',
    AgencyRefundVoucherDelete = 'Permissions.AgencyRefundVoucher.Delete',
    AgencyRefundVoucherUpdate = 'Permissions.AgencyRefundVoucher.Update',
    AgencyRefundVoucherView = 'Permissions.AgencyRefundVoucher.View',
    AgencySaleOrderCancel = 'Permissions.AgencySaleOrder.Cancel',
    AgencySaleOrderCreate = 'Permissions.AgencySaleOrder.Create',
    AgencySaleOrderDelete = 'Permissions.AgencySaleOrder.Delete',
    AgencySaleOrderUpdate = 'Permissions.AgencySaleOrder.Update',
    AgencySaleOrderView = 'Permissions.AgencySaleOrder.View',
    AgencyTourFitView = 'Permissions.AgencyTourFit.View',
    AgentAccountCreate = 'Permissions.AgentAccount.Create',
    AgentAccountDelete = 'Permissions.AgentAccount.Delete',
    AgentAccountUpdate = 'Permissions.AgentAccount.Update',
    AgentAccountView = 'Permissions.AgentAccount.View',
    AgentDebtReportView = 'Permissions.AgentDebtReport.View',
    AgentRoleCreate = 'Permissions.AgentRole.Create',
    AgentRoleDelete = 'Permissions.AgentRole.Delete',
    AgentRoleUpdate = 'Permissions.AgentRole.Update',
    AgentRoleView = 'Permissions.AgentRole.View',
    ApprovalUpdate = 'Permissions.Approval.Update',
    ApprovalView = 'Permissions.Approval.View',
    CustomerDebtReportView = 'Permissions.CustomerDebtReport.View',
    DepartmentCreate = 'Permissions.Department.Create',
    DepartmentDelete = 'Permissions.Department.Delete',
    DepartmentUpdate = 'Permissions.Department.Update',
    DepartmentView = 'Permissions.Department.View',
    DepartureScheduleView = 'Permissions.DepartureSchedule.View',
    DiscountCreate = 'Permissions.Discount.Create',
    DiscountDelete = 'Permissions.Discount.Delete',
    DiscountUpdate = 'Permissions.Discount.Update',
    DiscountView = 'Permissions.Discount.View',
    DiscountGroupCreate = 'Permissions.DiscountGroup.Create',
    DiscountGroupDelete = 'Permissions.DiscountGroup.Delete',
    DiscountGroupUpdate = 'Permissions.DiscountGroup.Update',
    DiscountGroupView = 'Permissions.DiscountGroup.View',
    DiscountGroupHistoryView = 'Permissions.DiscountGroupHistory.View',
    DiscountHistoryView = 'Permissions.DiscountHistory.View',
    HistoryTourFitView = 'Permissions.HistoryTourFit.View',
    MasterDataCreate = 'Permissions.MasterData.Create',
    MasterDataDelete = 'Permissions.MasterData.Delete',
    MasterDataUpdate = 'Permissions.MasterData.Update',
    MasterDataView = 'Permissions.MasterData.View',
    NotificationView = 'Permissions.Notification.View',
    NotificationSettingUpdate = 'Permissions.NotificationSetting.Update',
    NotificationSettingView = 'Permissions.NotificationSetting.View',
    OwnerAccountCreate = 'Permissions.OwnerAccount.Create',
    OwnerAccountDelete = 'Permissions.OwnerAccount.Delete',
    OwnerAccountUpdate = 'Permissions.OwnerAccount.Update',
    OwnerAccountView = 'Permissions.OwnerAccount.View',
    OwnerRoleCreate = 'Permissions.OwnerRole.Create',
    OwnerRoleDelete = 'Permissions.OwnerRole.Delete',
    OwnerRoleUpdate = 'Permissions.OwnerRole.Update',
    OwnerRoleView = 'Permissions.OwnerRole.View',
    QuoteApprove = 'Permissions.Quote.Approve',
    QuoteCancel = 'Permissions.Quote.Cancel',
    QuoteCreate = 'Permissions.Quote.Create',
    QuoteDelete = 'Permissions.Quote.Delete',
    QuoteUpdate = 'Permissions.Quote.Update',
    QuoteView = 'Permissions.Quote.View',
    QuoteGitApprove = 'Permissions.QuoteGit.Approve',
    QuoteGitCancel = 'Permissions.QuoteGit.Cancel',
    QuoteGitCreate = 'Permissions.QuoteGit.Create',
    QuoteGitDelete = 'Permissions.QuoteGit.Delete',
    QuoteGitUpdate = 'Permissions.QuoteGit.Update',
    QuoteGitView = 'Permissions.QuoteGit.View',
    ReceivableVoucherApprove = 'Permissions.ReceivableVoucher.Approve',
    ReceivableVoucherCreate = 'Permissions.ReceivableVoucher.Create',
    ReceivableVoucherDelete = 'Permissions.ReceivableVoucher.Delete',
    ReceivableVoucherUpdate = 'Permissions.ReceivableVoucher.Update',
    ReceivableVoucherView = 'Permissions.ReceivableVoucher.View',
    RefundVoucherApprove = 'Permissions.RefundVoucher.Approve',
    RefundVoucherCreate = 'Permissions.RefundVoucher.Create',
    RefundVoucherDelete = 'Permissions.RefundVoucher.Delete',
    RefundVoucherUpdate = 'Permissions.RefundVoucher.Update',
    RefundVoucherView = 'Permissions.RefundVoucher.View',
    RevenueReportView = 'Permissions.RevenueReport.View',
    RevenueReportFitSendCustomerView = 'Permissions.RevenueReportFitSendCustomer.View',
    RoomListUpdate = 'Permissions.RoomList.Update',
    RoomListView = 'Permissions.RoomList.View',
    SaleOrderApprove = 'Permissions.SaleOrder.Approve',
    SaleOrderCancel = 'Permissions.SaleOrder.Cancel',
    SaleOrderCreate = 'Permissions.SaleOrder.Create',
    SaleOrderDelete = 'Permissions.SaleOrder.Delete',
    SaleOrderUpdate = 'Permissions.SaleOrder.Update',
    SaleOrderView = 'Permissions.SaleOrder.View',
    SaleOrderCapacityView = 'Permissions.SaleOrderCapacity.View',
    SettingCreate = 'Permissions.Setting.Create',
    SettingDelete = 'Permissions.Setting.Delete',
    SettingUpdate = 'Permissions.Setting.Update',
    SettingView = 'Permissions.Setting.View',
    SystemSettingCreate = 'Permissions.SystemSetting.Create',
    SystemSettingDelete = 'Permissions.SystemSetting.Delete',
    SystemSettingUpdate = 'Permissions.SystemSetting.Update',
    SystemSettingView = 'Permissions.SystemSetting.View',
    TourCreate = 'Permissions.Tour.Create',
    TourDelete = 'Permissions.Tour.Delete',
    TourUpdate = 'Permissions.Tour.Update',
    TourView = 'Permissions.Tour.View',
    TourFitApprove = 'Permissions.TourFit.Approve',
    TourFitCancel = 'Permissions.TourFit.Cancel',
    TourFitCreate = 'Permissions.TourFit.Create',
    TourFitDelete = 'Permissions.TourFit.Delete',
    TourFitUpdate = 'Permissions.TourFit.Update',
    TourFitView = 'Permissions.TourFit.View',
    TourFitCapacityView = 'Permissions.TourFitCapacity.View',
    TourFitProviderView = 'Permissions.TourFitProvider.View',
    TourGitApprove = 'Permissions.TourGit.Approve',
    TourGitCreate = 'Permissions.TourGit.Create',
    TourGitDelete = 'Permissions.TourGit.Delete',
    TourGitUpdate = 'Permissions.TourGit.Update',
    TourGitView = 'Permissions.TourGit.View',
    TourInforCreate = 'Permissions.TourInfor.Create',
    TourInforDelete = 'Permissions.TourInfor.Delete',
    TourInforUpdate = 'Permissions.TourInfor.Update',
    TourInforView = 'Permissions.TourInfor.View',
    TourVisaCreate = 'Permissions.TourVisa.Create',
    TourVisaDelete = 'Permissions.TourVisa.Delete',
    TourVisaUpdate = 'Permissions.TourVisa.Update',
    TourVisaView = 'Permissions.TourVisa.View',
}