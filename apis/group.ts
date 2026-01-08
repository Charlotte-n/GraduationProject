import hyRequest from '../services'
import { CommonResponseType } from './types'
import {
    CategoryGroupsType,
    ClockCalendarData,
    ClockCalendarParams,
    ClockContentType,
    clockParam,
    GambitData,
    groupClassificationType,
    GroupInfoType,
    RankingMemberBody,
    RankingType,
} from './types/group'

enum BASEURL {
    CREATE_GROUP = '/group/create',
    SEARCH_GROUP = '/group/searchname',
    JOIN_GROUP = '/group/join',
    QUIT_GROUP = '/group/out',
    DELETE_GROUP_NUMBER = '/group/delete',
    GROUP_DETAIL = '/group/groupdetail',
    SHOW_GROUP_THREE = '/group/show',
    GROUP_CLASSIFICATION = '/group/classification',
    SHOW_GAMBIT = '/group/showgambit',
    MEMBER_RANKING = '/group/ordermember',
    USER_CLOCK = '/group/clock',
    GET_GROUPS_CATEGORY = '/group/allGroupCategory',
    CLOCK_CALENDAR = '/group/clockDate',
    CLOCK_CONTENT = '/group/getclock',
}

/**
 * 创建一个小组
 * @param data
 */
export const createGroupApi = (data: any) => {
    return hyRequest.post<CommonResponseType<any>>({
        url: BASEURL.CREATE_GROUP,
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
/**
 * 搜索小组
 * @param groupName
 * @param userid
 * @constructor
 */
export const searchGroupApi = (groupName: string, userid: number) => {
    return hyRequest.get<CommonResponseType<any>>({
        url: BASEURL.SEARCH_GROUP,
        params: {
            groupName,
            userid,
        },
    })
}

/**
 * 通过邀请码来加入小组
 * @param userid
 * @param code
 * @constructor
 */
export const JoinGroupByCodeApi = (userid: number, code: string) => {
    return hyRequest.get({
        url: BASEURL.JOIN_GROUP,
        params: {
            userid,
            code,
        },
    })
}

/**
 * 退出小组
 * @constructor
 * @param userid
 * @param groupId
 */
export const QuitGroupApi = (userid: number, groupId: number) => {
    return hyRequest.get({
        url: BASEURL.QUIT_GROUP,
        params: {
            userid,
            groupId,
        },
    })
}

/**
 * 删除小组成员
 * @param userid
 * @param groupId
 * @constructor
 */
export const DeleteGroupNumberApi = (userid: number, groupId: number) => {
    return hyRequest.get({
        url: BASEURL.DELETE_GROUP_NUMBER,
        params: {
            userid,
            groupId,
        },
    })
}

/**
 * 获取小组的详细信息
 * @constructor
 * @param id
 * @param userid
 */
export const GroupDetailApi = (id: number, userid: number) => {
    return hyRequest.get<CommonResponseType<GroupInfoType>>({
        url: BASEURL.GROUP_DETAIL + '/' + id + '/' + userid,
    })
}

/**
 * 获取打卡率前三的小组
 */
export const getThreeGroupApi = (id: number) => {
    return hyRequest.get<CommonResponseType<GroupInfoType[]>>({
        url: BASEURL.SHOW_GROUP_THREE + '/' + id,
    })
}

/**
 *获取分类小组
 */
export const getClassGroupApi = () => {
    return hyRequest.get<CommonResponseType<groupClassificationType>>({
        url: BASEURL.GROUP_CLASSIFICATION,
    })
}

/**
 * 显示话题
 * @param id
 */
export const showGambitApi = (id: number) => {
    return hyRequest.get<CommonResponseType<GambitData>>({
        url: BASEURL.SHOW_GAMBIT,
        params: {
            id,
        },
    })
}

/**
 * 获取排行榜的前50名
 * @param body
 */
export const showMemberRankingApi = (body: RankingMemberBody) => {
    const { groupId, pageNum, pageSize, userId } = body
    return hyRequest.post<CommonResponseType<RankingType>>({
        url: BASEURL.MEMBER_RANKING,
        data: {
            groupId,
            pageNum,
            pageSize,
            userId,
        },
    })
}

/**
 * 打卡
 * @param query
 * @param images
 * @constructor
 */
export const ClockContentApi = (query: clockParam) => {
    const { content, groupId, userId } = query
    return hyRequest.post({
        url: BASEURL.USER_CLOCK,
        params: {
            content,
            groupId,
            userId,
        },
    })
}
export const ClockApi = (query: clockParam, images: any) => {
    const { content, groupId, userId } = query
    return hyRequest.post<CommonResponseType<any>>({
        url: BASEURL.USER_CLOCK,
        data: images ? images : null,
        params: {
            content,
            groupId,
            userId,
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

/**
 * 获取分类小组
 * @param category
 */
export const getCategoryGroupsApi = (category: string) => {
    return hyRequest.get<CommonResponseType<CategoryGroupsType[]>>({
        url: BASEURL.GET_GROUPS_CATEGORY,
        params: {
            category,
        },
    })
}

/**
 * 打卡日历
 * @param data
 * @constructor
 */
export const ClockCalendarApi = (data: ClockCalendarParams) => {
    const { groupId, newDateTime, userId } = data
    return hyRequest.post<CommonResponseType<ClockCalendarData>>({
        url: BASEURL.CLOCK_CALENDAR,
        params: {
            groupId,
            newDateTime,
            userId,
        },
    })
}

/**
 * 展示打卡内容
 * @param groupId
 */
export const getClockContentApi = (groupId: number) => {
    return hyRequest.get<CommonResponseType<ClockContentType>>({
        url: BASEURL.CLOCK_CONTENT,
        params: {
            groupId,
        },
    })
}
