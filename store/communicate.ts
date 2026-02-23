import { CommunicateContentData, CommunicateSingleContentData } from "@/apis/types"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface CommunicateStore {
    communicate: CommunicateContentData
    setCommunicate: (communicate: CommunicateContentData) => void
    updateOneCommunicate: (id: number, otherData: Partial<CommunicateSingleContentData>) => void
}
export const useCommunicateStore = create<CommunicateStore>()(
    persist(
        (set) => ({
            communicate: [],
            setCommunicate: (communicate: CommunicateContentData) => set({ communicate }),
            updateOneCommunicate: (id: number, otherData: Partial<CommunicateSingleContentData>) => set((state) => {
                return {
                    communicate: state.communicate.map((item) => {
                        return item.id === id ? { ...item, ...otherData } : item
                    })
                }
            }),
        }),
        {
            name: 'communicate',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)