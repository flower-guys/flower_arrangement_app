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

function selectFlower (selectedFlower) {
    return {
        type: SELECT_FLOWER,
        selectedFlower
    }
}

function deselectFlower (deselectedIndex) {
    return {
        type: DESELECT_FLOWER,
        deselectedIndex
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
    selectedFlowers: []
}
// reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_FLOWERS:
            return applyFetchFlowers(state, action)
        case SELECT_FLOWER:
            return applySelectFlower(state, action)
        case DESELECT_FLOWER:
            return applyDeselectFlower(state, action)
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
        selectedFlowers: [...state.selectedFlowers, selectedFlower]
    }
}

function applyDeselectFlower(state, action) {
    const { deselectedIndex } = action
    return {
        ...state,
        selectedFlowers: [
            ...state.selectedFlowers.slice(0, deselectedIndex),
            ...state.selectedFlowers.slice(deselectedIndex + 1)
        ]
    }
}
// exports
const actionCreators = {
    fetchFirebaseFlowers,
    selectFlower,
    deselectFlower
}

export { actionCreators }
export default reducer