import {createSelector} from 'reselect'
import { AppStateType } from '../redux-store'

export const getVisibilityFilter = (state: AppStateType) => state.todoList.filter
export const getTodos = (state: AppStateType) => state.todoList.todos
export const getToggleAllComplete = (state: AppStateType) => state.todoList.toggleAllComplete

export const getVisibleTodos = createSelector(
    getVisibilityFilter, getTodos,
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case 'ALL_TODOS':
                return todos
            case 'COMPLETE_TODOS':
                return todos.filter(t => t.complete)
            case 'ACTIVE_TODOS':
                return todos.filter(t => !t.complete)
            default: return todos
        }
    }
)

export const getActiveTodosCount = createSelector(
    getTodos,
    (todos) => {
        return todos.filter(t => !t.complete).length
    }
)

export const getCompleteTodosCount = createSelector(
    getTodos,
    (todos) => {
        return todos.some(t => t.complete)
    }
)