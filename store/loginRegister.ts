import type { User } from '@/apis/types/mine'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface initial {
    userInfo: Partial<User>
    token: string
    profile: Partial<User>
    setUserInfo: (userInfo: Partial<User>) => void
    setToken: (token: string) => void
    setProfile: (profile: Partial<User>) => void
    reset: () => void
}

export const useLoginRegisterStore = create<initial>()(
    persist(
        (set) => ({
            userInfo: {},
            token: '',
            profile: {},
            setUserInfo: (userInfo: Partial<User>) => set({ userInfo }),
            setToken: (token: string) => set({ token }),
            setProfile: (profile: Partial<User>) => set({ profile }),
            reset: () => {
                set({ userInfo: {}, token: '', profile: {} })
            },
        }),
        {
            name: 'login-register',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
