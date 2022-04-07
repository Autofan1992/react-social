import Header from './Header'
import { logout } from '../../redux/reducers/auth-reducer'
import { connect, ConnectedProps } from 'react-redux'
import { getAuthUserId, getAuthUserLogin, getAuthUserPhoto, getIsAuth } from '../../redux/selectors/auth-selectors'
import { AppStateType } from '../../redux/redux-store'
import React from 'react'

const HeaderContainer = ({ logout, ...props }: PropsFromRedux) => {
    return (
        <Header {...props} handleLogout={logout}/>
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

export default connector(HeaderContainer)

type PropsFromRedux = ConnectedProps<typeof connector>