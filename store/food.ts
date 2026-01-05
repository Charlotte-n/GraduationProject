import { FoodCommentListData } from '@/apis/types'
import { create } from 'zustand'

interface FoodStore {
    comments: FoodCommentListData
    parentId: number
    setComments: (comments: FoodCommentListData) => void
    setParentId: (parentId: number) => void
}

export const useFoodStore = create<FoodStore>((set) => ({
    comments: [],
    parentId: 0,
    setComments: (comments) => set({ comments }),
    setParentId: (parentId) => set({ parentId }),
}))
