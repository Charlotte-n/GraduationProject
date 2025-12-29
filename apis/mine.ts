import type { CommonResponseType, LoginData } from '@/apis/types'
import hyRequest from '@/services'

enum URL {
    LOGINURL = '/api/user/login',
    CODEURL = '/api/user/getCode',
    VERIFYURL = '/api/user/register',
    UPLOADAVATAR = '/api/common/upload',
    UPDATEUSERINFO = '/api/user/updatemsg',
    GETUSERINFO = '/api/user/msg',
    LOGOUT = '/api/user/logout',
    FIND_PASSWORD = '/api/user/findBack',
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
