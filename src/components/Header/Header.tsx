import styles from './Header.module.scss'
import logo from '../../images/logo.svg'
import user from '../../images/user.svg'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

type PropsType = {
    isAuth: boolean
    userId: number | null
    userPhoto: string | null
    userLogin: string | null
    handleLogout: () => void
}

const Header: FC<PropsType> = props => {
    const {
        isAuth,
        userId,
        userPhoto,
        userLogin,
        handleLogout
    } = props
    return (
        <header className={styles.header}>
            <div className={styles.logoBlock}>
                <img src={logo} alt=""/>
            </div>
            <div className={styles.loginBlock}>
                {isAuth
                    ? <div className={styles.userInfo}>
                        <NavLink to={`/profile/${userId}`}>
                            <div className={styles.avatar}>
                                <img src={userPhoto ? userPhoto : user} alt="avatar"/>
                            </div>
                        </NavLink>
                        <div className="text-center">
                            <p className="mb-0">{userLogin}</p>
                            <button onClick={handleLogout} className="btn btn-link p-0">Logout</button>
                        </div>
                    </div>
                    : <NavLink className="btn btn-link" to="/login">Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header