import { GroupInfoType } from '@/apis/types'
import { create } from 'zustand'

interface GroupStoreType {
    rateTopThree: GroupInfoType[]
    setRateTopThree: (rateTopThree: GroupInfoType[]) => void
}

export const useGroupStore = create<GroupStoreType>((set) => ({
    rateTopThree: [],
    setRateTopThree: (rateTopThree) => set({ rateTopThree }),
}))
