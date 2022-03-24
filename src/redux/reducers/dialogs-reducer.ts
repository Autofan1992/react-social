import { FormAction, reset } from 'redux-form'
import { DialogType, MessageType } from '../../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionTypes } from '../redux-store'

const initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>,
}

type InitialStateType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction>

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS/ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, { id: state.messages.length, message: action.payload }]
            }
        default:
            return state
    }
}

const actions = {
    setNewMessage: (message: string) => ({
        type: 'DIALOGS/ADD_MESSAGE',
        payload: message
    } as const)
}

export const addNewMessage = (message: string): ThunkType => async (dispatch) => {
    dispatch(actions.setNewMessage(message))
    dispatch(reset('messageForm'))
}

export default dialogsReducer