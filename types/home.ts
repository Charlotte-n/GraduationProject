import React from 'react'

interface IntakeItem {
    id: number
    title: string
    image: string
    g: number
}

interface FoodItemType {
    id: string
    icon: React.JSX.Element
    name: string
    recommend: string
    intakeFoodList: IntakeItem[]
}

type FoodListType = FoodItemType[]

//食物列表
export interface FoodListByCategoryType {
    num: number
    foods: SingleFoodListType
}
export interface SingleFoodItemType {
    id?: number
    categoryId?: number
    title?: string
    image?: string
    cellulose?: number
    field?: string
    calories?: number
    fat?: number
    carbohydrate?: number
    protein?: number
    name?: string
}

export type SingleFoodListType = SingleFoodItemType[]

export type { FoodItemType, FoodListType, IntakeItem }

