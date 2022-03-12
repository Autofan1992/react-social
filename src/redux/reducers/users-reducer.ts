import { userAPI } from '../../api/api'
import { UserType } from '../../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../redux-store'

const TOGGLE_FOLLOW_USER = 'USERS/TOGGLE_FOLLOW_USER'
const SET_USERS = 'USERS/SET_USERS'
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'USERS/SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'USERS/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'USERS/TOGGLE_FOLLOWING_PROGRESS'

const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id's
}

export type InitialStateType = typeof initialState

type ActionTypes =
    ToggleFollowActionType
    | SetUsersActionType
    | SetTotalUsersCountActionType
    | SetCurrentPageActionType
    | ToggleIsFetchingActionType
    | ToggleFollowingProgressActionType

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case TOGGLE_FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload
                    ? { ...u, followed: !u.followed } : u)
            }
        case SET_USERS:
            return {
                ...state, users: action.payload
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state, totalUsersCount: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.payload
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.payload
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.payload.isFollowing
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            }
        default:
            return state
    }
}

type ToggleFollowActionType = {
    type: typeof TOGGLE_FOLLOW_USER
    payload: number
}
const setToggleFollow = (userId: number): ToggleFollowActionType => ({ type: TOGGLE_FOLLOW_USER, payload: userId })

type SetUsersActionType = {
    type: typeof SET_USERS
    payload: Array<UserType>
}
const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, payload: users })

type SetTotalUsersCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    payload: number
}
const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: SET_USERS_TOTAL_COUNT,
    payload: totalCount
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    payload: number
}
const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    payload: currentPage
})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    payload: boolean
}
const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    payload: isFetching
})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS
    payload: {
        isFollowing: boolean
        userId: number
    }
}
const toggleFollowingProgress = (isFollowing: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    payload: {
        isFollowing,
        userId
    }
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const requestUsers = (pageNumber: number, pageSize: number): ThunkType => async dispatch => {
    dispatch(toggleIsFetching(true))

    const response = await userAPI.getUsers(pageNumber, pageSize)
    dispatch(setUsers(response.data.items))
    dispatch(setTotalUsersCount(response.data.totalCount))
    dispatch(setCurrentPage(pageNumber))
    dispatch(toggleIsFetching(false))
}

export const followUserToggle = (userId: number, followed: boolean): ThunkType => async dispatch => {
    const followFn = !followed ? userAPI.followUserRequest : userAPI.unfollowUserRequest
    dispatch(toggleFollowingProgress(true, userId))

    const response = await followFn(userId)
    if (response.data.resultCode === 0) {
        dispatch(setToggleFollow(userId))
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export default usersReducer