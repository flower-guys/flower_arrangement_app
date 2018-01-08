import { database } from 'redux/firebase'
// imports

const FETCH_FLOWERS = 'FETCH_FLOWERS'
const SEARCH_FLOWER = 'SEARCH_FLOWER'
const SELECT_FLOWER = 'SELECT_FLOWER'
const DESELECT_FLOWER = 'DESELECT_FLOWER'
const EXPORT_FLOWER = 'EXPORT_FLOWER'
// actions

// action creators
function fetchFlowers (snapshot) {
    return {
        type: FETCH_FLOWERS,
        flowers: snapshot
    }
}

function selectFlower (selectedFlowers) {
    return {
        type: SELECT_FLOWER,
        selectedFlowers
    }
}
// API actions
function fetchFirebaseFlowers () {
    return dispatch => {
        database.ref('flowers/').on('value', snapshot => {
            dispatch(fetchFlowers(snapshot.val()))
        })
    }
}



// initial state
const initialState = {
    flowerList: {},
    selectedFlowers: [{ id: 1, name: "rose", outline: "M 125,5 L 228.92305,65.000003 L 228.92305,185 L 125,245 L 21.07695,185 L 21.076953,64.999997 L 125,5 z"}]
}
// reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_FLOWERS:
            return applyFetchFlowers(state, action)
        case SELECT_FLOWER:
            return applySelectFlower(state, action)
        default:
            return state
    }
}
// reducer functions
function applyFetchFlowers(state, action) {
    const { flowers } = action
    return {
        ...state,
        flowerList: flowers
    }
}

function applySelectFlower(state, action) {
    const { selectedFlowers } = action
    return {
        ...state,
        selectedFlowers
    }
}
// exports
const actionCreators = {
    fetchFirebaseFlowers,
    selectFlower
}

export { actionCreators }
export default reducer