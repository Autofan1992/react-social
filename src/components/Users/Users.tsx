import styles from './Users.module.scss'
import User from './User'
import Paginator from '../common/Paginator/Paginator'
import { SearchRequestType, UserType } from '../../types/types'
import React, { FC } from 'react'
import SearchReduxForm from '../common/Search/SearchForm'
import { debounce } from 'lodash'
import { Skeleton } from 'antd'

const Users: FC<PropsType> = (
    {
        users,
        isFetching,
        toggleFollowing,
        followingInProgress,
        onPageChanged,
        currentPage,
        pageSize,
        totalUsersCount,
        searchUsers
    }) => {

    const handleSearch = debounce((values: SearchRequestType) => {
        searchUsers(values)
    }, 500)

    return (
        <div className={styles.usersList}>
            <SearchReduxForm onSubmit={handleSearch} placeholder={'Type in user name'}/>
            <Skeleton active loading={isFetching}>
                {users.map(u =>
                    <User
                        key={u.id}
                        user={u}
                        toggleFollowing={toggleFollowing}
                        followingInProgress={followingInProgress}
                    />
                )}
            </Skeleton>
            {!isFetching && !users.length && <div>Users not found</div>}
            <Paginator
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                currentPage={currentPage}
                pageSize={pageSize}
                disabled={isFetching}
            />
        </div>
    )
}

export default Users

type PropsType = {
    users: Array<UserType>
    isFetching: boolean
    toggleFollowing: (userId: number, followed: boolean) => void
    searchUsers: (name: SearchRequestType) => void
    followingInProgress: Array<number>
    onPageChanged: (pageNumber: number, pageSize: number) => void
    currentPage: number
    pageSize: number
    totalUsersCount: number
}
