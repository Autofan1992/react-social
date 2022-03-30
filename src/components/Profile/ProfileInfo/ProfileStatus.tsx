import { ChangeEvent, useEffect, useState } from 'react'
import styles from './ProfileInfo.module.scss'

type PropsType = {
    status: string
    statusChangeResult: boolean
    updateUserStatus: (status: string) => void
    isOwner: boolean
}

const ProfileStatus = ({ status, statusChangeResult, updateUserStatus, isOwner }: PropsType) => {
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
                            Something went wrong
                        </div>
                        : <div className="alert alert-success" role="alert">
                            Status successfully changed
                        </div>}
                </div>}

            <div style={{ display: 'flex' }}>
                <p>Status:&nbsp;</p>
                <div className={styles.statusBlock}>
                    <p className="mb-0">{status}</p>
                </div>
                {isOwner &&
                    <button className="btn-sm" style={{ marginLeft: '.5rem' }} onClick={handleEditMode}>Change</button>}
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