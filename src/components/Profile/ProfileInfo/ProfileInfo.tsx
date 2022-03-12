import styles from './ProfileInfo.module.scss'
import Preloader from '../../common/preloader/Preloader'
import profileThumbnailBig from '../../../images/profile-thumbnail-big.jpg'
import ProfileStatus from './ProfileStatus'
import ProfileAvatar from './ProfileAvatar'
import MyPostsContainer from '../MyPosts/MyPostsContainer'
import { ProfileType } from '../../../types/types'
import { FC } from 'react'

type PropsType = {
    profile: ProfileType
    userId: number | null
    isOwner: boolean
    status: string
    updateUserStatus: (status: string) => void
    statusChangeResult: boolean
    updateUserAvatar: (avatar: File) => void
    isFetchingAvatar: boolean
    setEditMode: () => void
}

const ProfileInfo: FC<PropsType> = (
    {
        profile,
        isOwner,
        status,
        updateUserStatus,
        statusChangeResult,
        updateUserAvatar,
        isFetchingAvatar,
        setEditMode
    }) => {

    if (!profile && isOwner) return <Preloader/>

    return (
        <>
            <div className={styles.profileInfo}>
                <div className={styles.thumbImg}>
                    <img src={profileThumbnailBig} alt="thumbnail"/>
                </div>
                <div className={styles.authorInfo}>
                    {isOwner &&
                        <div className="text-end">
                            <button onClick={setEditMode} className="btn btn-link">Изменить профиль</button>
                        </div>
                    }
                    <div className={styles.topInfo}>
                        <ProfileAvatar
                            isOwner={isOwner}
                            avatar={profile.photos.large}
                            savePhoto={updateUserAvatar}
                            isFetchingAvatar={isFetchingAvatar}
                        />
                        <div className={styles.infoBlock}>
                            <ProfileStatus
                                isOwner={isOwner} status={status}
                                statusChangeResult={statusChangeResult}
                                updateUserStatus={updateUserStatus}
                            />
                            <p>
                                <span className="fw-bold">Полное Имя:</span> {profile.fullName}
                            </p>
                            <p>
                            <span
                                className="fw-bold">В поисках работы:</span> {profile.lookingForAJob ? 'Да' : 'Нет'}
                            </p>
                            {profile.lookingForAJob &&
                                <p>
                            <span
                                className="fw-bold">Мои навыки:</span> {profile.lookingForAJobDescription}
                                </p>}
                        </div>
                    </div>
                    <div className={styles.about}>
                        <p><b>Обо мне</b></p>
                        <p>{profile.aboutMe}</p>
                    </div>
                    <div className={styles.contacts}>
                        <p><b>Я в соцсетях:</b></p>
                        {Object.entries(profile.contacts).map(([title, url]) => (
                            url &&
                            <a target="_blank" rel="noreferrer" className={title} key={url} href={url}>{title}</a>
                        ))}
                    </div>
                </div>
            </div>
            <MyPostsContainer/>
        </>
    )
}

export default ProfileInfo