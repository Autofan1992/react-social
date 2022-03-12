import styles from '../Dialogs.module.scss'
import { MessageType } from '../../../types/types'
import { FC } from 'react'

const Message: FC<MessageType> = ({ message }) => {
    return (
        <li className={`${styles.messageBlock} list-group-item`}>
            {message}
        </li>
    )
}

export default Message