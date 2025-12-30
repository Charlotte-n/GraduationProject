export interface FoodListByCategoryData {
    category_id?: string | number
    id?: string | number
    title?: string
    pageNum?: number
    pageSize?: number
}

//食物种类
export type FoodCategoryType = Daum[]
export interface Daum {
    id: number
    title: string
}

//食物列表
export interface FoodListByCategoryType {
    num: number
    foods: SingleFoodListType[]
}
export interface SingleFoodListType {
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
}

//食谱评价
export interface PostFoodCommentData {
    content: string
    dishId: number
    parentId: number
    userId: number
}

export type FoodCommentListData = FoodCommentSingleData[]
export interface FoodCommentSingleData {
    id: number
    userid: number
    username: string
    avatar?: string
    content: string
    date: Array<number>
    children: FoodCommentChildren[]
    likeNum: number
    isLike: boolean
}

export interface FoodCommentChildren {
    id: number
    parentId: number
    userid: number
    username: string
    avatar?: string
    content: string
    date: Array<number>
    likeNum: number
    isLike: boolean
}

//食谱列表
export interface RecipeListBody {
    id?: number
    pageNum?: number
    pageSize?: number
}

export interface RecipeListData {
    dishes: SingleDish[]
    num: number
}

export interface SingleDish {
    amount: string | string[]
    id: number
    image: string | string[]
    key: string
    materials: string | string[]
    name: string
    score: number
    step: string | string[]
    stepImg: string | string[]
}
