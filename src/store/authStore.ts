import { MyApprovalPermissionDto } from '@sdk/tour-operations';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { persist } from 'zustand/middleware';

interface AuthState {
    token: string | null | undefined;
    permissions: string[];
    myApprovalPermission: MyApprovalPermissionDto[];
    setToken: (token: string | null) => void;
    decodeToken: () => void;
    setMyApprovalPermission: (myApprovalPermission: MyApprovalPermissionDto[]) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            token: null,
            permissions: [],
            myApprovalPermission: [],
            setToken: token => set({ token }),
            decodeToken: () =>
                set(state => {
                    if (state.token) {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const decoded: any = jwtDecode(state.token);
                            const permissions = (decoded.extension_permissions as string).split(';');
                            return { permissions: permissions || [] };
                        } catch (error) {
                            return { permissions: [] };
                        }
                    }
                    return { permissions: [] };
                }),
            setMyApprovalPermission: myApprovalPermission => set({ myApprovalPermission }),
        }),
        {
            name: 'permissions',
        },
    ),
);

export default useAuthStore;
