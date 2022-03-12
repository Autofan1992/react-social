import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Textarea } from '../../common/FormControls/FormControls'
import { maxLength, minLength, requiredField } from '../../../redux/utilities/validators/validators'
import { MessageType } from '../../../types/types'
import { FC } from 'react'

const maxLength500 = maxLength(500)
const minLength2 = minLength(2)

const AddMessageForm: FC<InjectedFormProps<MessageType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <Field
                    placeholder="Введите ваше сообщение"
                    name={'message'}
                    component={Textarea}
                    validate={[requiredField, minLength2, maxLength500]}
                />
            </div>
            <button className="btn btn-primary mt-2">Отправить сообщение</button>
        </form>
    )
}

const MessageReduxForm = reduxForm<MessageType>({form: 'messageForm'})(AddMessageForm)

export default MessageReduxForm