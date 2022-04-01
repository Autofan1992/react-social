import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsAuth } from '../redux/selectors/auth-selectors'
import { AppStateType } from '../redux/redux-store'
import { FC } from 'react'

const mapStateToProps = (state: AppStateType) => ({
    isAuth: getIsAuth(state)
})

type PropsType = {
    isAuth: boolean
}

const withAuthRedirect = <WCP, >(WrappedComponent: FC<WCP>) => {
    const ConnectedComponent = (props: PropsType) => {
        return !props.isAuth
            ? <Redirect to={'login'}/>
            : <WrappedComponent {...props as unknown as WCP}/>
    }

    return connect<PropsType, {}, WCP, AppStateType>(mapStateToProps)(ConnectedComponent)
}

export default withAuthRedirect