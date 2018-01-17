import { database } from 'redux/firebase'

// imports

const FETCH_FLOWERS = 'FETCH_FLOWERS'
const SELECT_FLOWER = 'SELECT_FLOWER'
const DESELECT_FLOWER = 'DESELECT_FLOWER'
const REFINE_LIST = 'REFINE_LIST'
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

function deselectFlower (deselectedId) {
    return {
        type: DESELECT_FLOWER,
        deselectedId
    }
}

function refineList (currentSelectedFlowers) {
    return {
        type: REFINE_LIST,
        currentSelectedFlowers
    }
}
// API actions
function fetchFirebaseFlowers (term) {
    return dispatch => {
        database.ref('flowers/')
            .orderByChild('name')
            .startAt(term)
            .once('value', snapshot => dispatch(fetchFlowers(snapshot.val())))
    }
}

// initial state
const initialState = {
    wholeSelectedFlowers: [],
    currentSelectedFlowers: [],
    refinedList: [],
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
        case REFINE_LIST:
            return applyRefineList(state, action)
        default:
            return state
    }
}
// reducer functions
function applyFetchFlowers(state, action) {
    const { flowers } = action
    return {
        ...state,
        fetchedFlowerList: flowers
    }
}

function applySelectFlower(state, action) {
    const { selectedFlower } = action
    
    return {
        ...state,
        wholeSelectedFlowers: [...state.wholeSelectedFlowers, selectedFlower],
        currentSelectedFlowers: [...state.currentSelectedFlowers, selectedFlower],
    }
}

function applyDeselectFlower(state, action) {
    const { deselectedId } = action
    const actionIndex = state.currentSelectedFlowers.findIndex( x => x.id === deselectedId)
    return {
        ...state,
        currentSelectedFlowers: [
            ...state.currentSelectedFlowers.slice(0, actionIndex),
            ...state.currentSelectedFlowers.slice(actionIndex + 1)
        ],
    }
}

function applyRefineList(state, action) {
    const { currentSelectedFlowers } = action
    const comparison = (a, b) => {
        const [idA, idB] = [a.id, b.id];
        let type = 0;
        if (idA > idB) {
            type = 1;
        } else if (idA < idB) {
            type = -1;
        }
        return type;
    };
    const arrangedArray = currentSelectedFlowers.slice().sort(comparison)
    const refinedList = []
    var tempCount = 1
    for (let i = 0; i < arrangedArray.length; i++) {       
        if (arrangedArray.length > 1) {
            if (arrangedArray[i] === arrangedArray[i+1]) {
                tempCount = tempCount + 1
            } else if (arrangedArray[i] !== arrangedArray[i+1]) {
                arrangedArray[i].count = tempCount
                refinedList.push(arrangedArray[i])
                tempCount = 1
            }
        } else if (arrangedArray.length <= 1) {
            arrangedArray[0].count = 1
            refinedList.push(arrangedArray[0])
        }
    }
    return {
        ...state,
        refinedList: refinedList
    }
}

// exports
const actionCreators = {
    fetchFirebaseFlowers,
    selectFlower,
    deselectFlower,
    refineList
}

export { actionCreators }
export default reducer