import { PermissionType, TourType } from '@src/types/TypeEnum';

import { MyPermissions } from '@utils/Permissions/index.ts';

const getPermissionGit = (permissionList: PermissionType[]) => {
    const finalPermissionList: string[] = [];

    permissionList.forEach(permission => {
        switch (permission) {
            case PermissionType.Approve:
                finalPermissionList.push(MyPermissions.TourGitApprove);
                break;
            case PermissionType.Create:
                finalPermissionList.push(MyPermissions.TourGitCreate);
                break;
            case PermissionType.View:
                finalPermissionList.push(MyPermissions.TourGitView);
                break;
            case PermissionType.Delete:
                finalPermissionList.push(MyPermissions.TourGitDelete);
                break;
            case PermissionType.Update:
                finalPermissionList.push(MyPermissions.TourGitUpdate);
                break;
        }
    });

    return finalPermissionList;
};

const getPermissionFit = (permissionList: PermissionType[]) => {
    const finalPermissionList: string[] = [];

    permissionList.forEach(permission => {
        switch (permission) {
            case PermissionType.View:
                finalPermissionList.push(MyPermissions.TourFitView);
                break;
            case PermissionType.AgentView:
                finalPermissionList.push(MyPermissions.AgencyTourFitView);
                break;
            case PermissionType.ViewHistory:
                finalPermissionList.push(MyPermissions.TourFitViewHistory);
                break;
            case PermissionType.Create:
                finalPermissionList.push(MyPermissions.TourFitCreate);
                break;
            case PermissionType.Update:
                finalPermissionList.push(MyPermissions.TourFitUpdate);
                break;
            case PermissionType.Delete:
                finalPermissionList.push(MyPermissions.TourFitDelete);
                break;
            case PermissionType.Approve:
                finalPermissionList.push(MyPermissions.TourFitApprove);
                break;
            case PermissionType.Cancel:
                finalPermissionList.push(MyPermissions.TourFitCancel);
                break;
        }
    });

    return finalPermissionList;
};

export const getPermission = (type: TourType, permissionList: PermissionType[]) => {
    if (type === TourType.FIT) {
        return getPermissionFit(permissionList);
    } else if (type === TourType.GIT) {
        return getPermissionGit(permissionList);
    }
    return [];
};
