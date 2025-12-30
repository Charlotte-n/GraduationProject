import hyRequest from '../services'
import { CommonResponseType } from './types'
import { GetDailyIntakeData, ResponseDailyIntake } from './types/home'

enum URL {
    GET_INTAKE_DAILY = '/food/intake',
    GET_DAILY_INTAKE = '/food/getrecommend',
}

/**
 * 获取每天的摄入
 * @param data
 */
export const getIntakeDailyApi = (data: GetDailyIntakeData) => {
    return hyRequest.post<CommonResponseType<ResponseDailyIntake>>({
        url: URL.GET_INTAKE_DAILY,
        data,
    })
}

/**
 * 获取每日的摄入
 * @param id
 * @constructor
 */
export const DailyIntakeApi = (id: number) => {
    return hyRequest.get<CommonResponseType<any>>({
        url: URL.GET_DAILY_INTAKE + '/' + id,
    })
}
