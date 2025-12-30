//#region 百度识别食物返回来的数据类型
export type RecognizeFoodResponse = {
    error_code: any
    error_msg: any
    log_id: number
    result: Array<{
        baiKeInfo: any
        calorie: number
        name: string
        probability: number
    }>
    result_num: number
}

export type RecognizeFood = {
    baiKeInfo: any
    calorie: number
    name: string
    probability: number
}
//endregion

//#region 获取随机食物返回来的数据
export interface RandomFoodDataType {
    id: number
    title: string
}

//endregion

//#region 热量添加
export interface CaloriesBodyData {
    calories: number
    carbohydrate: number
    cellulose: number
    fat: number
    id: number
    protein: number
    type: number
    foodId: number
    g: number
    operator: number
}

//endregion
