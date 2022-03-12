type FriendsType = {
    name: string
}

const initialState = {
    friends: [
        { name: 'Dimych' },
        { name: 'Jeremy' }
    ] as Array<FriendsType>
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState): InitialStateType => {
    return state
}

export default sidebarReducer