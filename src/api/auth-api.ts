import { ProfileType } from '../types/types'
import { CaptchaResultCode, instance, ResultCodesEnum } from './api'

type AuthInfoDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
type AuthDataType = {
    userId: number
}
type CaptchaResponseType = {
    url: string
}

export const authAPI = {
    getAuthInfo: () => instance
        .get<LoginResponseType<AuthInfoDataType>>(`auth/me`)
        .then(res => res.data),
    getAuthProfile: (id: number) => instance
        .get<ProfileType>(`profile/${id}`).then(res => res.data),
    loginRequest: (email: string, password: string, rememberMe: boolean, captcha: string) => instance
        .post<LoginResponseType<AuthDataType, ResultCodesEnum | CaptchaResultCode>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
        .then(res => res.data),
    getCaptchaURL: () => instance
        .get<CaptchaResponseType>(`security/get-captcha-url`)
        .then(res => res.data),
    logoutRequest: () => instance
        .delete<LoginResponseType>(`auth/login`)
        .then(res => res.data)
}