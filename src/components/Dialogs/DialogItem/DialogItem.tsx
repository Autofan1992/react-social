import styles from '../Dialogs.module.scss'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = ({ id, name }) => {
    return (
        <div className={styles.dialogItem}>
            <NavLink to={`/dialogs/${id}`} activeClassName={styles.activeDialog}>{name}</NavLink>
        </div>
    )
}

export default DialogItem