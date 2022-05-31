import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../redux/redux-store'
import React from 'react'
import AppContainer from './AppContainer'

const SocialApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SocialApp