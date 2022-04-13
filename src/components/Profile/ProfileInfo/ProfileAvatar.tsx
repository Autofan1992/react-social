import styles from './ProfileInfo.module.scss'
import Preloader from '../../common/Preloader/Preloader'
import { ChangeEvent, FC } from 'react'
import userPhoto from '../../../images/user.svg'
import { Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'

type PropsType = {
    isOwner: boolean
    avatar: string | null
    savePhoto: (avatar: File) => void
    isFetchingAvatar: boolean
}

const ProfileAvatar: FC<PropsType> = ({ isOwner, avatar, savePhoto, isFetchingAvatar }) => {
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        savePhoto(e.target.files[0])
    }

    return (
        <div className={styles.avatar}>
            {isFetchingAvatar && <Preloader/>}
            <label style={{ display: 'block' }}>
                <img src={avatar ?? userPhoto} alt="avatar"/>
                {isOwner &&
                    <>
                        <Input type='file' onChange={handleAvatarChange} style={{ display: 'none' }}/>
                        <div className={`${styles.icon} ant-typography-edit`}>
                            <EditOutlined/>
                        </div>
                    </>
                }
            </label>
        </div>
    )
}

export default ProfileAvatar