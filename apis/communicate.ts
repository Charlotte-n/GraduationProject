import hyRequest from '../services'
import {
    CommentsType,
    CommunicateContentData,
    GetCommunicateContentData,
    GetRecordDetail,
    UploadCommentData,
} from './types/communicate'
import { CommonResponseType } from './types'
import { FoodCommentListData } from './types/food'

enum BASEURL {
    GET_TOPIC = '/log/topics',
    UPLOAD_TEXT = '/log/uplog',
    UPLOAD_COMMUNICATE_IMAGE = '/log/upimg',
    COMMUNICATE_CONTENT = '/log/getlist',
    RECORD_MEMORY = '/log/record',
    RECORD_DETAIL = '/log/getLog',
    GET_COMMENT = '/log/getComment',
    POST_COMMENT = '/log/postComment',
    LIKE_DISLIKE = '/log/dolike',
    LOG_COMMENT = '/log/estimate',
    LOG_COMMENT_SINGLE = '/log/getestimate',
}

/**
 * 获取topic
 */
export const getTopicApi = () => {
    return hyRequest.post({
        url: BASEURL.GET_TOPIC,
        data: {
            desc: '',
            id: 0,
            status: 0,
        },
    })
}

/**
 * 发布饮食圈记录
 * @param data
 * @constructor
 */
export const recordDietTextApi = (data: UploadCommentData) => {
    return hyRequest.post<CommonResponseType<number>>({
        url: BASEURL.UPLOAD_TEXT,
        data: data,
    })
}

/**
 * 上传图片
 * @param id
 * @param image
 */
export const uploadCommunicateImagApi = (id: number, image: any) => {
    return hyRequest.post({
        url: BASEURL.UPLOAD_COMMUNICATE_IMAGE + '/' + id,
        data: image,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

/**
 * 获取饮食圈的内容
 * @param data
 * @param userid
 */

export const getCommunicateContentApi = (
    data: GetCommunicateContentData,
    userid: number,
) => {
    return hyRequest.post<CommonResponseType<CommunicateContentData>>({
        url: BASEURL.COMMUNICATE_CONTENT + '/' + userid,
        data,
    })
}

/**
 * 获取饮食记录
 * @param userid
 */
export const getRecordMemoryApi = (userid: number) => {
    return hyRequest.get({
        url: BASEURL.RECORD_MEMORY + '/' + userid,
    })
}

/**
 * 获取记录详情
 * @param id
 */
export const getRecordDetailApi = (id: number) => {
    return hyRequest.get<CommonResponseType<GetRecordDetail>>({
        url: BASEURL.RECORD_DETAIL,
        params: {
            id,
        },
    })
}

/**
 * 获取评论
 * @param data
 */
export const getCommentApi = (data: { logId: number; userId: number }) => {
    return hyRequest.post<CommonResponseType<FoodCommentListData>>({
        url: BASEURL.GET_COMMENT,
        data,
    })
}

export interface PostCommentParam {
    logId: number
    userId: number
    content: string
    parentCommentId?: number
}

/**
 * 发表评论
 * @param data
 */
export const postCommentApi = (data: PostCommentParam) => {
    return hyRequest.post<CommonResponseType<any>>({
        url: BASEURL.POST_COMMENT,
        data,
    })
}

/**
 * 点赞或者取消点赞
 * @param userid
 * @param logCommentId
 */
export const doLike = (userid: number, logCommentId: number) => {
    return hyRequest.get({
        url: BASEURL.LIKE_DISLIKE,
        params: {
            userid,
            logCommentId,
        },
    })
}

/**
 * 对该记录的评价
 * @param type
 * @param userid
 * @param logId
 */
export const LogCommentApi = (type: number, userid: number, logId: number) => {
    return hyRequest.get({
        url: BASEURL.LOG_COMMENT,
        params: {
            type,
            userid,
            logId,
        },
    })
}

/**
 * 获取单个评价
 * @param userid
 * @param logId
 * @constructor
 */
export const LogCommentSingleApi = (userid: number, logId: number) => {
    return hyRequest.get({
        url: BASEURL.LOG_COMMENT_SINGLE,
        params: {
            userid,
            logId,
        },
    })
}
