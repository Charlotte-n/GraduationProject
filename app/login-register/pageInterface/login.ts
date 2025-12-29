import { LoginApi } from '@/apis'

export const requestLogin = async (email: string, password: string) => {
    try {
        const res = await LoginApi({ email, password })
        if (res.code === 1) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
