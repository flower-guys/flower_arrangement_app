const OPEN_SEARCH = 'OPEN_SEARCH'
const CLOSE_SEARCH = 'CLOSE_SEARCH'

function openSearch () {
    return {
        type: OPEN_SEARCH
    }
}

function closeSearch () {
    return {
        type: CLOSE_SEARCH
    }
}

const initialState = {
    needSearch: false
}

//reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        case OPEN_SEARCH:
            return applyOpenSearch(state, action)
        case CLOSE_SEARCH:
            return applyCloseSearch(state, action)
        default:
            return state
    }
}

function applyOpenSearch(state, action) {
    return {
        ...state,
        needSearch: true
    }
}

function applyCloseSearch(state, action) {
    return {
        ...state,
        needSearch: false
    }
}

const actionCreators = {
    openSearch,
    closeSearch
}

export { actionCreators }
export default reducer