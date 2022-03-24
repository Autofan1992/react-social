import { FriendsType } from '../../types/types'

const initialState = {
    friends: [
        { name: 'Dima' },
        { name: 'Jeremy' }
    ] as Array<FriendsType>
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState): InitialStateType => {
    return state
}

export default sidebarReducer