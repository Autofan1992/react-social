import { connect, ConnectedProps } from 'react-redux'
import { login } from '../../redux/reducers/auth-reducer'
import { Redirect } from 'react-router-dom'
import { getCaptchaURL, getIsAuth, getIsFetching } from '../../redux/selectors/auth-selectors'
import { AppStateType } from '../../redux/redux-store'
import LoginReduxForm from './LoginForm'
import Preloader from '../common/Preloader/Preloader'
import { FC } from 'react'

const Login: FC<PropsFromRedux> = ({ login, isAuth, captcha, isFetching }) => {

    if (isFetching) return <Preloader/>
    if (isAuth) return <Redirect to={'profile/14088'}/>

    return (
        <div className="py-3 px-3">
            <h1>Login</h1>
            <LoginReduxForm onSubmit={login} captcha={captcha}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: getIsAuth(state),
    isFetching: getIsFetching(state),
    captcha: getCaptchaURL(state)
})

const MapDispatchToProps = {
    login
}

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapStateToProps, MapDispatchToProps)

export default connector(Login)