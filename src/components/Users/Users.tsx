import styles from './Users.module.scss'
import Preloader from '../common/preloader/Preloader'
import User from './User'
import Paginator from '../common/Paginator/Paginator'
import { UserType } from '../../types/types'
import React, { FC } from 'react'

type PropsType = {
    users: Array<UserType>
    isFetching: boolean
    toggleFollowing: (userId: number, followed: boolean) => void
    followingInProgress: Array<number>
    onPageChanged: (pageNumber: number, pageSize: number) => void
    currentPage: number
    pageSize: number
    totalUsersCount: number
}

const Users: FC<PropsType> = (
    {
        users,
        isFetching,
        toggleFollowing,
        followingInProgress,
        onPageChanged,
        currentPage,
        pageSize,
        totalUsersCount
    }) => {

    return (
        <div className={styles.usersList}>
            {isFetching
                ? <Preloader/>
                : users.map(u =>
                    <User key={u.id} user={u} toggleFollowing={toggleFollowing}
                          followingInProgress={followingInProgress}/>
                )
            }
            <Paginator
                onPageChanged={onPageChanged}
                currentPage={currentPage}
                pageSize={pageSize}
                totalItemsCount={totalUsersCount}
            />
        </div>
    )
}

export default Users