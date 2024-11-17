/* eslint-disable no-unused-vars */
export enum TourType {
    FIT = 'FIT',
    GIT = 'GIT',
}

export enum PermissionType {
    Approve = 'Approve',
    Cancel = 'Cancel',
    Create = 'Create',
    Delete = 'Delete',
    View = 'View',
    Update = 'Update',
    ViewHistory = 'ViewHistory',
    AgentView = 'AgentView',
}

export enum TourNatureType {
    SendGuest = '00', //Gửi khách
    League = '11', //Liên minh
    HNH = '22', //Hồng Ngọc Hà
}

export enum FunctionType {
    TourFit = 'TourFit',
    SaleOrder = 'SaleOrder',
    ReceivableVoucher = 'ReceivableVoucher',
}

export enum RoleType {
    Company = 'Company',
    Agent = 'Agent',
}

export enum PageName {
    Tour = 'Tour',
    SaleOrder = 'SaleOrder',
    Voucher = 'Voucher',
}

export enum ThrowErrorAPI {
    UnAuthorized = '403',
    PageNotFound = '404',
}
