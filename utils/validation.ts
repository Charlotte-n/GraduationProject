// 檢驗郵箱是否正確
export const verifyEmail = (email: string) => {
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(email)
}
