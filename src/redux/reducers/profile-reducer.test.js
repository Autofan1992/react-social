import profileReducer, {deletePost, likePost, setNewPost} from "./profile-reducer";

it('should add new post', function () {
    // test data
    let action = setNewPost('it-kamasutra')
    let initialState = {
        posts: []
    }

    // action
    let newState = profileReducer(initialState, action);

    //expectation
    expect(newState.posts.length).toBe(1)
})

it('should add like', function () {
    // test data
    let action = likePost(0)
    let initialState = {
        posts: [
            {id: 0, message: 'foo', likesCount: null}
        ]
    }

    // action
    let newState = profileReducer(initialState, action);

    //expectation
    expect(newState.posts[0].likesCount).toBe(1)
})

it('should delete post', function () {
    // test data
    let action = deletePost(0)
    let initialState = {
        posts: [
            {id: 0, message: 'foo', likesCount: null}
        ]
    }

    // action
    let newState = profileReducer(initialState, action);

    //expectation
    expect(newState.posts.length).toBe(0)
})

