// the path name must start with /
export const rootPaths = {
    // auth
    login: '/login',
    logout: '/logout',
    privateUnauthorized: '/403',
    privatePageNotFound: '/404',
    deActived: '/account-disabled',

    // tour FIT
    dashboard: '/',
    fitTours: '/fit/tours-old',
    fitTourForm: '/fit/tour',
    saleOrders: '/fit/saleOrders',
    saleOrderForm: '/fit/saleOrder',

    // tour GIT
    gitTours: '/git/tours',
    gitTourForm: '/git/tour',

    // setting
    defaultSetting: '/setting/default-approve',
    settingScheduledNotification: '/setting/scheduled-notification',

    // promotion
    promoteBySeat: '/seat-promote',
    promoteBySeatForm: '/seat-form-promote',
    promoteByGroup: '/group-promote',
    promoteByGroupForm: '/group-form-promote',

    // Quote
    quoteFitList: '/fit/quotes',
    quoteFitForm: '/fit/quote',
    quoteGitList: '/git/quotes',
    quoteGitForm: '/git/quote',

    // Management
    agentList: '/management/agents',
    agentForm: '/management/agent',
    branchList: '/management/branchs',
    branchForm: '/management/branch',
    departmentList: '/management/departments',
    roleCompany: '/management/roles',
    roleCompanyForm: '/management/role',
    roleAgent: '/management/roles-agent',
    roleAgentForm: '/management/role-agent',
    agentDetail: '/management/agent-detail',
    userList: '/management/users',
    userForm: '/management/user',
    userOwnerList: '/management/owner-users',
    userOwnerForm: '/management/owner-user',

    // Single Route
    roomList: '/room-list',
    tourSchedules: '/tour-schedules',
    receivableVoucher: '/receivable-voucher',
    receivableVoucherForm: '/receivable-voucher-form',
    refundVoucher: '/refund-voucher',
    refundVoucherForm: '/refund-voucher-form',
    incrementCode: '/auto-increment-code',
    documentReceipt: '/document-receipt-visa',
    documentReceiptForm: '/document-receipt-form-visa',

    // report
    revenueTourFit: '/revenue-tour-fit',
    revenueTourFitCollab: '/revenue-tour-fit-collab',

    // debt
    accountsReceivable: '/report/accounts-receivable',
    accountsReceivableAgency: '/report/accounts-receivable-agency',

    // guideline
    guideline: '/guideline',
};
