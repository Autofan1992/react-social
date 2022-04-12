import usersReducer, { actions, InitialStateType } from './users-reducer'

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Mykola',
                followed: false,
                photos: {
                    small: '',
                    large: ''
                },
                status: 'bla'
            },
            {
                id: 1,
                name: 'Mykola 2',
                followed: false,
                photos: {
                    small: '',
                    large: ''
                },
                status: 'bla 2'
            },
            {
                id: 2,
                name: 'Mykola 3',
                followed: true,
                photos: {
                    small: '',
                    large: ''
                },
                status: 'bla 3'
            },
        ],
        totalUsersCount: 0,
        pageSize: 5,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow/unfollow success', () => {
    const NewState = usersReducer(state, actions.setToggleFollow(0))

    expect(NewState.users[1].followed).toBeFalsy()

    expect(NewState.users[0].followed).toBeTruthy()
})