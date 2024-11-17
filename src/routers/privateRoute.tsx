import { AccountsReceivableAgencyReportPage } from '@pages/private/Report/AccountsReceivableAgency/index.tsx';
import { AccountsReceivableReportPage } from '@pages/private/Report/AccountsReceivable/index.tsx';
import { AgentDetailPage } from '@pages/private/Management/AgentDetail/index.tsx';
import { AgentFormPage } from '@pages/private/Management/Agent/AgentForm.tsx';
import { AgentListPage } from '@pages/private/Management/Agent/index.tsx';
import { BranchFormPage } from '@pages/private/Management/Branch/BranchForm.tsx';
import { BranchListPage } from '@pages/private/Management/Branch/index.tsx';
import { DashboardPage } from '@pages/private/Dashboard/index.tsx';
import { DefaultApprovePage } from '@pages/private/Setting/DefaultApprove/index.tsx';
import { DepartmentListPage } from '@pages/private/Management/Department/index.tsx';
import { DocumentReceiptForm } from '@pages/private/Visa/DocumentReceipt/Form.tsx';
import { ErrorPage } from '@pages/private/ErrorPage.tsx';
import { FitToursPage } from '@pages/private/new/TourFit/index.tsx';
import { GuidelinePage } from '@pages/private/Guideline/index.tsx';
import { IndexAutoIncrementCode } from '@pages/private/AutoIncrementCode/index.tsx';
import { IndexDocumentReceipt } from '@pages/private/Visa/DocumentReceipt/index.tsx';
import { IndexPage } from '@pages/private/index.tsx';
import { IndexPromoteByGroup } from '@pages/private/PromotionProgram/Group/index.tsx';
import { IndexPromoteBySeat } from '@pages/private/PromotionProgram/Seat/index.tsx';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PromoteGroupForm } from '@pages/private/PromotionProgram/Group/GroupForm.tsx';
import { PromoteSeatForm } from '@pages/private/PromotionProgram/Seat/SeatForm.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import { QuoteDetailPage } from '@pages/private/QuoteFit/QuoteDetail.tsx';
import { QuoteGitDetailPage } from '@pages/private/QuoteGit/QuoteDetail.tsx';
import { QuoteGitListPage } from '@pages/private/QuoteGit/index.tsx';
import { QuoteListPage } from '@pages/private/QuoteFit/index.tsx';
import { RCViewDetailPage } from '@pages/private/new/ReceivableVoucher/ViewDetail.tsx';
import { ReceivableVoucherPage } from '@pages/private/new/ReceivableVoucher/index.tsx';
import { RefundVoucherPage } from '@pages/private/new/RefundVoucher/index.tsx';
import { RevenueTourFit } from '@pages/private/Report/RevenueTourFit/index.tsx';
import { RevenueTourFitCollab } from '@pages/private/Report/RevenueTourFitCollab/index.tsx';
import { RoleAgentFormPage } from '@pages/private/Management/RoleAgent/RoleForm.tsx';
import { RoleAgentListPage } from '@pages/private/Management/RoleAgent/index.tsx';
import { RoleCompanyFormPage } from '@pages/private/Management/RoleCompany/RoleForm.tsx';
import { RoleCompanyListPage } from '@pages/private/Management/RoleCompany/index.tsx';
import { RoomList } from '@fragments/Tour/RoomList/index.tsx';
import { Route } from 'react-router-dom';
import { SaleOrderForm } from '@pages/private/SaleOrders/SaleOrderForm.tsx';
import { SaleOrderFormDetailPage } from '@pages/private/new/SaleOrder/SaleOrderFormDetail.tsx';
import { SaleOrderViewDetailPage } from '@pages/private/new/SaleOrder/SaleOrderViewDetail.tsx';
import { SaleOrders } from '@pages/private/SaleOrders/Index.tsx';
import { SaleOrdersPage } from '@pages/private/new/SaleOrder/index.tsx';
import { ScheduledNotificationPage } from '@pages/private/Setting/ScheduledNotification/index.tsx';
import { TourFitDepartureScheduleDetailPage } from '@pages/private/new/TourFitDepartureSchedule/Detail.tsx';
import { TourFitDepartureSchedulePage } from '@pages/private/new/TourFitDepartureSchedule/index.tsx';
import { TourFitForm } from '@pages/private/TourFit/Form.tsx';
import { TourGitForm } from '@pages/private/TourGit/Form.tsx';
import { Tours } from '@pages/private/TourFit/Index.tsx';
import { ToursGit } from '@pages/private/TourGit/Index.tsx';
import { UnAuthorizedPage } from '@pages/private/UnAuthorizedPage.tsx';
import { UserFormPage } from '@pages/private/Management/User/UserForm.tsx';
import { UserListPage } from '@pages/private/Management/User/index.tsx';
import { UserOwnerFormPage } from '@pages/private/Management/OwnerUser/UserOwnerForm.tsx';
import { UserOwnerListPage } from '@pages/private/Management/OwnerUser/index.tsx';
import { rootPaths } from './route.ts';
import { rootPathsNew } from './newRoute.ts';
import { RFViewDetailPage } from '@pages/private/new/RefundVoucher/ViewDetail.tsx';
import { ReceivableFormDetailPage } from '@pages/private/new/ReceivableVoucher/FormDetail.tsx';
import { RefundFormDetailPage } from '@pages/private/new/RefundVoucher/FormDetail.tsx';

