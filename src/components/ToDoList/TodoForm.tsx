import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { ReduxInput } from '../common/FormControls/FormControls'
import { minLength, requiredField } from '../../redux/utilities/validators/validators'
import { FC } from 'react'

const minLength2 = minLength(2)

const TodoForm: FC<InjectedFormProps<string>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <Field
                        name={'text'}
                        component={ReduxInput}
                        placeholder="Type in some task"
                        validate={[requiredField, minLength2]}
                    />
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary px-5">Add todo</button>
                </div>
            </div>
        </form>
    )
}
const TodoReduxForm = reduxForm<string>({ form: 'todoForm' })(TodoForm)

export default TodoReduxForm