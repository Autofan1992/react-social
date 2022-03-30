import { getAuthUserData } from './auth-reducer'
import { BaseThunkType, InferActionTypes } from '../redux-store'

const initialState = {
    initialized: false as boolean
}

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

type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

export default appReducer