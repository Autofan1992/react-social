import { AppStateType } from '../redux-store'

export const getDialogs = (state: AppStateType) => state.dialogsPage.dialogs
export const getMessages = (state: AppStateType) => state.dialogsPage.messages