import ToDoList from './ToDoList'
import { connect, ConnectedProps } from 'react-redux'
import { actions, addTodo, TodoFilterTypes } from '../../redux/reducers/todoList-reducer'
import styles from './ToDo.module.scss'
import {
    getActiveTodosCount,
    getCompleteTodosCount,
    getTodos, getToggleAllComplete, getVisibilityFilter,
    getVisibleTodos
} from '../../redux/selectors/todoList-selectors'
import { AppStateType } from '../../redux/redux-store'
import { FC } from 'react'

const ToDoListContainer: FC<PropsFromRedux> = (
    {
        addTodo,
        todos,
        someActiveTodos,
        someCompleteTodos,
        filterTodo,
        deleteAllCompleteTodo,
        toggleAllTodo,
        updateTodoStatus,
        deleteTodo,
        toggleAllComplete
    }) => {

    const handleFilter = (filter: TodoFilterTypes) => {
        filterTodo(filter)
    }

    return (
        <div className={styles.ToDoWrapper}>
            <ToDoList
                addTodo={addTodo}
                handleFilter={handleFilter}
                updateTodoStatus={updateTodoStatus}
                toggleAllComplete={toggleAllComplete}
                deleteTodo={deleteTodo}
                toggleAllTodo={toggleAllTodo}
                deleteAllCompleteTodo={deleteAllCompleteTodo}
                todos={todos}
                activeTodos={someActiveTodos}
                completeTodos={someCompleteTodos}
            />
        </div>
    )
}


const mapStateToProps = (state: AppStateType) => {
    return {
        todoList: getTodos(state),
        todos: getVisibleTodos(state),
        filter: getVisibilityFilter(state),
        someActiveTodos: getActiveTodosCount(state),
        someCompleteTodos: getCompleteTodosCount(state),
        toggleAllComplete: getToggleAllComplete(state),
    }
}

const mapDispatchToProps = {
    addTodo,
    deleteAllCompleteTodo: actions.deleteAllCompleteTodo,
    toggleAllTodo: actions.toggleAllTodo,
    deleteTodo: actions.deleteTodo,
    updateTodoStatus: actions.updateTodoStatus,
    filterTodo: actions.filterTodo
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ToDoListContainer)