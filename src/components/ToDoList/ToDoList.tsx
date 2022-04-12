import ToDo from './ToDo'
import { TodoType } from '../../types/types'
import { FC } from 'react'
import TodoReduxForm from './TodoForm'
import { TodoFilterTypes } from '../../redux/reducers/todoList-reducer'

type PropsType = {
    addTodo: (text: string) => void
    handleFilter: (filter: TodoFilterTypes) => void
    todos: Array<TodoType>
    updateTodoStatus: (id: number) => void
    toggleAllComplete: boolean
    deleteTodo: (id: number) => void
    toggleAllTodo: () => void
    deleteAllCompleteTodo: () => void
    activeTodos: number
    completeTodos: boolean
}

const ToDoList: FC<PropsType> = (
    {
        addTodo,
        todos,
        activeTodos,
        completeTodos,
        handleFilter,
        deleteAllCompleteTodo,
        toggleAllTodo,
        updateTodoStatus,
        deleteTodo,
        toggleAllComplete
    }) => {

    return (
        <>
            <TodoReduxForm onSubmit={addTodo}/>
            <hr/>
            {todos.map(t =>
                <ToDo
                    key={t.id} id={t.id} text={t.text}
                    completeToggle={t.complete}
                    handleComplete={() => updateTodoStatus(t.id)}
                    handleDelete={() => deleteTodo(t.id)}
                />)}
            <p className="todosLeft">Active todos: {`${activeTodos ?? 'not found'}`}</p>
            <div className="filterButtons">
                <div className="row">
                    <div className="col-auto">
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleFilter('ALL_TODOS')}>Show all todos
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleFilter('ACTIVE_TODOS')}
                            disabled={!activeTodos}>Show active todos
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleFilter('COMPLETE_TODOS')}
                            disabled={!completeTodos}>Show completed todos
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {todos.length
                    ? <button
                        className="btn btn-secondary my-3"
                        onClick={() => toggleAllTodo()}>Toggle all complete {`${toggleAllComplete}`}
                    </button>
                    : ''}
            </div>
            <div>
                {completeTodos
                    ? <button
                        className="btn btn-secondary"
                        onClick={() => deleteAllCompleteTodo()}>Delete all complete todos
                    </button>
                    : ''}
            </div>
        </>
    )
}

export default ToDoList