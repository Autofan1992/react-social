import { getAuthUserData } from './auth-reducer'
import { ThunkAction } from 'redux-thunk'

const SET_INITIALIZED = 'APP/SET_INITIALIZED'

const initialState = {
    initialized: false as boolean
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type ActionTypes = InitializingSuccessType

type InitializingSuccessType = {
    type: typeof SET_INITIALIZED
}

const setInitializingSuccess = (): InitializingSuccessType => ({ type: SET_INITIALIZED })

export const initializeApp = (): ThunkAction<Promise<void>, InitialStateType, unknown, ActionTypes> => async dispatch => {
    await getAuthUserData()
    dispatch(setInitializingSuccess())
}


export default appReducer