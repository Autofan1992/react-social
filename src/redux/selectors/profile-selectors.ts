import { AppStateType } from '../redux-store'

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}

export const getAvatarChangeResult = (state: AppStateType) => {
    return state.profilePage.avatarChangeResult
}

export const getStatusChangeResult = (state: AppStateType) => {
    return state.profilePage.statusChangeResult
}

export const getIsFetchingAvatar = (state: AppStateType) => {
    return state.profilePage.isFetchingAvatar
}

export const getSaveProfileResult = (state: AppStateType) => {
    return state.profilePage.saveProfileResult
}

export const getPostID = (state: AppStateType) => {
    return state.profilePage.posts.length
}

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts
}