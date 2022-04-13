import { getAuthUserData } from './auth-reducer'
import { BaseThunkType, InferActionTypes } from '../redux-store'

const initialState = {
    initialized: false as boolean,
    requestSuccess: undefined as boolean | undefined
}

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }
        case 'APP/SET_REQUEST_SUCCESS':
            return {
                ...state,
                requestSuccess: action.payload
            }
        default:
            return state
    }
}

export const appActions = {
    setInitializingSuccess: () => ({ type: 'APP/SET_INITIALIZED' } as const),
    setRequestSuccess: (requestSuccess: boolean | undefined) => ({ type: 'APP/SET_REQUEST_SUCCESS', payload: requestSuccess } as const)
}

export const setRequestSuccessToggle = (requestSuccess: boolean): ThunkType => async dispatch => {
    dispatch(appActions.setRequestSuccess(requestSuccess))
    setTimeout(() => {
        dispatch(appActions.setRequestSuccess(undefined))
    }, 3000)
}

export const initializeApp = (): ThunkType => async dispatch => {
    await dispatch(getAuthUserData())
    dispatch(appActions.setInitializingSuccess())
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof appActions>
type ThunkType = BaseThunkType<ActionTypes>

export default appReducer