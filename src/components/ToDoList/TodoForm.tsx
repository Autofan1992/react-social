import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { TodoType } from '../../types/types'
import { Input } from '../common/FormControls/FormControls'
import { minLength, requiredField } from '../../redux/utilities/validators/validators'
import { FC } from 'react'

const minLength2 = minLength(2)

const TodoForm: FC<InjectedFormProps<TodoType>> = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="row">
                <div className="col">
                    <Field
                        name={'text'}
                        component={Input}
                        placeholder="Введите заметку"
                        validate={[requiredField, minLength2]}
                    />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary px-5">Добавить заметку</button>
                </div>
            </div>
        </form>
    )
}
const TodoReduxForm = reduxForm<TodoType>({ form: 'todoForm' })(TodoForm)

export default TodoReduxForm