import { FormAction, reset } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionTypes } from '../redux-store'

type TodoType = {
    id: number
    text: string
    complete: boolean
}

export type TodoFilterTypes = 'ALL_TODOS' | 'COMPLETE_TODOS' | 'ACTIVE_TODOS'

const initialState = {
    todos: [] as Array<TodoType>,
    filter: 'ALL_TODOS' as TodoFilterTypes,
    toggleAllComplete: true as boolean
}

type InitialStateType = typeof initialState
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction>
type ActionTypes = InferActionTypes<typeof actions>

const todoListReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'TODOS/ADD_TODO':
            debugger
            return {
                ...state,
                todos: [{ id: state.todos.length, text: action.payload, complete: false }, ...state.todos],
            }

        case 'TODOS/UPDATE_TODO_STATUS':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload
                    ? { ...todo, complete: !todo.complete }
                    : todo)
            }

        case 'TODOS/FILTER_TODO':
            return {
                ...state,
                filter: action.payload
            }

        case 'TODOS/DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            }

        case 'TODOS/DELETE_ALL_COMPLETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.complete),
            }

        case 'TODOS/TOGGLE_ALL_TODO':
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

export const actions = {
    setNewTodo: (text: string) => ({
        type: 'TODOS/ADD_TODO',
        payload: text
    } as const),
    deleteAllCompleteTodo: () => ({
        type: 'TODOS/DELETE_ALL_COMPLETE_TODO'
    } as const),
    toggleAllTodo: () => ({
        type: 'TODOS/TOGGLE_ALL_TODO'
    } as const),
    deleteTodo: (id: number) => ({
        type: 'TODOS/DELETE_TODO',
        payload: id
    } as const),
    updateTodoStatus: (id: number) => ({
        type: 'TODOS/UPDATE_TODO_STATUS',
        payload: id
    } as const),
    filterTodo: (filter: TodoFilterTypes) => ({
        type: 'TODOS/FILTER_TODO',
        payload: filter
    } as const)
}

export const addTodo = ({ text }: TodoType): ThunkType => async dispatch => {
    dispatch(actions.setNewTodo(text))
    dispatch(reset('todoForm'))
}

export default todoListReducer