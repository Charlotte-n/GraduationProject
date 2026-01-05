import { SingleFoodListType } from '@/types/home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface DietStore {
    url: string
    breakfastList: SingleFoodListType
    lunchList: SingleFoodListType
    dinnerList: SingleFoodListType
    fruitList: SingleFoodListType
    otherList: SingleFoodListType
    setFoodList: (list: SingleFoodListType, index: number) => void
    setUrl: (url: string) => void
}

export const useDietStore = create<DietStore>()(
    persist(
        (set) => ({
            url: '',
            breakfastList: [] as SingleFoodListType,
            lunchList: [] as SingleFoodListType,
            dinnerList: [] as SingleFoodListType,
            fruitList: [] as SingleFoodListType,
            otherList: [] as SingleFoodListType,
            setFoodList: (list: SingleFoodListType, index: number) => {
                switch (index) {
                    case 1:
                        set({ breakfastList: list })
                        break
                    case 2:
                        set({ lunchList: list })
                        break
                    case 4:
                        set({ dinnerList: list })
                        break
                    case 5:
                        set({ fruitList: list })
                        break
                    case 10:
                        set({ otherList: list })
                        break
                }
            },
            setUrl: (url: string) => {
                set({ url })
            },
        }),
        {
            name: 'diet',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)
