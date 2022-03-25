import Header from './Header'
import { logout } from '../../redux/reducers/auth-reducer'
import { connect, ConnectedProps } from 'react-redux'
import { getAuthUserId, getAuthUserLogin, getAuthUserPhoto, getIsAuth } from '../../redux/selectors/auth-selectors'
import { AppStateType } from '../../redux/redux-store'
import React, { FC } from 'react'

const HeaderContainer: FC<PropsFromRedux> = ({ logout, ...props }) => {
    const handleLogout = () => logout()

    return (
        <Header {...props} handleLogout={handleLogout}/>
    )
}

const mapState = (state: AppStateType) => ({
    userLogin: getAuthUserLogin(state),
    userId: getAuthUserId(state),
    userPhoto: getAuthUserPhoto(state),
    isAuth: getIsAuth(state)
})

const mapDispatch = {
    logout
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(HeaderContainer)