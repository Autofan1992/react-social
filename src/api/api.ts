import axios, { AxiosResponse } from 'axios'
import { ProfileType } from '../types/types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '1f6ea116-9c88-4045-ba83-8df91e8a32ba'
    }
})

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollowUserRequest(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    followUserRequest(userId: number) {
        return instance.post(`follow/${userId}`)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum CaptchaResultCode {
    CaptchaIsRequired = 10
}

type AuthInfoType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | CaptchaResultCode
    messages: Array<string>
}

export const authAPI = {
    getAuthInfo() {
        return instance.get<AuthInfoType>(`auth/me`).then(res => res.data)
    },
    getAuthProfile(id: number) {
        return instance.get(`profile/${id}`).then(res => res.data)
    },
    sendLoginRequest(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    getCaptchaURL() {
        return instance.get<string>(`security/get-captcha-url`).then(res => res.data)
    },
    sendLogoutRequest() {
        return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    setStatus(status: string) {
        return instance.put(`profile/status`, { status })
    },
    setAvatar(avatar: File) {
        const formData = new FormData()
        formData.append('image', avatar)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

const weatherInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

const weatherProfileId = 'b979e8592b62a595eec4ec0cf4ac691f'

export const weatherAPI = {
    getWeatherData(cityName: string) {
        return weatherInstance.get(`weather?q=${cityName}&appid=${weatherProfileId}&units=metric&lang=ru`)
            .catch(e => e.response)
    }
}