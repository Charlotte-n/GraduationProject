import type { ResponseDailyIntake } from '@/apis/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface initial {
    dailyIntake: ResponseDailyIntake
    dailyIntaked: ResponseDailyIntake
    setDailyIntake: (dailyIntake: ResponseDailyIntake) => void
    reset: () => void
}

export const useHomeStore = create<initial>()(
    persist(
        (set) => ({
            dailyIntake: {
                cellulose: 0,
                calories: 0,
                fat: 0,
                carbohydrate: 0,
                protein: 0,
            },
            dailyIntaked: {
                cellulose: 0,
                calories: 0,
                fat: 0,
                carbohydrate: 0,
                protein: 0,
            },
            setDailyIntaked: (dailyIntaked: ResponseDailyIntake) =>
                set({ dailyIntaked }),
            setDailyIntake: (dailyIntake: ResponseDailyIntake) =>
                set({ dailyIntake }),
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
        }),
        { name: 'home', storage: createJSONStorage(() => AsyncStorage) },
    ),
)
