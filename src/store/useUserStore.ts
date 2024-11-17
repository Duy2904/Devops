/* eslint-disable no-unused-vars */
import { ProfileDto } from "sdk/tmc";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore {
  user: ProfileDto;
  setUser: (_user: ProfileDto) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      user: {},
      setUser: (user) => {
        set(() => ({ user }));
      },
    }),
    {
      name: "user-auth",
    },
  ),
);
