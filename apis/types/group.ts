export interface createGroupParam {
    groupName: string
    groupSize: number | string
    ownerId: number
    category: string
    image: string
    introduce?: string
}
export interface GroupInfoType {
    id: number
    groupName: string
    ownerId: number
    curNum: number
    groupSize: number
    introduce: any
    codeInfo: string
    createTime: number[]
    isInner: boolean
    rate: number
    avatar: string
    isOwner: number
}

export type GambitData = ShowSingleGambitData[]
export interface ShowSingleGambitData {
    content: string
    createTime: string
    groupId: number
    id: number
}

export type RankingType = SingleRankingMemberType[]
export interface SingleRankingMemberType {
    avatar: string
    groupId: number
    id: number
    isOwner: number
    username: string
    userId: number
    rate: number
}

//获取小组分类的数据
export type groupClassificationType = groupSingleClassificationType[]
export interface groupSingleClassificationType {
    avatar: string
    category: string
    codeInfo: string
    createTime: string
    curNum: number
    groupName: string
    groupSize: number
    id: number
    image: string
    introduce: string
    ownerId: number
}

//打卡
export interface clockParam {
    content: string
    groupId: number
    userId: number
}

export interface CategoryGroupsType {
    avatar: string
    category: string
    codeInfo: string
    createTime: number[] | string
    curNum: number
    groupName: string
    groupSize: number
    id: number
    introduce: string
    isInner: number
    ownerId: number
    rate: number
}

export interface ClockCalendarParams {
    groupId: number
    newDateTime?: string
    userId: number
}

export interface ClockCalendarData {
    checkout: number
    datetime: string
}

export interface RankingMemberBody {
    groupId: number
    pageNum: number
    pageSize: number
    userId: number
}

//#region 打卡内容
export type ClockContentType = SingleClockContentType[]
export interface SingleClockContentType {
    content: string
    createTime: number[]
    groupId: number
    id: number
    image: string | string[]
    userId: number
    avatar: string
    username: string
}

//endregion
