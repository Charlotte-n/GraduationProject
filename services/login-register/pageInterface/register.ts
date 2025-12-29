import { getCodeApi, verifyCodeApi, VerifyCodeParamType } from '@/apis'
import { Router } from 'expo-router'
import { Alert } from 'react-native'

// 验证码
export const useRegisterInterface = () => {
    const requestCode = async (email: string, router: Router) => {
        try {
            const resCode = await getCodeApi(email)
            if (resCode.code === 1) {
                return true
            } else if (resCode.code === 0) {
                Alert.alert(
                    '提示',
                    '该邮箱已经注册了,是否要到登录页面去登录?',
                    [
                        {
                            text: '取消',
                            style: 'cancel',
                        },
                        {
                            text: '确定',
                            onPress: () =>
                                router.replace('/login-register/login'),
                        },
                    ],
                )
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const requestVerifyCodeApi = async (params: VerifyCodeParamType) => {
        try {
            const res = await verifyCodeApi(params)
            if (res.code === 1) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
    }

    return {
        requestCode,
        requestVerifyCodeApi,
    }
}
