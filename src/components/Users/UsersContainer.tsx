import { connect, ConnectedProps } from 'react-redux'
import { followUserToggle, requestUsers, searchUsers, } from '../../redux/reducers/users-reducer'
import Users from './Users'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/selectors/users-selectors'
import { FC, useEffect } from 'react'
import { AppStateType } from '../../redux/redux-store'

const UsersContainer: FC<PropsFromRedux> = (
    {
        users,
        requestUsers,
        followUserToggle,
        isFetching,
        followingInProgress,
        currentPage,
        pageSize,
        totalUsersCount,
        searchUsers
    }) => {

    useEffect(() => {
            requestUsers(currentPage, pageSize)
    }, [requestUsers, currentPage, pageSize])

    return (
        <Users
            isFetching={isFetching}
            toggleFollowing={followUserToggle}
            users={users}
            followingInProgress={followingInProgress}
            currentPage={currentPage}
            pageSize={pageSize}
            totalUsersCount={totalUsersCount}
            onPageChanged={requestUsers}
            searchUsers={searchUsers}
        />
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        followingInProgress: getFollowingInProgress(state),
        isFetching: getIsFetching(state),
    }
}

const mapDispatchToProps = {
    followUserToggle,
    requestUsers,
    searchUsers
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(UsersContainer)