import { CaptchaResultCode, ResultCodesEnum } from '../../api/api'
import { stopSubmit } from 'redux-form'
import { PhotosType, ProfileType } from '../../types/types'
import { BaseThunkType, InferActionTypes } from '../redux-store'
import { authAPI } from '../../api/auth-api'

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    userPhoto: null as PhotosType | null,
    isAuth: false as boolean,
    authError: null as string | null,
    captchaUrl: null as string | null,
    isFetching: false
}

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'AUTH/SET_IS_FETCHING':
            return {
                ...state,
                isFetching: action.payload
            }
        case 'AUTH/SET_CAPTCHA':
            return {
                ...state,
                captchaUrl: action.payload
            }
        default:
            return state
    }
}

const actions = {
    setAuthUserData: (isAuth: boolean, userId: number | null, email: string | null, login: string | null, userPhoto: PhotosType | null) => ({
        type: 'AUTH/SET_USER_DATA',
        payload: { userId, email, login, userPhoto, isAuth }
    } as const),
    setIsFetching: (payload: boolean) => ({
        type: 'AUTH/SET_IS_FETCHING',
        payload
    } as const),
    setCaptcha: (url: string) => ({
        type: 'AUTH/SET_CAPTCHA',
        payload: url
    } as const)
}

export const getAuthUserData = (): ThunkType => async dispatch => {
    const userData = await authAPI.getAuthInfo()
    if (userData.resultCode === ResultCodesEnum.Success) {
        const { id, email, login } = userData.data
        const authData = await authAPI.getAuthProfile(id)
        dispatch(actions.setAuthUserData(true, id, email, login, authData.photos))
    }
}

export const login = ({ email, password, rememberMe, captcha }: ProfileType): ThunkType => async dispatch => {
    try {
        dispatch(actions.setIsFetching(true))
        let loginData = await authAPI.loginRequest(email, password, rememberMe, captcha)

        if (loginData.resultCode === ResultCodesEnum.Success) {
            // logged in, sending profile request
            await dispatch(getAuthUserData())
        } else if (loginData.resultCode > ResultCodesEnum.Success && loginData.resultCode < CaptchaResultCode.CaptchaIsRequired) {
            // error in form fields
            dispatch(stopSubmit('loginForm', { _error: 'Проверьте логин и/или пароль' }))
        }
        if (loginData.resultCode === CaptchaResultCode.CaptchaIsRequired) {
            // many wrong requests, sending captcha request
            dispatch(stopSubmit('loginForm', { _error: 'Проверьте логин и/или пароль, а также введите символы изображенные на картинке в поле ниже' }))
            const captchaData = await authAPI.getCaptchaURL()
            dispatch(actions.setCaptcha(captchaData.url))
        }
    } catch (e) {
        console.log(e)
        window.alert('Что-то пошло не так')
    } finally {
        dispatch(actions.setIsFetching(false))
    }
}

export const logout = (): ThunkType => async dispatch => {
    let data = await authAPI.logoutRequest()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(false, null, null, null, null))
    }
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

export default authReducer