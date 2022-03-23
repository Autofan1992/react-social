import axios from 'axios'
import { PhotosType, ProfileType, UserType } from '../types/types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'cb233b84-2199-4231-8a72-d5a32fccbd92'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

type UserInfoResponse = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type UserFollowResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: any
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UserInfoResponse>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    unfollowUserRequest(userId: number) {
        return instance.delete<UserFollowResponseType>(`follow/${userId}`).then(res => res.data)
    },
    followUserRequest(userId: number) {
        return instance.post<UserFollowResponseType>(`follow/${userId}`).then(res => res.data)
    }
}

export enum CaptchaResultCode {
    CaptchaIsRequired = 10
}

type AuthInfoResponse = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type AuthResponse = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | CaptchaResultCode
    messages: Array<string>
}

type AuthProfileResponse = ProfileType

type CaptchaResponse = {
    url: string
}

export const authAPI = {
    getAuthInfo() {
        return instance.get<AuthInfoResponse>(`auth/me`).then(res => res.data)
    },
    getAuthProfile(id: number) {
        return instance.get<AuthProfileResponse>(`profile/${id}`).then(res => res.data)
    },
    sendLoginRequest(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<AuthResponse>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    getCaptchaURL() {
        return instance.get<CaptchaResponse>(`security/get-captcha-url`).then(res => res.data)
    },
    sendLogoutRequest() {
        return instance.delete<AuthResponse>(`auth/login`).then(res => res.data)
    }
}

type SetStatusResponse = {
    resultCode: ResultCodesEnum
}

type SetAvatarResponse = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type SaveProfileResponse = {
    data: any
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<AuthProfileResponse>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    setStatus(status: string) {
        return instance.put<SetStatusResponse>(`profile/status`, { status }).then(res => res.data)
    },
    setAvatar(avatar: File) {
        const formData = new FormData()
        formData.append('image', avatar)
        return instance.put<SetAvatarResponse>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<SaveProfileResponse>(`profile`, profile).then(res => res.data)
    }
}

const weatherInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

const weatherProfileId = 'b979e8592b62a595eec4ec0cf4ac691f'

export enum WeatherResultCodes {
    Success = 200
}

type WeatherDataResponse = {
    cod: WeatherResultCodes
    message: string
}

export const weatherAPI = {
    getWeatherData(cityName: string) {
        return weatherInstance.get<WeatherDataResponse>(`weather?q=${cityName}&appid=${weatherProfileId}&units=metric&lang=ru`)
            .then(res => res.data)
            .catch(e => e.response)
    }
}