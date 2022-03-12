import { FormAction, reset } from 'redux-form'
import {DialogType, MessageType} from "../../types/types";
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../redux-store'

const ADD_MESSAGE = 'DIALOGS/ADD_MESSAGE'

const initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

type ActionTypes = SetNewMessageActionType

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length, message: action.payload}]
            }
        default:
            return state
    }
}

type SetNewMessageActionType = {
    type: typeof ADD_MESSAGE
    payload: string
}

const setNewMessage = (message: string): SetNewMessageActionType => ({
    type: ADD_MESSAGE,
    payload: message
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction>

export const addNewMessage = (message: string): ThunkType => async (dispatch) => {
    dispatch(setNewMessage(message))
    dispatch(reset('messageForm'))
}

export default dialogsReducer