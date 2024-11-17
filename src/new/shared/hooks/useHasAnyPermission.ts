import { ApproverType, MyApprovalPermissionDto } from '@sdk/tour-operations';

import { MyPermissions } from '../utils/Permissions';
import isEmpty from 'lodash/isEmpty';
import useAuthStore from '../stores/authStore';

const checkApprovalPermission = (type: ApproverType, myApprovalPermission: MyApprovalPermissionDto[]) => {
    return !isEmpty(myApprovalPermission.find(item => item.approverType === type && item.hasPermission));
};

const useHasAnyPermission = (requiredPermissions: string[]): boolean => {
    const { permissions, myApprovalPermission } = useAuthStore();
    let isHasPermission = requiredPermissions.some(permission => permissions.includes(permission));

    // check if user has approve permission, user should available in the list approval setting
    requiredPermissions.forEach(role => {
        switch (role) {
            case MyPermissions.SaleOrderApprove:
                isHasPermission = checkApprovalPermission(ApproverType.SaleOrder, myApprovalPermission);
                break;
            case MyPermissions.TourFitApprove:
                isHasPermission = checkApprovalPermission(ApproverType.TourFit, myApprovalPermission);
                break;
            case MyPermissions.TourGitApprove:
                isHasPermission = checkApprovalPermission(ApproverType.TourGit, myApprovalPermission);
                break;
            case MyPermissions.ReceivableVoucherApprove:
                isHasPermission = checkApprovalPermission(ApproverType.ReceivableVoucher, myApprovalPermission);
                break;
            case MyPermissions.QuoteApprove:
                isHasPermission = checkApprovalPermission(ApproverType.QuoteFit, myApprovalPermission);
                break;
            case MyPermissions.QuoteGitApprove:
                isHasPermission = checkApprovalPermission(ApproverType.QuoteGit, myApprovalPermission);
                break;
            case MyPermissions.RefundVoucherApprove:
                isHasPermission = checkApprovalPermission(ApproverType.RefundVoucher, myApprovalPermission);
                break;
        }
    });

    return isHasPermission;
};

export default useHasAnyPermission;
