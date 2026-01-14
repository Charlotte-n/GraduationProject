export type UploadCommentData = {
    content: string
    topicId: number
    userid: number
}

export type GetCommunicateContentData = {
    id?: number | null
    userid?: number
    topicId?: number
    pageSize?: number
    pageNum?: number
}

export type CommunicateContentData = CommunicateSingleContentData[]
export interface CommunicateSingleContentData {
    content: string
    date: []
    disLikeNum: number
    likeNum: number
    images: string | string[]
    topicId: number
    userid: number
    avatar: string
    username: string
    id: number
    type: number
}

export interface GetRecordDetail {
    dislikeNum: number
    likeNum: number
    userId: number
    username: string
    avatar: string
    logContent: string
    logImages: string | string[] | null
}

//获取评论
export interface CommentsType {
    dislikeNum: number
    likeNum: number
    logComments: LogComment[]
}

export interface LogComment {
    userId: string
    username: string
    avatar: string
    content: string
    subComments: SubComment[]
}

export interface SubComment {
    userId: string
    username: string
    avatar: string
    content: string
    subComments: any
}
