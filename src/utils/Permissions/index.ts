import { IdentityPermissions } from './IdentityPermissions';
import { TourPermissions } from './TourPermissions';

interface Permission {
    [key: string]: string;
}
const removeDuplicateKeys = (obj: Permission) => {
    const result: Permission = {};
    for (const key in obj) {
        if (!result[key]) {
            result[key] = obj[key];
        }
    }
    return result;
};

export const MyPermissions = removeDuplicateKeys({
    ...TourPermissions,
    ...IdentityPermissions,
});
