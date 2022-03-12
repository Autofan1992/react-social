import { addNewMessage } from '../../redux/reducers/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { getDialogs, getMessages } from '../../redux/selectors/dialogs-selectors'
import { AppStateType } from '../../redux/redux-store'
import React from 'react'

const mapState = (state: AppStateType) => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),
    }
}

const mapDispatch = {
    addNewMessage
}

export default compose<React.FunctionComponent>(connect(mapState, mapDispatch), withAuthRedirect)(Dialogs)
