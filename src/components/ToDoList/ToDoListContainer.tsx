import ToDoList from './ToDoList'
import { connect, ConnectedProps } from 'react-redux'
import {
    addTodo,
    deleteAllCompleteTodo,
    deleteTodo,
    filterTodo,
    toggleAllTodo,
    updateTodoStatus
} from '../../redux/reducers/todoList-reducer'
import styles from './ToDo.module.scss'
import { getCompleteTodosCount, getActiveTodosCount, getVisibleTodos } from '../../redux/selectors/todoList-selectors'
import { AppStateType } from '../../redux/redux-store'
import { FC, MouseEvent } from 'react'

const ToDoListContainer: FC<PropsFromRedux> = props => {
    const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
        props.filterTodo(e.currentTarget.value)
    }

    return (
        <div className={styles.ToDoWrapper}>
            <ToDoList
                addTodo={props.addTodo}
                handleFilter={handleFilter}
                updateTodoStatus={props.updateTodoStatus}
                toggleAllComplete={props.toggleAllComplete}
                deleteTodo={props.deleteTodo}
                toggleAllTodo={props.toggleAllTodo}
                deleteAllCompleteTodo={props.deleteAllCompleteTodo}
                todos={props.todos}
                activeTodos={props.someActiveTodos}
                completeTodos={props.someCompleteTodos}
                todosLength={props.todosLength}
            />
        </div>
    )
}


const mapStateToProps = (state: AppStateType) => {
    return {
        todoList: state.todoList,
        newText: state.todoList.newText,
        todos: getVisibleTodos(state),
        filter: state.todoList.filter,
        someActiveTodos: getActiveTodosCount(state),
        someCompleteTodos: getCompleteTodosCount(state),
        toggleAllComplete: state.todoList.toggleAllComplete,
        todosLength: state.todoList.todos.length
    }
}

const mapDispatchToProps = {
    addTodo,
    deleteAllCompleteTodo,
    toggleAllTodo,
    deleteTodo,
    updateTodoStatus,
    filterTodo
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ToDoListContainer)