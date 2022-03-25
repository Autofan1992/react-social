import { ProfileType, UserType } from '../types/types'
import { instance, ResultCodesEnum } from './api'

type ProfileResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export const profileAPI = {
    getProfile: (userId: number) => instance
        .get<ProfileType>(`profile/${userId}`)
        .then(res => res.data),
    getStatus: (userId: number) => instance
        .get<string>(`profile/status/${userId}`)
        .then(res => res.data),
    setStatus: (status: string) => instance
        .put<ProfileResponseType>(`profile/status`, { status })
        .then(res => res.data),
    setAvatar: (avatar: File) => {
        const formData = new FormData()
        formData.append('image', avatar)
        return instance
            .put<ProfileResponseType<UserType>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
    },
    saveProfile: (profile: ProfileType) => instance
        .put<ProfileResponseType>(`profile`, profile)
        .then(res => res.data)
}