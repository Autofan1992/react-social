import styles from './Users.module.scss'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../images/user.svg'
import { UserType } from '../../types/types'
import { FC } from 'react'

type PropsType = {
    user: UserType
    toggleFollowing: (userID: number, followed: boolean) => void
    followingInProgress: Array<number>
}

const User: FC<PropsType> = ({ user, toggleFollowing, followingInProgress }) => {
    return (
        <div key={user.id} className={styles.userBlock}>
            <div className={styles.userLeft}>
                <div>
                    <NavLink to={'/profile/' + user.id} className={styles.profileAvatar}>
                        <img src={user.photos.small ? user.photos.small : userPhoto} alt=""/>
                    </NavLink>
                </div>
                <div>
                    <button
                        className="btn btn-info"
                        onClick={() => toggleFollowing(user.id, user.followed)}
                        disabled={followingInProgress.some(id => id === user.id)}
                    >
                        {!user.followed ? 'Подписаться' : 'Отписаться'}
                    </button>
                </div>
            </div>
            <div className={styles.userRight}>
                <div className={styles.userItem}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
            </div>
        </div>

    )
}

export default User