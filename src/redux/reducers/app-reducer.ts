import { getAuthUserData } from './auth-reducer'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionTypes } from '../redux-store'

const initialState = {
    initialized: false as boolean
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

const actions = {
    setInitializingSuccess: () => ({ type: 'APP/SET_INITIALIZED' } as const)
}

export const initializeApp = (): ThunkType => async dispatch => {
    await dispatch(getAuthUserData())
    dispatch(actions.setInitializingSuccess())
}

export default appReducer