export const PrivateRouter = (
    <Route element={<IndexPage />}>
        <Route index path={rootPaths.dashboard} element={<DashboardPage />} />

        {/* fit tours */}
        <Route
            path={rootPaths.fitTours}
            element={
                <ProtectedRoute permissions={[MyPermissions.TourFitView]}>
                    <Tours />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.fitTourForm}/:tourCode?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.TourFitView]}>
                    <TourFitForm />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.fitTourForm}/:tourCode?${rootPaths.roomList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.RoomListView]}>
                    <RoomList />
                </ProtectedRoute>
            }
        />

        {/* git tours */}
        <Route
            path={rootPaths.gitTours}
            element={
                <ProtectedRoute permissions={[MyPermissions.TourGitView]}>
                    <ToursGit />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.gitTourForm}/:tourCode?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.TourGitView]}>
                    <TourGitForm />
                </ProtectedRoute>
            }
        />

        <Route
            path={`${rootPaths.saleOrderForm}/:soId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                    <SaleOrderForm />
                </ProtectedRoute>
            }
        />
        <Route
            path={rootPaths.saleOrders}
            element={
                <ProtectedRoute permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                    <SaleOrders />
                </ProtectedRoute>
            }
        />

        {/* Recevivable Voucher */}
        <Route
            path={`${rootPathsNew.receivableFormDetail}/:recId?`}
            element={
                <ProtectedRoute
                    permissions={[
                        MyPermissions.ReceivableVoucherCreate,
                        MyPermissions.AgencyReceivableVoucherCreate,
                        MyPermissions.ReceivableVoucherUpdate,
                        MyPermissions.AgencyReceivableVoucherUpdate,
                    ]}
                >
                    <ReceivableFormDetailPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPathsNew.receivableViewDetail}/:recId?`}
            element={
                <ProtectedRoute
                    permissions={[MyPermissions.ReceivableVoucherView, MyPermissions.AgencyReceivableVoucherView]}
                >
                    <RCViewDetailPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPathsNew.receivableList}`}
            element={
                <ProtectedRoute
                    permissions={[MyPermissions.ReceivableVoucherView, MyPermissions.AgencyReceivableVoucherView]}
                >
                    <ReceivableVoucherPage />
                </ProtectedRoute>
            }
        />

        {/* Refund Voucher */}
        <Route
            path={`${rootPathsNew.refundFormDetail}/:refundId?`}
            element={
                <ProtectedRoute
                    permissions={[
                        MyPermissions.RefundVoucherCreate,
                        MyPermissions.AgencyRefundVoucherCreate,
                        MyPermissions.RefundVoucherUpdate,
                        MyPermissions.AgencyRefundVoucherUpdate,
                    ]}
                >
                    <RefundFormDetailPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPathsNew.refundViewDetail}/:refundId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.RefundVoucherView, MyPermissions.AgencyRefundVoucherView]}>
                    <RFViewDetailPage />
                </ProtectedRoute>
            }
        />

        <Route
            path={`${rootPathsNew.refundList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.RefundVoucherView, MyPermissions.AgencyRefundVoucherView]}>
                    <RefundVoucherPage />
                </ProtectedRoute>
            }
        />

        {/* Report Revenue */}
        <Route
            path={`${rootPaths.revenueTourFit}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.RevenueReportView]}>
                    <RevenueTourFit />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.revenueTourFitCollab}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.RevenueReportFitSendCustomerView]}>
                    <RevenueTourFitCollab />
                </ProtectedRoute>
            }
        />

        {/* Promotion */}
        <Route
            path={rootPaths.promoteBySeat}
            element={
                <ProtectedRoute permissions={[MyPermissions.DiscountView]}>
                    <IndexPromoteBySeat />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.promoteBySeatForm}/:discountId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.DiscountView]}>
                    <PromoteSeatForm />
                </ProtectedRoute>
            }
        />
        <Route
            path={rootPaths.promoteByGroup}
            element={
                <ProtectedRoute permissions={[MyPermissions.DiscountView]}>
                    <IndexPromoteByGroup />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.promoteByGroupForm}/:discountId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.DiscountView]}>
                    <PromoteGroupForm />
                </ProtectedRoute>
            }
        />

        {/* Visa */}
        <Route
            path={rootPaths.documentReceipt}
            element={
                <ProtectedRoute permissions={[MyPermissions.TourVisaView]}>
                    <IndexDocumentReceipt />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.documentReceiptForm}/:documentReceiptId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.TourVisaView]}>
                    <DocumentReceiptForm />
                </ProtectedRoute>
            }
        />

        {/* Quotation Estimate */}
        <Route
            path={`${rootPaths.quoteFitList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.QuoteView]}>
                    <QuoteListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.quoteFitForm}/:quoteId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.QuoteView]}>
                    <QuoteDetailPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.quoteGitList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.QuoteGitView]}>
                    <QuoteGitListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.quoteGitForm}/:quoteId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.QuoteGitView]}>
                    <QuoteGitDetailPage />
                </ProtectedRoute>
            }
        />

        {/* Management */}
        <Route
            path={`${rootPaths.agentList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.AgentView]}>
                    <AgentListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.agentForm}/:agentId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.AgentView]}>
                    <AgentFormPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.branchList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.BranchView]}>
                    <BranchListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.branchForm}/:branchId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.BranchView]}>
                    <BranchFormPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.departmentList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.DepartmentView]}>
                    <DepartmentListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.roleCompany}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.OwnerRoleView]}>
                    <RoleCompanyListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.roleCompanyForm}/:roleId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.OwnerRoleView]}>
                    <RoleCompanyFormPage />
                </ProtectedRoute>
            }
        />

        <Route
            path={`${rootPaths.roleAgent}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.AgentRoleView]}>
                    <RoleAgentListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.roleAgentForm}/:roleId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.AgentRoleView]}>
                    <RoleAgentFormPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.userList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.AgentAccountView]}>
                    <UserListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.userForm}/:userId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.AgentAccountView]}>
                    <UserFormPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.userOwnerList}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.OwnerAccountView]}>
                    <UserOwnerListPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.userOwnerForm}/:userId?`}
            element={
                <ProtectedRoute permissions={[MyPermissions.OwnerAccountView]}>
                    <UserOwnerFormPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPaths.agentDetail}`}
            element={
                <ProtectedRoute permissions={[MyPermissions.OwnerGroupView]}>
                    <AgentDetailPage />
                </ProtectedRoute>
            }
        />

        {/* Debt Report */}
        <Route
            path={rootPaths.accountsReceivable}
            element={
                <ProtectedRoute permissions={[MyPermissions.CustomerDebtReportView]}>
                    <AccountsReceivableReportPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={rootPaths.accountsReceivableAgency}
            element={
                <ProtectedRoute permissions={[MyPermissions.AgentDebtReportView]}>
                    <AccountsReceivableAgencyReportPage />
                </ProtectedRoute>
            }
        />

        {/* Auto increment code */}
        <Route path={rootPaths.incrementCode} element={<IndexAutoIncrementCode />} />

        {/* Setting - Default  */}
        <Route
            path={rootPaths.defaultSetting}
            element={
                <ProtectedRoute permissions={[MyPermissions.SystemSettingView]}>
                    <DefaultApprovePage />
                </ProtectedRoute>
            }
        />
        <Route
            path={rootPaths.settingScheduledNotification}
            element={
                <ProtectedRoute permissions={[MyPermissions.SystemSettingView]}>
                    <ScheduledNotificationPage />
                </ProtectedRoute>
            }
        />

        {/* GuideLine + Error Page */}
        <Route path={rootPaths.guideline} element={<GuidelinePage />} />
        <Route path={rootPaths.privateUnauthorized} element={<UnAuthorizedPage />} />
        <Route path={rootPaths.privatePageNotFound} element={<ErrorPage />} />

        {/* New */}

        {/* Sale Order */}
        <Route
            path={rootPathsNew.saleOrders}
            element={
                <ProtectedRoute permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                    <SaleOrdersPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPathsNew.saleOrderViewDetail}/:soId`}
            element={
                <ProtectedRoute permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                    <SaleOrderViewDetailPage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPathsNew.saleOrderFormDetail}/:soId?`}
            element={
                <ProtectedRoute
                    permissions={[
                        MyPermissions.SaleOrderCreate,
                        MyPermissions.SaleOrderUpdate,
                        MyPermissions.AgencySaleOrderCreate,
                        MyPermissions.AgencySaleOrderUpdate,
                    ]}
                >
                    <SaleOrderFormDetailPage />
                </ProtectedRoute>
            }
        />

        {/* Tour */}

        {/* Tour FIT */}
        <Route
            path={rootPathsNew.tourFit}
            element={
                <ProtectedRoute permissions={[MyPermissions.TourFitView]}>
                    <FitToursPage />
                </ProtectedRoute>
            }
        />

        <Route
            path={rootPathsNew.tourFitDepartureSchedule}
            element={
                <ProtectedRoute permissions={[MyPermissions.DepartureScheduleView]}>
                    <TourFitDepartureSchedulePage />
                </ProtectedRoute>
            }
        />
        <Route
            path={`${rootPathsNew.tourFitDepartureSchedule}/:tourCode?`}
            element={<TourFitDepartureScheduleDetailPage />}
        />
    </Route>
);
