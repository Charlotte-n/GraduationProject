import { SingleFoodListType } from '@/types/home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface DietStore {
    breakfastList: SingleFoodListType
    lunchList: SingleFoodListType
    dinnerList: SingleFoodListType
    fruitList: SingleFoodListType
    otherList: SingleFoodListType
    setFoodList: (list: SingleFoodListType, index: number) => void
}

const useDietStore = create<DietStore>()(
    persist(
        (set) => ({
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
        }),
        {
            name: 'diet',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)

export default useDietStore
