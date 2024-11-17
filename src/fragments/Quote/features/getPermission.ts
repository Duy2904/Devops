import { PermissionType, TourType } from '@src/types/TypeEnum';
import { MyPermissions } from '@utils/Permissions/index.ts';

const getPermissionQuoteGit = (permissionList: PermissionType[]) => {
    const finalPermissionList: string[] = [];

    permissionList.forEach(permission => {
        switch (permission) {
            case PermissionType.Approve:
                finalPermissionList.push(MyPermissions.QuoteGitApprove);
                break;
            case PermissionType.Create:
                finalPermissionList.push(MyPermissions.QuoteGitCreate);
                break;
            case PermissionType.View:
                finalPermissionList.push(MyPermissions.QuoteGitView);
                break;
            case PermissionType.Cancel:
                finalPermissionList.push(MyPermissions.QuoteGitCancel);
                break;
            case PermissionType.Delete:
                finalPermissionList.push(MyPermissions.QuoteGitDelete);
                break;
            case PermissionType.Update:
                finalPermissionList.push(MyPermissions.QuoteGitUpdate);
                break;
        }
    });

    return finalPermissionList;
};

const getPermissionQuoteFit = (permissionList: PermissionType[]) => {
    const finalPermissionList: string[] = [];

    permissionList.forEach(permission => {
        switch (permission) {
            case PermissionType.Approve:
                finalPermissionList.push(MyPermissions.QuoteApprove);
                break;
            case PermissionType.Create:
                finalPermissionList.push(MyPermissions.QuoteCreate);
                break;
            case PermissionType.View:
                finalPermissionList.push(MyPermissions.QuoteView);
                break;
            case PermissionType.Cancel:
                finalPermissionList.push(MyPermissions.QuoteCancel);
                break;
            case PermissionType.Delete:
                finalPermissionList.push(MyPermissions.QuoteDelete);
                break;
            case PermissionType.Update:
                finalPermissionList.push(MyPermissions.QuoteUpdate);
                break;
        }
    });

    return finalPermissionList;
};

export const getPermission = (type: TourType | undefined, permissionList: PermissionType[]) => {
    if (type === TourType.FIT) {
        return getPermissionQuoteFit(permissionList);
    } else if (type === TourType.GIT) {
        return getPermissionQuoteGit(permissionList);
    }
    return [];
};
