import type { CommonResponseType, LoginData } from '@/apis/types'
import hyRequest from '@/services'

enum URL {
    LOGINURL = '/user/login',
    CODEURL = '/user/getCode',
    VERIFYURL = '/user/register',
    UPLOADAVATAR = '/common/upload',
    UPDATEUSERINFO = '/user/updatemsg',
    GETUSERINFO = '/user/msg',
    LOGOUT = '/user/logout',
    FIND_PASSWORD = '/user/findBack',
}

export interface LoginParamType {
    email: string
    password: string
}

export const LoginApi = (LoginParam: LoginParamType) => {
    return hyRequest.post<CommonResponseType<LoginData>>({
        url: URL.LOGINURL,
        data: {
            email: LoginParam.email,
            password: LoginParam.password,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

/**
 * 获取验证码
 * @param email
 */
export const getCodeApi = (email: string) => {
    return hyRequest.get<CommonResponseType<string>>({
        url: URL.CODEURL,
        params: {
            email,
        },
    })
}

/**
 * 校验验证码
 * @param code
 */
export interface VerifyCodeParamType {
    code: string
    email: string
    password: string
}
export const verifyCodeApi = (parm: VerifyCodeParamType) => {
    return hyRequest.post({
        url: URL.VERIFYURL,
        data: parm,
    })
}

/**
 * 获取用户信息
 * @param id
 */
export const getUserInfo = (id?: number) => {
    return hyRequest.get({
        url: URL.GETUSERINFO + '/' + id,
    })
}

/**
 * 修改用户名
 * @param username
 * @param id
 */
export const updateUserName = ({
    username,
    id,
}: {
    username: string
    id: number
}) => {
    return hyRequest.post({
        url: URL.UPDATEUSERINFO,
        data: {
            username,
            id,
        },
    })
}

export interface updateUserProfileParamType {
    id: number
    sex?: number
    height?: string
    birth?: string
    weight?: string
    habit?: string
    exercise?:number
    target?:number
    gym?: number
    userid?: number
}
export const updateUserProfile = (param: updateUserProfileParamType) => {
    return hyRequest.post({
        url: URL.UPDATEUSERINFO,
        data: param,
    })
}


interface uploadAvatarParamType {
    image: string
}
/**
 * 上传头像
 * @param param
 * @param id
 */
export const uploadAvatar = (param: uploadAvatarParamType, id: number) => {
    return hyRequest.post({
        url: URL.UPLOADAVATAR + '/' + id,
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
