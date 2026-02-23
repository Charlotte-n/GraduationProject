import type { ResponseDailyIntake } from '@/apis/types'
import { IntakeItem } from '@/types/home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'



type IntakeFood = [IntakeItem[], IntakeItem[], IntakeItem[]]

    interface initial {
    dailyIntake: Partial<ResponseDailyIntake>
    dailyIntaked: Partial<ResponseDailyIntake>
    IntakeFoodList: IntakeFood
    total: number[]
    setDailyIntake: (dailyIntake: ResponseDailyIntake) => void
    setDailyIntaked: (dailyIntaked: ResponseDailyIntake) => void
    setIntakeFoodList: (IntakeFoodList: IntakeFood) => void
    setTotal: (total: number[]) => void
    reset: () => void
}

export const useHomeStore = create<initial>()(
    persist(
        (set) => ({
            dailyIntake: {},
            dailyIntaked: {},
            IntakeFoodList: [[], [], []],
            total: [],
            setDailyIntaked: (dailyIntaked: ResponseDailyIntake) =>
                set({ dailyIntaked }),
            setDailyIntake: (dailyIntake: ResponseDailyIntake) =>
                set({ dailyIntake }),
            setIntakeFoodList: (IntakeFoodList: IntakeFood) =>
                set({ IntakeFoodList }),
            setTotal: (total: number[]) =>
                set({ total }),
            reset: () =>
                set({
                    dailyIntake: {
                        cellulose: 0,
                        calories: 0,
                        fat: 0,
                        carbohydrate: 0,
                        protein: 0,
                    },
                    IntakeFoodList: [[], [], []],
                    dailyIntaked: {},
                    total: [],
                }),
        }),
        { name: 'home', storage: createJSONStorage(() => AsyncStorage) },
    ),
)
