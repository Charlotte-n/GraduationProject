import type { ResponseDailyIntake } from '@/apis/types'
import { create } from 'zustand'

interface initial {
    dailyIntake: ResponseDailyIntake
    setDailyIntake: (dailyIntake: ResponseDailyIntake) => void
    reset: () => void
}

export const useHomeStore = create<initial>()((set) => ({
    dailyIntake: {
        cellulose: 0,
        calories: 0,
        fat: 0,
        carbohydrate: 0,
        protein: 0,
    },
    setDailyIntake: (dailyIntake: ResponseDailyIntake) => set({ dailyIntake }),
    reset: () =>
        set({
            dailyIntake: {
                cellulose: 0,
                calories: 0,
                fat: 0,
                carbohydrate: 0,
                protein: 0,
            },
        }),
}))
