import ToDo from './ToDo'
import { TodoType } from '../../types/types'
import { FC, MouseEvent } from 'react'
import TodoReduxForm from './TodoForm'

type PropsType = {
    addTodo: (text: string) => void
    handleFilter: (e: MouseEvent<HTMLButtonElement>) => void
    todos: Array<TodoType>
    updateTodoStatus: (id: number) => void
    toggleAllComplete: boolean
    deleteTodo: (id: number) => void
    toggleAllTodo: () => void
    deleteAllCompleteTodo: () => void
    activeTodos: number
    completeTodos: boolean
    todosLength: boolean | number
}

const ToDoList: FC<PropsType> = props => {

    const addNewTodo = (values: TodoType) => {
        props.addTodo(values.text)
    }

    return (
        <>
            <TodoReduxForm onSubmit={addNewTodo}/>
            <hr/>
            {
                props.todos.map(t => <ToDo
                    key={t.id} id={t.id} text={t.text}
                    completeToggle={t.complete}
                    handleComplete={() => props.updateTodoStatus(t.id)}
                    handleDelete={() => props.deleteTodo(t.id)}
                />)
            }
            <p className="todosLeft">Активных
                заметок{props.activeTodos > 0 ? (': ' + props.activeTodos) : ' нет'}</p>
            <div className="filterButtons">
                <div className="row">
                    <div className="col-auto">
                        <button className="btn btn-secondary" onClick={props.handleFilter} value="ALL_TODOS">Показать
                            все
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-secondary" onClick={props.handleFilter} value="ACTIVE_TODOS"
                                disabled={!props.activeTodos}>Показать
                            активные
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-secondary" onClick={props.handleFilter}
                                value="COMPLETE_TODOS" disabled={!props.completeTodos}>Показать выполненные
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {props.todosLength
                    ? <button className="btn btn-secondary my-3" onClick={() => props.toggleAllTodo()}>Отметить
                        все {`${props.toggleAllComplete}`}</button>
                    : ''}
            </div>
            <div>
                {props.completeTodos
                    ? <button className="btn btn-secondary" onClick={() => props.deleteAllCompleteTodo()}>Удалить все
                        выполненные</button>
                    : ''}
            </div>
        </>
    )
}

export default ToDoList