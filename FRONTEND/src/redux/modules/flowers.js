import { database } from 'redux/firebase'
import _ from 'lodash'

// imports

const FETCH_FLOWERS = 'FETCH_FLOWERS'
const SELECT_FLOWER = 'SELECT_FLOWER'
const DESELECT_FLOWER = 'DESELECT_FLOWER'
const DESELECT_IMAGE = 'DESELCET_IMAGE'
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

function deselectImage (deselectedId) {
    return {
        type: DESELECT_IMAGE,
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
    canvasImageList: [],
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
        case DESELECT_IMAGE:
            return applyDeselectImage(state, action)
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
        canvasImageList: [...state.canvasImageList, selectedFlower],
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

function applyDeselectImage(state, action) {
    const { deselectedId } = action
    const actionIndex = state.canvasImageList.findIndex( x => x.id === deselectedId)
    return {
        ...state,
        canvasImageList: [
            ...state.canvasImageList.slice(0, actionIndex),
            ...state.canvasImageList.slice(actionIndex + 1)
        ]
    }
}

function applyRefineList(state, action) {
    const { currentSelectedFlowers } = action
    const comparison = (a, b) => {
        const [idA, idB] = [a.id, b.id]
        let type = 0
        if (idA > idB) {
            type = 1
        } else if (idA < idB) {
            type = -1
        }
        return type
    }
    var refinedList = []

    if (currentSelectedFlowers.length > 0) {
        const copiedArray = []
        for (let i = 0; i < currentSelectedFlowers.length; i++) {
            const copiedObj = {}
            for (let attr in currentSelectedFlowers[i]) {
                if (currentSelectedFlowers[i].hasOwnProperty(attr)) {
                    copiedObj[attr] = currentSelectedFlowers[i][attr]
                }
            }
            copiedArray.push(copiedObj)
        }  
        const arrangedArray = copiedArray.slice().sort(comparison)
        for (let i = 0; i < arrangedArray.length; i++){
            arrangedArray[i].count = 1
        }
        var count = 1
        for (let i = 0; i < arrangedArray.length; i++) {
            debugger
            if (arrangedArray.length > 1) {
                if (JSON.stringify(arrangedArray[i]) === JSON.stringify(arrangedArray[i+1])) {
                    console.log(true)
                    count += 1
                } else {
                    console.log(arrangedArray[i], arrangedArray[i+1])
                    arrangedArray[i].count = count
                    refinedList.push(arrangedArray[i])
                    count = 1
                }
            } else {
                arrangedArray[0].count = 1
                refinedList.push(arrangedArray[0])
            }
        }
        return {
            ...state,
            refinedList
        }
    } else {
        return {
            ...state,
            refinedList
        }   
    }
}

// exports
const actionCreators = {
    fetchFirebaseFlowers,
    selectFlower,
    deselectFlower,
    deselectImage,
    refineList
}

export { actionCreators }
export default reducer