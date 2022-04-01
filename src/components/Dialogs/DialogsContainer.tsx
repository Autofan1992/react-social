import { addNewMessage } from '../../redux/reducers/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getDialogs, getMessages } from '../../redux/selectors/dialogs-selectors'
import { AppStateType } from '../../redux/redux-store'
import { FC } from 'react'
import withAuthRedirect from '../../hoc/withAuthRedirect'

const mapState = (state: AppStateType) => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),
    }
}

const mapDispatch = {
    addNewMessage
}

export default compose<FC>(connect(mapState, mapDispatch), withAuthRedirect)(Dialogs)
