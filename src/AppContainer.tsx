import { AppStateType } from './redux/redux-store'
import { getAppInit } from './redux/selectors/app-selectors'
import { initializeApp } from './redux/reducers/app-reducer'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { FC, FunctionComponent, lazy, Suspense, useEffect } from 'react'
import Preloader from './components/common/preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import ToDoListContainer from './components/ToDoList/ToDoListContainer'
import WeatherContainer from './components/Weather/WeatherContainer'
import BudgetsContainer from './components/Budgets/BudgetsContainer'
import NotFound from './components/common/404/404'
import { getIsAuth } from './redux/selectors/auth-selectors'

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'))

const AppContainer: FC<PropsFromRedux> = ({ initialized, initializeApp, isAuth }) => {
    const handleAllUnhandledErrors = (reason: any) => {
        alert(reason.reason)
    }

    useEffect(() => {
        initializeApp()
        window.addEventListener('unhandledrejection', handleAllUnhandledErrors)
        return function cleanup() {
            window.removeEventListener('unhandledrejection', handleAllUnhandledErrors)
        }
    }, [initializeApp])

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <main className="pageWrapper">
            <div className="container">
                <div className="appWrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="appContent">
                        <Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route exact path="/">
                                    {isAuth ? <Redirect to="/profile"/> : <Login/>}
                                </Route>
                                <Route path="/login" render={() => <Login/>}/>
                                <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                                <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/music" render={() => <Music/>}/>
                                <Route path="/settings" render={() => <Settings/>}/>
                                <Route path="/todolist" render={() => <ToDoListContainer/>}/>
                                <Route path="/users" render={() => <UsersContainer/>}/>
                                <Route path="/weather" render={() => <WeatherContainer/>}/>
                                <Route path="/budgets" render={() => <BudgetsContainer/>}/>
                                <Route path="*" render={() => <NotFound/>}/>
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    )
}

const mapState = (state: AppStateType) => ({
    initialized: getAppInit(state),
    isAuth: getIsAuth(state)
})

const mapDispatch = {
    initializeApp
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<FunctionComponent>(connector, withRouter)(AppContainer)