import profileReducer, { profileActions } from './profile-reducer'

it('should add new post', function () {
    // test data
    let action = profileActions.setNewPost('it-senior')
    let initialState = {
        posts: [],
        profile: null,
        status: null,
        isFetchingAvatar: false,
        statusChangeResult: undefined,
        avatarChangeResult: undefined,
        saveProfileResult: false,
    }

    // action
    let newState = profileReducer(initialState, action)

    //expectation
    expect(newState.posts.length).toBe(1)
})

it('should add like', function () {
    // test data
    let action = profileActions.likePost(0)
    let initialState = {
        posts: [
            { id: 0, post: 'foo', likesCount: 0 }
        ],
        profile: null,
        status: null,
        isFetchingAvatar: false,
        statusChangeResult: undefined,
        avatarChangeResult: undefined,
        saveProfileResult: false,
    }

    // action
    let newState = profileReducer(initialState, action)

    //expectation
    expect(newState.posts[0].likesCount).toBe(1)
})

it('should delete post', function () {
    // test data
    let action = profileActions.deletePost(0)
    let initialState = {
        posts: [
            { id: 0, post: 'foo', likesCount: 0 }
        ],
        profile: null,
        status: null,
        isFetchingAvatar: false,
        statusChangeResult: undefined,
        avatarChangeResult: undefined,
        saveProfileResult: false,
    }

    // action
    let newState = profileReducer(initialState, action)

    //expectation
    expect(newState.posts.length).toBe(0)
})

