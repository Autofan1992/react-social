import { FC, memo, useEffect } from 'react'
import Profile from './Profile'
import { connect, ConnectedProps } from 'react-redux'
import {
    getUserProfile,
    getUserStatus,
    saveProfile,
    updateUserAvatar,
    updateUserStatus
} from '../../redux/reducers/profile-reducer'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { getAuthUserId, getIsAuth } from '../../redux/selectors/auth-selectors'
import {
    getAvatarChangeResult,
    getIsFetchingAvatar,
    getProfile,
    getSaveProfileResult,
    getStatus,
    getStatusChangeResult
} from '../../redux/selectors/profile-selectors'
import { RouteComponentProps } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'
import withAuthRedirect from '../../hoc/withAuthRedirect'

const ProfileContainer: FC<PropsFromRedux & RouteComponentProps<TParams> & PropsType> = (props) => {
    const {
        getUserProfile,
        getUserStatus,
        authorisedUserId,
        isAuth
    } = props

    const urlUserId = props.match.params.userId?.length ? +props.match.params.userId : undefined

    useEffect(() => {
        const userId = urlUserId ?? authorisedUserId
        if (userId) {
            getUserProfile(userId)
            getUserStatus(userId)
        }
    }, [props.match.params, urlUserId, authorisedUserId, getUserProfile, getUserStatus])

    const isOwner = !props.match.params.userId ? isAuth : urlUserId === authorisedUserId

    return (
        <div className="profileBlock">
            <Profile {...props} userId={urlUserId ?? authorisedUserId} isOwner={isOwner}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    authorisedUserId: getAuthUserId(state),
    isAuth: getIsAuth(state),
    profile: getProfile(state),
    status: getStatus(state),
    avatarChangeResult: getAvatarChangeResult(state),
    statusChangeResult: getStatusChangeResult(state),
    saveProfileResult: getSaveProfileResult(state),
    isFetchingAvatar: getIsFetchingAvatar(state)
})

const MapDispatchToProps = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    updateUserAvatar,
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
    saveProfile: (formData: ProfileType) => void
    saveProfileResult: boolean
    profile: ProfileType
    userId: number | null
    isOwner: boolean
    status: string
    updateUserStatus: (status: string) => void
    statusChangeResult: boolean
    updateUserAvatar: (avatar: File) => void
    isFetchingAvatar: boolean
    setEditMode: () => void
    error: string
    isAuth: boolean
}