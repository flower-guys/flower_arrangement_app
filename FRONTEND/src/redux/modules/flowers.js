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

function selectFlower (flower) {
    return {
        type: SELECT_FLOWER,
        selectedFlower: flower
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
    basket: []
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
    const { selectedFlower } = action
    return {
        ...state,
        basket: selectedFlower
    }
}
// exports
const actionCreators = {
    fetchFirebaseFlowers
}

export { actionCreators }
export default reducer