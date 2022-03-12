import todoListReducer, {updateTodoText} from "./todoList-reducer";

it('should change todo text', function () {
    // test data
    let action = updateTodoText('yoyoyo')
    let initialState = {
        todos: [],
        newText: '',
        filter: 'all',
        toggleAllComplete: true
    }

    // action
    let newState = todoListReducer(initialState , action);

    //expectation
    expect(newState.newText).toBe('yoyoyo')
})