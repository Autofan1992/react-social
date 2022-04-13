import { FormAction, reset, stopSubmit } from 'redux-form'
import { PostType, ProfileType } from '../../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionTypes } from '../redux-store'
import { profileAPI } from '../../api/profile-api'
import { setRequestSuccessToggle } from './app-reducer'

const initialState = {
    posts: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    isFetching: false as boolean,
    statusChangeResult: undefined as boolean | undefined,
    avatarChangeResult: undefined as boolean | undefined,
    saveProfileResult: false as boolean
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof profileActions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction>

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/SET_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.payload
            }
        }
        case 'PROFILE/ADD_POST':
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length,
                    post: action.payload,
                    likesCount: 0
                }]
            }
        case 'PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload)
            }
        }
        case 'PROFILE/LIKE_POST':
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.payload
                    ? {
                        ...post,
                        likesCount: ++post.likesCount
                    } : post)
            }
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.payload
            }
        case 'PROFILE/SET_USER_STATUS':
            return {
                ...state,
                status: action.payload
            }
        case 'PROFILE/SET_CHANGE_STATUS_RESULT_CODE':
            return {
                ...state,
                statusChangeResult: action.payload
            }
        case 'PROFILE/SET_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload } as ProfileType
            }
        case 'PROFILE/SET_SAVE_PROFILE_RESULT':
            return {
                ...state,
                saveProfileResult: action.payload
            }
        default:
            return state
    }
}

export const profileActions = {
    setNewPost: (text: string) => ({
        type: 'PROFILE/ADD_POST',
        payload: text
    } as const),
    deletePost: (id: number) => ({
        type: 'PROFILE/DELETE_POST',
        payload: id
    } as const),
    likePost: (id: number) => ({
        type: 'PROFILE/LIKE_POST',
        payload: id
    } as const),
    setIsFetching: (val: boolean) => ({
        type: 'PROFILE/SET_IS_FETCHING',
        payload: val
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'PROFILE/SET_USER_PROFILE',
        payload: profile
    } as const),
    setStatusSuccess: (status: string) => ({
        type: 'PROFILE/SET_USER_STATUS',
        payload: status
    } as const),
    setChangeStatusResponse: (result: boolean | undefined) => ({
        type: 'PROFILE/SET_CHANGE_STATUS_RESULT_CODE',
        payload: result,
    } as const),
    setAvatarSuccess: (avatar: object) => ({
        type: 'PROFILE/SET_PHOTO_SUCCESS',
        payload: avatar
    } as const),
    setChangeAvatarResponse: (result: boolean | undefined) => ({
        type: 'PROFILE/SET_AVATAR_RESULT_CODE',
        payload: result,
    } as const),
    setSaveProfileResult: (result: boolean) => ({
        type: 'PROFILE/SET_SAVE_PROFILE_RESULT',
        payload: result
    } as const)
}

export const addPost = (post: string): ThunkType => async dispatch => {
    dispatch(profileActions.setNewPost(post))
    dispatch(reset('postForm'))
}

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    const data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfile(data))
}

export const getUserStatus = (userId: number): ThunkType => async dispatch => {
    const data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatusSuccess(data))
}

export const updateUserStatus = (status: string): ThunkType => async dispatch => {
    try {
        const data = await profileAPI.setStatus(status)
        if (data.resultCode === 0) {
            await dispatch(setRequestSuccessToggle(true))
            dispatch(profileActions.setChangeStatusResponse(true))
            dispatch(profileActions.setStatusSuccess(status))
        } else {
            await dispatch(setRequestSuccessToggle(false))
            dispatch(profileActions.setChangeStatusResponse(false))
        }
    } catch (e) {
        dispatch(profileActions.setChangeStatusResponse(false))
        console.warn(e)
    } finally {
        setTimeout(function () {
            dispatch(profileActions.setChangeStatusResponse(undefined))
        }, 3000)
    }
}

export const updateProfileAvatar = (avatar: File): ThunkType => async dispatch => {
    dispatch(profileActions.setIsFetching(true))
    try {
        const data = await profileAPI.setAvatar(avatar)
        if (data.resultCode === 0) {
            await dispatch(setRequestSuccessToggle(true))
            dispatch(profileActions.setChangeAvatarResponse(true))
            dispatch(profileActions.setAvatarSuccess(data.data.photos))
        } else {
            await dispatch(setRequestSuccessToggle(false))
        }
    } catch (e) {
        dispatch(profileActions.setChangeAvatarResponse(false))
        console.warn(e)
    } finally {
        dispatch(profileActions.setIsFetching(false))
        setTimeout(function () {
            dispatch(profileActions.setChangeAvatarResponse(undefined))
        }, 3000)
    }
}

export const saveProfile = (profileData: ProfileType): ThunkType => async dispatch => {
    dispatch(profileActions.setIsFetching(true))
    const data = await profileAPI.saveProfile(profileData)

    if (data.resultCode === 0) {
        dispatch(profileActions.setUserProfile(profileData))
        dispatch(profileActions.setSaveProfileResult(true))
        await dispatch(setRequestSuccessToggle(true))
    } else {
        await dispatch(setRequestSuccessToggle(false))
        const contactTitle = data.messages[0].split(/[( -> )]/)
        const splitTitle = contactTitle[contactTitle.length - 2].toLowerCase()
        const errorObject = {
            'contacts': {
                [splitTitle]: data.messages[0]
            }
        }
        dispatch(stopSubmit('editProfile', errorObject))
    }
    dispatch(profileActions.setIsFetching(false))
}

export default profileReducer