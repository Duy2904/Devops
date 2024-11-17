import { faBell, faCircleCheck, faHandshake, faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import {
    faBuilding,
    faCalculator,
    faCalendar,
    faCircleInfo,
    faCodeBranch,
    faFileInvoice,
    faFileInvoiceDollar,
    faList,
    faPeopleRoof,
    faPercent,
    faRankingStar,
    faShieldHalved,
    faSquarePollVertical,
    faTag,
} from '@fortawesome/free-solid-svg-icons';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { rootPaths } from '@src/routers/route';
import { rootPathsNew } from '@src/routers/newRoute';

export interface ItemSidebar {
    title: string;
    titleCollapse?: string;
    key?: string;
    url?: string;
    permissionsAccess?: string[];
    icon?: IconProp;
    child?: ItemSidebar[];
}

export const listMenu: ItemSidebar[] = [
    {
        title: 'TOUR FIT',
        titleCollapse: 'TOUR FIT',
        key: 'tourFitHeading',
        permissionsAccess: [
            MyPermissions.TourFitView,
            MyPermissions.AgencyTourFitView,
            MyPermissions.DepartureScheduleView,
            MyPermissions.SaleOrderView,
            MyPermissions.AgencySaleOrderView,
            MyPermissions.QuoteView,
        ],
        child: [
            {
                title: 'Lịch khởi hành',
                key: 'fitToursDepartureSchedule',
                url: rootPathsNew.tourFitDepartureSchedule,
                permissionsAccess: [MyPermissions.DepartureScheduleView],
                icon: faCalendar,
            },
            {
                title: 'Danh sách tour',
                key: 'fitTours',
                url: rootPathsNew.tourFit,
                permissionsAccess: [MyPermissions.TourFitView, MyPermissions.AgencyTourFitView],
                icon: faList,
            },
            {
                title: 'Đơn hàng bán',
                key: 'saleOrders-new',
                url: rootPathsNew.saleOrders,
                permissionsAccess: [MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView],
                icon: faNoteSticky,
            },
            {
                title: 'Chiết tính giá',
                key: 'quoteFitList',
                url: rootPaths.quoteFitList,
                permissionsAccess: [MyPermissions.QuoteView],
                icon: faCalculator,
            },
        ],
    },
    {
        title: 'TOUR GIT',
        titleCollapse: 'TOUR GIT',
        key: 'tourGitHeading',
        permissionsAccess: [MyPermissions.TourGitView, MyPermissions.QuoteGitView],
        child: [
            {
                title: 'Danh sách tour',
                key: 'gitTours',
                url: rootPaths.gitTours,
                permissionsAccess: [MyPermissions.TourGitView],
                icon: faList,
            },
            {
                title: 'Chiết tính giá',
                key: 'quoteGitList',
                url: rootPaths.quoteGitList,
                permissionsAccess: [MyPermissions.QuoteGitView],
                icon: faCalculator,
            },
        ],
    },
    {
        title: 'Chứng từ thanh toán',
        titleCollapse: 'Chứng từ',
        key: 'voucherHeading',
        permissionsAccess: [
            MyPermissions.ReceivableVoucherView,
            MyPermissions.RefundVoucherView,
            MyPermissions.AgencyReceivableVoucherView,
            MyPermissions.AgencyRefundVoucherView,
        ],
        child: [
            {
                title: 'Phiếu thu',
                key: 'receivableVoucher',
                url: rootPathsNew.receivableList,
                permissionsAccess: [MyPermissions.ReceivableVoucherView, MyPermissions.AgencyReceivableVoucherView],
                icon: faFileInvoice,
            },
            {
                title: 'Phiếu hoàn',
                key: 'refundVoucher',
                url: rootPathsNew.refundList,
                permissionsAccess: [MyPermissions.RefundVoucherView, MyPermissions.AgencyRefundVoucherView],
                icon: faFileInvoice,
            },
        ],
    },
    {
        title: 'Chương trình khuyến mãi',
        titleCollapse: 'Khuyến mãi',
        key: 'promotionHeading',
        permissionsAccess: [MyPermissions.DiscountView],
        child: [
            {
                title: 'Early Bird, Last Minute',
                key: 'promoteBySeat',
                url: rootPaths.promoteBySeat,
                permissionsAccess: [MyPermissions.DiscountView],
                icon: faPercent,
            },
            {
                title: 'Khách đi theo nhóm',
                key: 'promoteByGroup',
                url: rootPaths.promoteByGroup,
                permissionsAccess: [MyPermissions.DiscountView],
                icon: faTag,
            },
        ],
    },
    {
        title: 'Visa (Thị thực nhập cảnh)',
        titleCollapse: 'Visa',
        key: 'visaHeading',
        permissionsAccess: [MyPermissions.TourVisaView],
        child: [
            {
                title: 'Biên nhận hồ sơ',
                key: 'documentReceipt',
                url: rootPaths.documentReceipt,
                permissionsAccess: [MyPermissions.TourVisaView],
                icon: faCcVisa,
            },
        ],
    },
    {
        title: 'Doanh thu',
        titleCollapse: 'Doanh thu',
        key: 'revenueHeading',
        permissionsAccess: [MyPermissions.RevenueReportView, MyPermissions.RevenueReportFitSendCustomerView],
        child: [
            {
                title: 'Tour FIT',
                key: 'revenueTourFit',
                url: rootPaths.revenueTourFit,
                permissionsAccess: [MyPermissions.RevenueReportView],
                icon: faSquarePollVertical,
            },
            {
                title: 'Tour FIT - Gửi khách',
                key: 'revenueTourFitCollab',
                url: rootPaths.revenueTourFitCollab,
                permissionsAccess: [MyPermissions.RevenueReportFitSendCustomerView],
                icon: faRankingStar,
            },
        ],
    },
    {
        title: 'Công nợ',
        titleCollapse: 'Công nợ',
        key: 'debtHeading',
        permissionsAccess: [MyPermissions.CustomerDebtReportView, MyPermissions.AgentDebtReportView],
        child: [
            {
                title: 'Công nợ khách hàng',
                key: 'accountsReceivable',
                url: rootPaths.accountsReceivable,
                permissionsAccess: [MyPermissions.CustomerDebtReportView],
                icon: faFileInvoiceDollar,
            },
            {
                title: 'Công nợ đại lý',
                key: 'accountsReceivableAgency',
                url: rootPaths.accountsReceivableAgency,
                permissionsAccess: [MyPermissions.AgentDebtReportView],
                icon: faFileInvoiceDollar,
            },
        ],
    },
    {
        title: 'Quản lý chung',
        titleCollapse: 'Quản lý',
        key: 'ownerManageHeading',
        permissionsAccess: [MyPermissions.OwnerGroupView, MyPermissions.OwnerRoleView, MyPermissions.OwnerAccountView],
        child: [
            {
                title: 'Thông tin chung',
                key: 'agentDetail',
                url: rootPaths.agentDetail,
                permissionsAccess: [MyPermissions.OwnerGroupView],
                icon: faCircleInfo,
            },
            {
                title: 'Quyền hạn',
                key: 'roleCompany',
                url: rootPaths.roleCompany,
                permissionsAccess: [MyPermissions.OwnerRoleView],
                icon: faShieldHalved,
            },
            {
                title: 'Tài khoản',
                key: 'account',
                url: rootPaths.userOwnerList,
                permissionsAccess: [MyPermissions.OwnerAccountView],
                icon: faPeopleRoof,
            },
        ],
    },
    {
        title: 'Quản lý hệ thống',
        titleCollapse: 'Hệ thống',
        key: 'systemManageHeading',
        permissionsAccess: [
            MyPermissions.BranchView,
            MyPermissions.DepartmentView,
            MyPermissions.AgentView,
            MyPermissions.AgentRoleView,
            MyPermissions.AgentAccountView,
        ],
        child: [
            {
                title: 'Chi nhánh',
                key: 'branchList',
                url: rootPaths.branchList,
                permissionsAccess: [MyPermissions.BranchView],
                icon: faCodeBranch,
            },
            {
                title: 'Bộ phận',
                key: 'departmentList',
                url: rootPaths.departmentList,
                permissionsAccess: [MyPermissions.DepartmentView],
                icon: faBuilding,
            },
            {
                title: 'Đại lý',
                key: 'agentList',
                url: rootPaths.agentList,
                permissionsAccess: [MyPermissions.AgentView],
                icon: faHandshake,
            },
            {
                title: 'Quyền hạn đại lý',
                key: 'roleAgent',
                url: rootPaths.roleAgent,
                permissionsAccess: [MyPermissions.AgentRoleView],
                icon: faShieldHalved,
            },
            {
                title: 'Tài khoản đại lý',
                key: 'accountAgent',
                url: rootPaths.userList,
                permissionsAccess: [MyPermissions.AgentAccountView],
                icon: faPeopleRoof,
            },
        ],
    },
    {
        title: 'Thiết lập hệ thống',
        titleCollapse: 'Thiết lập',
        key: 'configHeading',
        permissionsAccess: [MyPermissions.ApprovalView, MyPermissions.NotificationSettingView],
        child: [
            {
                title: 'Quy trình duyệt',
                key: 'defaultSetting',
                url: rootPaths.defaultSetting,
                permissionsAccess: [MyPermissions.ApprovalView],
                icon: faCircleCheck,
            },
            {
                title: 'Thời gian thông báo',
                key: 'settingScheduledNotification',
                url: rootPaths.settingScheduledNotification,
                permissionsAccess: [MyPermissions.NotificationSettingView],
                icon: faBell,
            },
        ],
    },
];
