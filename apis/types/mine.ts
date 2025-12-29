export interface LoginData {
    token: string
    user: User
}

export interface User {
    id: number
    exercise: number
    username: string
    password: string
    email: string
    status: number
    phone: number
    height: string
    weight: string
    avatar: string
    sex: number
    birth: number[]
    target: number
}
