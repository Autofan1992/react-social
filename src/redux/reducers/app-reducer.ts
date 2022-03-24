import { getAuthUserData } from './auth-reducer'
import { ThunkAction } from 'redux-thunk'
import { InferActionCreators } from '../../types/types'

const SET_INITIALIZED = 'APP/SET_INITIALIZED'

const initialState = {
    initialized: false as boolean
}

type InitialStateType = typeof initialState

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

type ActionTypes = ReturnType<InferActionCreators<typeof actions>>

const actions = {
    setInitializingSuccess: () => ({ type: SET_INITIALIZED })
}

export const initializeApp = (): ThunkAction<Promise<void>, InitialStateType, unknown, ActionTypes> => async dispatch => {
    await getAuthUserData()
    dispatch(actions.setInitializingSuccess())
}


export default appReducer