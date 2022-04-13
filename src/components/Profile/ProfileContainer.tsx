import { FC, memo, useEffect } from 'react'
import Profile from './Profile'
import { connect, ConnectedProps } from 'react-redux'
import {
    getUserProfile,
    getUserStatus,
    saveProfile,
    updateProfileAvatar,
    updateUserStatus
} from '../../redux/reducers/profile-reducer'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { getAuthUserId, getIsAuth } from '../../redux/selectors/auth-selectors'
import { getIsFetching, getProfile, getStatus } from '../../redux/selectors/profile-selectors'
import { RouteComponentProps } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { getRequestSuccess } from '../../redux/selectors/app-selectors'
import RequestResultModal from '../common/RequestResultModal/RequestResultModal'

const ProfileContainer: FC<PropsFromRedux & RouteComponentProps<TParams> & PropsType> = (props) => {
    const {
        getUserProfile,
        getUserStatus,
        authorisedUserId,
        isAuth,
        match
    } = props

    const urlUserId = match.params.userId?.length ? +match.params.userId : undefined
    const isOwner = !match.params.userId ? isAuth : urlUserId === authorisedUserId

    useEffect(() => {
        const userId = urlUserId ?? authorisedUserId
        if (userId) {
            getUserProfile(userId)
            getUserStatus(userId)
        }
    }, [match.params, urlUserId, authorisedUserId, getUserProfile, getUserStatus])

    return (
        <>
            <RequestResultModal
                requestResult={props.requestSuccess}
                successText="Profile saved successfully"
                errorText="Something went wrong"
                visible={props.requestSuccess !== undefined && true}
            />
            <div className="profileBlock">
                <Profile {...props} userId={urlUserId ?? authorisedUserId} isOwner={isOwner}/>
            </div>
        </>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    authorisedUserId: getAuthUserId(state),
    isAuth: getIsAuth(state),
    profile: getProfile(state),
    status: getStatus(state),
    requestSuccess: getRequestSuccess(state),
    isFetching: getIsFetching(state)
})

const MapDispatchToProps = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    updateProfileAvatar,
    saveProfile
}

const connector = connect(mapStateToProps, MapDispatchToProps)
const ProfileContainerMemorized = memo(ProfileContainer)

export default compose<FC>(connector, withRouter, withAuthRedirect)(ProfileContainerMemorized)

type PropsFromRedux = ConnectedProps<typeof connector>

type TParams = {
    userId: string | undefined
}

export type PropsType = {
    saveProfile?: (formData: ProfileType) => void
    profile: ProfileType
    userId: number | null
    isOwner: boolean
    status: string
    updateUserStatus: (status: string) => void
    statusChangeResult: boolean
    updateProfileAvatar: (avatar: File) => void
    isFetching: boolean
    toggleEditMode: () => void
    error: string
    isAuth?: boolean
    requestSuccess: boolean
}