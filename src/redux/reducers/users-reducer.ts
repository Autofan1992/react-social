import { userAPI } from '../../api/api'
import { UserType } from '../../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionTypes } from '../redux-store'

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

type InitialStateType = typeof initialState
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ActionTypes = InferActionTypes<typeof actions>

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

export const actions = {
    setToggleFollow: (userId: number) => ({ type: TOGGLE_FOLLOW_USER, payload: userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, payload: users } as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: SET_USERS_TOTAL_COUNT,
        payload: totalCount
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: SET_CURRENT_PAGE,
        payload: currentPage
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: TOGGLE_IS_FETCHING,
        payload: isFetching
    } as const),
    toggleFollowingProgress: (isFollowing: boolean, userId: number) => ({
        type: TOGGLE_FOLLOWING_PROGRESS,
        payload: {
            isFollowing,
            userId
        }
    } as const)
}

export const requestUsers = (pageNumber: number, pageSize: number): ThunkType => async dispatch => {
    dispatch(actions.toggleIsFetching(true))

    const data = await userAPI.getUsers(pageNumber, pageSize)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.setCurrentPage(pageNumber))
    dispatch(actions.toggleIsFetching(false))
}

export const followUserToggle = (userId: number, followed: boolean): ThunkType => async dispatch => {
    const followFn = !followed ? userAPI.followUserRequest : userAPI.unfollowUserRequest
    dispatch(actions.toggleFollowingProgress(true, userId))

    const data = await followFn(userId)
    if (data.resultCode === 0) {
        dispatch(actions.setToggleFollow(userId))
        dispatch(actions.toggleFollowingProgress(false, userId))
    }
}

export default usersReducer