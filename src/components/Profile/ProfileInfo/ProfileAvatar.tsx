import styles from './ProfileInfo.module.scss'
import Preloader from '../../common/preloader/Preloader'
import { ChangeEvent, FC } from 'react'
import userPhoto from '../../../images/user.svg'

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
            <img src={avatar ?? userPhoto} alt="avatar"/>
            {isOwner &&
                <label className="text-white">
                    <input type={'file'} onChange={handleAvatarChange}/>
                </label>}
        </div>
    )
}

export default ProfileAvatar