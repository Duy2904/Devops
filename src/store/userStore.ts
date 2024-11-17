import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
    accessToken: string;
    setAccessToken: (token: string) => void;
    removeAccessToken: () => void;
    refreshToken: string;
    setRefreshToken: (token: string) => void;
    removeRefreshToken: () => void;
    refreshTokenExpiryTime: Date;
    setRefreshTokenExpiryTime: (date: Date) => void;
    userId: string;
    setUserId: (id: string) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        set => ({
            accessToken: '',
            refreshToken: '',
            setAccessToken: (token: string) => {
                set(() => ({ accessToken: token }));
            },
            removeAccessToken: () => {
                set(() => ({ accessToken: '' }));
            },
            setRefreshToken: (token: string) => {
                set(() => ({ refreshToken: token }));
            },
            removeRefreshToken: () => {
                set(() => ({ refreshToken: '' }));
            },
            refreshTokenExpiryTime: new Date(),
            setRefreshTokenExpiryTime: (date: Date) => {
                set(() => ({ refreshTokenExpiryTime: date }));
            },
            userId: '',
            setUserId: (id: string) => {
                set(() => ({ userId: id }))
            }
        }),
        {
            name: 'user-auth',
        },
    ),
);
