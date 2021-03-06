import { AppStateType } from '../redux-store'

export const getAppInit = (state: AppStateType) => {
    return state.app.initialized
}

export const getRequestSuccess = (state: AppStateType) => {
    return state.app.requestSuccess
}