import hyRequest from '../services'
import { CommonResponseType } from './types'
import { addCollectBody, AiQuestionBody } from './types/common'

enum BASEURL {
    COLLECT = '/food/dosave',
    GET_COLLECT_CONTENT = '/food/save',
    DELETE_COLLECT = '/food/rmsave',
    AI = '/common/ai',
    JUDGE_COLLECT = '/food/cansave',
}

/**
 * 添加收藏
 * @param data
 */
export const addCollectApi = (data: addCollectBody) => {
    return hyRequest.post<CommonResponseType<any>>({
        url: BASEURL.COLLECT,
        data,
    })
}

/**
 * 获取收藏内容
 * @param userid
 */
export const getCollectContentApi = (userid: number) => {
    return hyRequest.get<CommonResponseType<any>>({
        url: BASEURL.GET_COLLECT_CONTENT + '/' + userid,
    })
}

/**
 * 删除收藏
 * @param data
 */
export const cancelCollectApi = (data: addCollectBody) => {
    return hyRequest.post<CommonResponseType<any>>({
        url: BASEURL.DELETE_COLLECT,
        data,
    })
}

/**
 * 判断是否能够收藏
 * @param data
 * @constructor
 */
export const JudgeCollectApi = (data: addCollectBody) => {
    return hyRequest.post({
        url: BASEURL.JUDGE_COLLECT,
        data,
    })
}

/**
 * 获取ai问答
 * @param data
 * @constructor
 */
export const AiQuestionApi = (data: AiQuestionBody) => {
    return hyRequest.post<CommonResponseType<any>>({
        url: BASEURL.AI,
        data,
    })
}
