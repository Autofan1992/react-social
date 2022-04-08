import styles from './ProfileInfo.module.scss'
import Preloader from '../../common/Preloader/Preloader'
import profileThumbnailBig from '../../../images/profile-thumbnail-big.jpg'
import ProfileStatus from './ProfileStatus'
import ProfileAvatar from './ProfileAvatar'
import MyPostsContainer from '../MyPosts/MyPostsContainer'
import { ProfileType } from '../../../types/types'
import { FC } from 'react'
import avatar from '../../../images/user.svg'

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
                            <button onClick={setEditMode} className="btn btn-link">Edit profile</button>
                        </div>
                    }
                    <div className={styles.topInfo}>
                        <ProfileAvatar
                            isOwner={isOwner}
                            avatar={(profile.photos.large ?? profile.photos.small) || avatar}
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
                                <span className="fw-bold">Full name:</span> {profile.fullName}
                            </p>
                            <p>
                            <span
                                className="fw-bold">Looking for a job:</span> {profile.lookingForAJob ? 'Yes' : 'No'}
                            </p>
                            {profile.lookingForAJob &&
                                <p>
                            <span
                                className="fw-bold">My skills:</span> {profile.lookingForAJobDescription}
                                </p>}
                        </div>
                    </div>
                    <div className={styles.about}>
                        <p><b>About me</b></p>
                        <p>{profile.aboutMe}</p>
                    </div>
                    <div className={styles.contacts}>
                        <p><b>My socials:</b></p>
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

export default ProfileInfo