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
