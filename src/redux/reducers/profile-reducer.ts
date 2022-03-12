import { profileAPI } from '../../api/api'
import { FormAction, reset, stopSubmit } from 'redux-form'
import { PhotosType, PostType, ProfileType } from '../../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../redux-store'

const ADD_POST = 'PROFILE/ADD_POST'
const DELETE_POST = 'PROFILE/DELETE_POST'
const LIKE_POST = 'PROFILE/LIKE_POST'
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE'
const SET_USER_STATUS = 'PROFILE/SET_USER_STATUS'
const SET_CHANGE_STATUS_RESULT_CODE = 'PROFILE/SET_CHANGE_STATUS_RESULT_CODE'
const SET_PHOTO_SUCCESS = 'PROFILE/SET_PHOTO_SUCCESS'
const SET_AVATAR_RESULT_CODE = 'PROFILE/SET_AVATAR_RESULT_CODE'
const SET_IS_FETCHING_AVATAR = 'PROFILE/IS_FETCHING'
const SET_SAVE_PROFILE_RESULT = 'PROFILE/SET_SAVE_PROFILE_RESULT'

const initialState = {
    posts: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    isFetchingAvatar: false as boolean,
    statusChangeResult: undefined as boolean | undefined,
    avatarChangeResult: undefined as boolean | undefined,
    saveProfileResult: false as boolean
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_IS_FETCHING_AVATAR: {
            return {
                ...state,
                isFetchingAvatar: action.payload
            }
        }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length,
                    text: action.payload,
                    likesCount: 0
                }]
            }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload)
            }
        }
        case LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.payload
                    ? {
                        ...post,
                        likesCount: ++post.likesCount
                    } : post)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case SET_CHANGE_STATUS_RESULT_CODE:
            return {
                ...state,
                statusChangeResult: action.payload
            }
        case SET_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload } as ProfileType
            }
        case SET_SAVE_PROFILE_RESULT:
            return {
                ...state,
                saveProfileResult: action.payload
            }
        default:
            return state
    }
}

type ActionTypes =
    SetNewPostActionType |
    DeletePostActionType |
    LikePostActionType |
    IsFetchingAvatarActionType |
    SetUserProfileActionType |
    SetStatusSuccessActionType |
    SetChangeStatusResponseActionType |
    SetAvatarSuccessActionType |
    SetChangeAvatarResponseActionType |
    SetSaveProfileResultActionType

type SetNewPostActionType = {
    type: typeof ADD_POST
    payload: string
}

export const setNewPost = (text: string): SetNewPostActionType => ({
    type: ADD_POST,
    payload: text
})

type DeletePostActionType = {
    type: typeof DELETE_POST
    payload: number
}

export const deletePost = (id: number): DeletePostActionType => ({
    type: DELETE_POST,
    payload: id
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction>

export const addPost = (text: string): ThunkType => async dispatch => {
    dispatch(setNewPost(text))
    dispatch(reset('postForm'))
}

type LikePostActionType = {
    type: typeof LIKE_POST
    payload: number
}

export const likePost = (id: number): LikePostActionType => ({
    type: LIKE_POST,
    payload: id
})

type IsFetchingAvatarActionType = {
    type: typeof SET_IS_FETCHING_AVATAR
    payload: boolean
}

const setIsFetchingAvatar = (val: boolean): IsFetchingAvatarActionType => ({
    type: SET_IS_FETCHING_AVATAR,
    payload: val
})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: ProfileType
}

const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    payload: profile
})

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

type SetStatusSuccessActionType = {
    type: typeof SET_USER_STATUS
    payload: string
}

const setStatusSuccess = (status: string): SetStatusSuccessActionType => ({
    type: SET_USER_STATUS,
    payload: status
})

export const getUserStatus = (userId: number): ThunkType => async dispatch => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatusSuccess(response.data))
}

type SetChangeStatusResponseActionType = {
    type: typeof SET_CHANGE_STATUS_RESULT_CODE
    payload: boolean | undefined
}

const setChangeStatusResponse = (result: boolean | undefined): SetChangeStatusResponseActionType => ({
    type: SET_CHANGE_STATUS_RESULT_CODE,
    payload: result,
})

export const updateUserStatus = (status: string): ThunkType => async dispatch => {
    try {
        const response = await profileAPI.setStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setChangeStatusResponse(true))
            dispatch(setStatusSuccess(status))
        } else {
            dispatch(setChangeStatusResponse(false))
        }
    } catch (e) {
        dispatch(setChangeStatusResponse(false))
        console.warn(e)
    } finally {
        setTimeout(function () {
            dispatch(setChangeStatusResponse(undefined))
        }, 3000)
    }
}

type SetAvatarSuccessActionType = {
    type: typeof SET_PHOTO_SUCCESS
    payload: object
}

const setAvatarSuccess = (avatar: object): SetAvatarSuccessActionType => ({
    type: SET_PHOTO_SUCCESS,
    payload: avatar
})

type SetChangeAvatarResponseActionType = {
    type: typeof SET_AVATAR_RESULT_CODE
    payload: boolean | undefined
}

const setChangeAvatarResponse = (result: boolean | undefined): SetChangeAvatarResponseActionType => ({
    type: SET_AVATAR_RESULT_CODE,
    payload: result,
})
type SetSaveProfileResultActionType = {
    type: typeof SET_SAVE_PROFILE_RESULT
    payload: boolean
}

const setSaveProfileResult = (result: boolean): SetSaveProfileResultActionType => ({
    type: SET_SAVE_PROFILE_RESULT,
    payload: result
})

export const updateUserAvatar = (avatar: PhotosType): ThunkType => async dispatch => {
    dispatch(setIsFetchingAvatar(true))
    try {
        const response = await profileAPI.setAvatar(avatar)
        if (response.data.resultCode === 0) {
            dispatch(setChangeAvatarResponse(true))
            dispatch(setAvatarSuccess(response.data.data.photos))
        }
    } catch (e) {
        dispatch(setChangeAvatarResponse(false))
        console.warn(e)
    } finally {
        dispatch(setIsFetchingAvatar(false))
        setTimeout(function () {
            dispatch(setChangeAvatarResponse(undefined))
        }, 3000)
    }
}

export const saveProfile = (profileData: ProfileType): ThunkType => async dispatch => {
    const response = await profileAPI.saveProfile(profileData)

    if (response.data.resultCode === 0) {
        dispatch(setUserProfile(profileData))
        dispatch(setSaveProfileResult(true))
    } else {
        const contactTitle = response.data.messages[0].split(/[( -> )]/)
        const splitTitle = contactTitle[contactTitle.length - 2].toLowerCase()

        const errorObject = {
            'contacts': {
                [splitTitle]: response.data.messages[0]
            }
        }

        dispatch(stopSubmit('editProfile', errorObject))
    }
}

export default profileReducer