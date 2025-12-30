export interface GetDailyIntakeData {
    birth: string
    exercise: string | number
    fat?: number
    gym: number | string
    height: number | string
    sex: number | string
    target: number | string
    userid: number
    weight: number | string
}

export interface ResponseDailyIntake {
    cellulose: number
    calories: number
    fat: number
    carbohydrate: number
    protein: number
}
