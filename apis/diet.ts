import axios from 'axios'
import hyRequest from '../services'
import {
    CaloriesBodyData,
    CommonResponseType,
    RandomFoodDataType,
    RecognizeFoodResponse,
} from './types'

enum URL {
    RECOGNIZE_FOOD_URL = '/dish/parse',
    RANDOM_FOOD_URL = '/food/recommend',
    ADD_CALORIES = '/food/setcalorie',
    GET_DAILYINTAKE = '/food/getcalorie',
}
interface recognizeFoodParamType {
    image: string
}

/**
 * 识别食物的api
 * @param param
 */
export const recognizeFood = (param: recognizeFoodParamType) => {
    return hyRequest.post<CommonResponseType<RecognizeFoodResponse>>({
        url: URL.RECOGNIZE_FOOD_URL,
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
interface addressParamType {
    location: string
    ak: string
}

/**
 * 获取地理位置信息
 * @param param
 */
export const address = (param: addressParamType) => {
    return axios.get('https:/.map.baidu.com/reverse_geocoding/v3', {
        params: param,
    })
}

/**
 * 随机获取的食物
 */
export const randomFood = () => {
    return hyRequest.get<CommonResponseType<RandomFoodDataType[]>>({
        url: URL.RANDOM_FOOD_URL,
    })
}

/**
 * 用户添加食物
 * @param data
 */
export const addCaloriesApi = (data: CaloriesBodyData) => {
    return hyRequest.post<CommonResponseType<any>>({
        url: URL.ADD_CALORIES,
        data,
    })
}

/**
 * 获取今日摄入的列表
 * @param id
 */
export const getDailyIntakeApi = (id: number) => {
    return hyRequest.get({
        url: URL.GET_DAILYINTAKE + '/' + id,
    })
}
