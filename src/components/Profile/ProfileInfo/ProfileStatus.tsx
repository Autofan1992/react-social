import { FC, useEffect, useState } from 'react'
import styles from './ProfileInfo.module.scss'
import { EditOutlined } from '@ant-design/icons'
import Paragraph from 'antd/lib/typography/Paragraph'

const ProfileStatus: FC<PropsType> = ({ status, updateUserStatus, isOwner }) => {
    const [currentStatus, setStatus] = useState(status)

    useEffect(() => {
        setStatus(status)
    }, [status])

    const handleStatusUpdate = (text: string) => {
        if (text !== status) updateUserStatus(text)
    }

    return (
        <>
            <div className={styles.profileStatus}>
                <Paragraph
                    editable={isOwner && {
                        icon: <EditOutlined/>,
                        onChange: (text) => handleStatusUpdate(text)
                    }}
                >{currentStatus}
                </Paragraph>
            </div>
        </>
    )
}

export default ProfileStatus

type PropsType = {
    status: string
    statusChangeResult: boolean
    updateUserStatus: (status: string) => void
    isOwner: boolean
}