import { AppStateType } from '../redux-store'

export const getAuthUserLogin = (state: AppStateType) => {
    return state.auth.login
}

export const getAuthUserId = (state: AppStateType) => {
    return state.auth.userId
}

export const getAuthUserPhoto = (state: AppStateType) => {
    return state.auth.userPhoto
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getIsFetching = (state: AppStateType) => {
    return state.auth.isFetching
}

export const getCaptchaURL = (state: AppStateType) => {
    return state.auth.captchaUrl
}