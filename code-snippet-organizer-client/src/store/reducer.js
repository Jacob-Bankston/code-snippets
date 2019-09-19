const initialState = {
    snippets: []
}

const reducer = (state = initialState, action) => {
    if (action.type == 'ADD_SNIPPET') {
        return {
            ...state,
            snippets: action.snippets
        }
    } else if (action.type == 'VIEW_SNIPPET_LIST'){
        return {
            ...state,
            snippets: action.snippets
        }
    } else if (action.type == 'UPDATE_SNIPPET') {
        return {
            ...state,
            snippets: action.snippets
        }
    } else if (action.type == 'DELETE_SNIPPET') {
        return {
            ...state,
            snippets: action.snippets
        }
    }

    return state;

}

export default reducer;