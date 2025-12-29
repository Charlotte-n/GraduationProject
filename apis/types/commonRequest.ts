export interface CommonResponseType<T> {
    code: number
    msg: string
    data: T
}
