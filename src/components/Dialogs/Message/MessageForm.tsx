import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, ReduxTextarea } from '../../common/FormControls/FormControls'
import { maxLength, minLength, requiredField } from '../../../redux/utilities/validators/validators'
import { MessageType } from '../../../types/types'

const maxLength500 = maxLength(500)
const minLength2 = minLength(2)

type MessageFormInputNamesKeys = keyof MessageType

const AddMessageForm = ({ handleSubmit }: InjectedFormProps<MessageType>) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                {createField<MessageFormInputNamesKeys>('Введите ваше сообщение', 'message', [requiredField, minLength2, maxLength500], ReduxTextarea)}
            </div>
            <button className="btn btn-primary mt-2">Отправить сообщение</button>
        </form>
    )
}

const MessageReduxForm = reduxForm<MessageType>({ form: 'messageForm' })(AddMessageForm)

export default MessageReduxForm