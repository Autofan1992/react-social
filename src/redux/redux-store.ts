import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import profileReducer from './reducers/profile-reducer'
import dialogsReducer from './reducers/dialogs-reducer'
import sidebarReducer from './reducers/sidebar-reducer'
import todoListReducer from './reducers/todoList-reducer'
import usersReducer from './reducers/users-reducer'
import authReducer from './reducers/auth-reducer'
import weatherReducer from './reducers/weather-reducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './reducers/app-reducer'
import budgetsReducer from './reducers/budgets-reducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    todoList: todoListReducer,
    usersPage: usersReducer,
    auth: authReducer,
    weatherPage: weatherReducer,
    form: formReducer,
    budgetsPage: budgetsReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer> // globalState: AppStateType => AppStateType
export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<AT extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, AT>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store