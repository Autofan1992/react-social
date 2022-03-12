import { authAPI, CaptchaResultCode, ResultCodesEnum } from '../../api/api'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ProfileType } from '../../types/types'
import { AppStateType } from '../redux-store'

const SET_USER_DATA = 'AUTH/SET_USER_DATA'
const SET_CAPTCHA = 'AUTH/SET_CAPTCHA'
const SET_IS_FETCHING = 'AUTH/SET_IS_FETCHING'

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    userPhoto: null as string | null,
    isAuth: false as boolean,
    authError: null as string | null,
    captchaUrl: null as string | null,
    isFetching: false
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.payload
            }
        default:
            return state
    }
}

type ActionTypes =
    SetAuthUserDataActionType |
    IsFetchingActionType |
    SetCaptcha

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    userPhoto: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

const setAuthUserData = (isAuth: boolean, userId: number | null, email: string | null, login: string | null, userPhoto: string | null): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, userPhoto, isAuth }
})

type IsFetchingActionType = {
    type: typeof SET_IS_FETCHING
    payload: boolean
}

const setIsFetching = (payload: boolean): IsFetchingActionType => ({
    type: SET_IS_FETCHING,
    payload
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getAuthUserData = (): ThunkType => async dispatch => {
    const userData = await authAPI.getAuthInfo()
    if (userData.resultCode === ResultCodesEnum.Success) {
        const { id, email, login } = userData.data
        const authData = await authAPI.getAuthProfile(id)
        dispatch(setAuthUserData(true, id, email, login, authData.photos.small))
    }
}

type SetCaptcha = {
    type: typeof SET_CAPTCHA
    payload: string
}
const setCaptcha = (url: string): SetCaptcha => ({
    type: SET_CAPTCHA,
    payload: url
})

export const login = ({ email, password, rememberMe, captcha }: ProfileType): ThunkType => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        let loginData = await authAPI.sendLoginRequest(email, password, rememberMe, captcha)

        if (loginData.resultCode === ResultCodesEnum.Success) {
            // logged in, sending profile request
            await dispatch(getAuthUserData())
            dispatch(setCaptcha(''))

        } else if (loginData.resultCode > ResultCodesEnum.Success && loginData.resultCode < CaptchaResultCode.CaptchaIsRequired) {
            // error in form fields
            dispatch(stopSubmit('loginForm', { _error: 'Проверьте логин и/или пароль' }))
        }

        if (loginData.resultCode === CaptchaResultCode.CaptchaIsRequired) {
            // many wrong requests, sending captcha request
            dispatch(stopSubmit('loginForm', { _error: 'Проверьте логин и/или пароль, а также введите символы изображенные на картинке в поле ниже' }))
            const captchaData = await authAPI.getCaptchaURL()
            dispatch(setCaptcha(captchaData.url))
        }
    } catch (e) {
        console.log(e)
        window.alert('Что-то пошло не так')
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const logout = (): ThunkAction<void, InitialStateType, unknown, AnyAction> => async dispatch => {
    let response = await authAPI.sendLogoutRequest()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(false, null, null, null, null))
    }
}

export default authReducer