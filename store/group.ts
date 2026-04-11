import { GroupInfoType } from '@/apis/types'
import { create } from 'zustand'

interface GroupStoreType {
    rateTopThree: GroupInfoType[]
    threeGroups: GroupInfoType[]
    opearateGroupNumber: number
    setRateTopThree: (rateTopThree: GroupInfoType[]) => void
    setThreeGroups: (threeGroups: GroupInfoType[]) => void
    setOperateGroupNumber: (operateGroupNumber: number) => void
}

export const useGroupStore = create<GroupStoreType>((set) => ({
    rateTopThree: [],
    threeGroups: [],
    opearateGroupNumber: 0,
    setRateTopThree: (rateTopThree) => set({ rateTopThree }),
    setThreeGroups: (threeGroups) => set({ threeGroups }),
    setOperateGroupNumber: (opearateGroupNumber) => set({ opearateGroupNumber  }),
    reset: () => set({ rateTopThree: [], threeGroups: [], opearateGroupNumber: 0 }),
}))
