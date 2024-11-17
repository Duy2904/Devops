import { create } from 'zustand';

interface IPermissionStore {
    permissions: string[];
    setPermissions: (permissions: string[]) => void;
}

export const useUserPermissionsStore = create<IPermissionStore>()(set=>({
    permissions:[],
    setPermissions:(permissions)=>set({permissions})
}))
