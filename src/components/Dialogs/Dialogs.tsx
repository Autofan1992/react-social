import styles from './Dialogs.module.scss'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { DialogType, MessageType } from '../../types/types'
import MessageReduxForm from './Message/MessageForm'
import { FC } from 'react'

type PropTypes = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addNewMessage: (text: string) => void
}

const Dialogs: FC<PropTypes> = ({ dialogs, messages, addNewMessage }) => {
    const addMessage = (values: MessageType) => {
        addNewMessage(values.message)
    }

    return (
        <div className={styles.dsRow}>
            <div className={styles.sidebar}>
                <h2>DIALOGS</h2>
                <div className={styles.dialogs}>
                    {dialogs
                        .map((d) =>
                            <DialogItem key={d.id} name={d.name} id={d.id}/>)
                    }
                </div>
            </div>
            <div className={`${styles.content} p-3`}>
                <ul className="list-group mb-3">
                    {messages
                        .map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
                    }
                </ul>
                <MessageReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    )
}

export default Dialogs