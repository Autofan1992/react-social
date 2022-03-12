import { connect, ConnectedProps } from 'react-redux'
import {
    followUserToggle, requestUsers,
} from '../../redux/reducers/users-reducer'
import Users from './Users'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching, getPageSize, getTotalUsersCount, getUsers
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
        totalUsersCount
    }) => {

    useEffect(() => {
        if (!users.length) {
            requestUsers(currentPage, pageSize)
        }
    }, [users.length, requestUsers, currentPage, pageSize])

    const toggleFollowingUser = (userId: number, followed: boolean) => {
        followUserToggle(userId, followed)
    }

    const onPageChanged = (pageNumber: number, pageSize: number) => {
        requestUsers(pageNumber, pageSize)
    }

    return (
        <Users
            isFetching={isFetching}
            toggleFollowing={toggleFollowingUser}
            users={users}
            followingInProgress={followingInProgress}
            currentPage={currentPage}
            pageSize={pageSize}
            totalUsersCount={totalUsersCount}
            onPageChanged={onPageChanged}
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
    requestUsers
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(UsersContainer)