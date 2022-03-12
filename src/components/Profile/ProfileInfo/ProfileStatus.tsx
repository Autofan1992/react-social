import { useState, useEffect, ChangeEvent, FC } from 'react'
import styles from './ProfileInfo.module.scss'

type PropsType = {
    status: string
    statusChangeResult: boolean
    updateUserStatus: (status: string) => void
    isOwner: boolean
}

const ProfileStatus: FC<PropsType> = ({ status, statusChangeResult, updateUserStatus, isOwner }) => {
    const [currentStatus, setStatus] = useState('')
    const [editMode, toggleEditMode] = useState(false)

    useEffect(() => {
        setStatus(status)
    }, [status])

    const handleStatusUpdate = () => {
        toggleEditMode(!editMode)
        if (currentStatus !== status) {
            updateUserStatus(currentStatus)
        }
    }

    const handleEditMode = () => {
        toggleEditMode(!editMode)
    }

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    return (
        <div className={styles.profileStatus}>
            {statusChangeResult !== undefined &&
                <div>
                    {!statusChangeResult
                        ? <div className="alert alert-danger" role="alert">
                            Что-то пошло не так!
                        </div>
                        : <div className="alert alert-success" role="alert">
                            Статус успешно изменён!
                        </div>}
                </div>}

            <div className="d-flex align-items-center mb-2">
                <p className="fw-bold mb-0">Статус:&nbsp;</p>
                <div className={styles.statusBlock}>
                    <p className="mb-0">{status}</p>
                </div>
                {isOwner &&
                    <button className="btn-sm ms-3" onClick={handleEditMode}>изменить</button>}
            </div>
            {editMode &&
                <div className={styles.forInput}>
                    <input type="text" value={currentStatus}
                           onBlur={handleStatusUpdate}
                           onChange={handleStatusChange} autoFocus={true}
                    />
                </div>}
        </div>
    )
}

export default ProfileStatus