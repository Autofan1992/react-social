import { FormAction, reset } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../redux-store'

const ADD_TODO = 'TODOS/ADD_TODO'
const DELETE_TODO = 'TODOS/DELETE_TODO'
const DELETE_ALL_COMPLETE_TODO = 'TODOS/DELETE_ALL_COMPLETE_TODO'
const TOGGLE_ALL_TODO = 'TODOS/TOGGLE_ALL_TODO'
const UPDATE_TODO_STATUS = 'TODOS/UPDATE_TODO_STATUS'
const FILTER_TODO = 'TODOS/FILTER_TODO'

type TodoType = {
    id: number
    text: string
    complete: boolean
}

const initialState = {
    newText: '' as string,
    todos: [] as Array<TodoType>,
    filter: 'all' as string,
    toggleAllComplete: true as boolean
}

export type InitialStateType = typeof initialState

const todoListReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                newText: '',
                todos: [{ id: state.todos.length, text: action.payload, complete: false }, ...state.todos],
            }

        case UPDATE_TODO_STATUS:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload
                    ? { ...todo, complete: !todo.complete } : todo)
            }

        case FILTER_TODO:
            return {
                ...state,
                filter: action.payload
            }

        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            }

        case DELETE_ALL_COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.complete),
            }

        case TOGGLE_ALL_TODO:
            return {
                ...state,
                toggleAllComplete: !state.toggleAllComplete,
                todos: state.todos.map((todo) => {
                    return {
                        ...todo,
                        complete: state.toggleAllComplete
                    }
                })
            }

        default:
            return state
    }
}

type ActionTypes =
    SetNewTodoActionType |
    DeleteAllCompleteTodoActionType |
    ToggleAllTodoActionType |
    DeleteTodoActionType |
    UpdateTodoStatusActionType |
    FilterTodoActionType

type SetNewTodoActionType = {
    type: typeof ADD_TODO
    payload: string
}

const setNewTodo = (text: string): SetNewTodoActionType => ({
    type: ADD_TODO,
    payload: text
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction>

export const addTodo = (text: string): ThunkType => async dispatch => {
    dispatch(setNewTodo(text))
    dispatch(reset('todoForm'))
}

type DeleteAllCompleteTodoActionType = {
    type: typeof DELETE_ALL_COMPLETE_TODO
}

export const deleteAllCompleteTodo = (): DeleteAllCompleteTodoActionType => ({
    type: DELETE_ALL_COMPLETE_TODO
})

type ToggleAllTodoActionType = {
    type: typeof TOGGLE_ALL_TODO
}

export const toggleAllTodo = (): ToggleAllTodoActionType => ({
    type: TOGGLE_ALL_TODO
})

type DeleteTodoActionType = {
    type: typeof DELETE_TODO
    payload: number
}

export const deleteTodo = (id: number): DeleteTodoActionType => ({
    type: DELETE_TODO,
    payload: id
})

type UpdateTodoStatusActionType = {
    type: typeof UPDATE_TODO_STATUS
    payload: number
}

export const updateTodoStatus = (id: number): UpdateTodoStatusActionType => ({
    type: UPDATE_TODO_STATUS,
    payload: id
})

type FilterTodoActionType = {
    type: typeof FILTER_TODO
    payload: string
}

export const filterTodo = (filter: string): FilterTodoActionType => ({
    type: FILTER_TODO,
    payload: filter
})

export default todoListReducer