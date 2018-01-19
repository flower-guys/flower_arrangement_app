import { database } from 'redux/firebase'
import _ from 'lodash'
// imports

const FETCH_FLOWERS = 'FETCH_FLOWERS'
const SELECT_FLOWER = 'SELECT_FLOWER'
const DESELECT_FLOWER = 'DESELECT_FLOWER'
const SEARCH_FLOWER = 'SEARCH_FLOWER'
const SYNC_LIST = 'SYNC_LIST'
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

function searchFlower (term) {
    return {
        type: SEARCH_FLOWER,
        term
    }
}

function syncList (currentSelectedFlowers) {
    return {
        type: SYNC_LIST,
        canvasImageList: currentSelectedFlowers
    }
}

function refineList (currentSelectedFlowers) {
    return {
        type: REFINE_LIST,
        currentSelectedFlowers
    }
}
// API actions
function fetchFirebaseFlowers () {
    return dispatch => {
        database.ref('flowers/')
            .on('value', snapshot => dispatch(fetchFlowers(snapshot.val()),error => console.log(error)))
    }
}

// initial state
const initialState = {
    canvasImageList: [],
    currentSelectedFlowers: [],
    exportingList: [],
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
        case SEARCH_FLOWER:
            return applySearchFlower(state, action)
        case SYNC_LIST:
            return applySyncList(state, action)
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
        fetchedFlowerList: flowers,
        searchedList: flowers
    }
}

function applySelectFlower(state, action) {
    const { selectedFlower } = action
    
    return {
        ...state,
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

function applySearchFlower(state, action) {
    const { term } = action
    const searchedList = _.filter(state.fetchedFlowerList, obj => {
        return term.length > 0 ? _.includes(obj.name.replace(/(\s*)/g, ""), term) || _.includes(obj.name_kr.replace(/(\s*)/g, ""), term)
        : true
    })
    return {
        ...state,
        searchedList
    }
}

function applySyncList(state, action) {
    const { canvasImageList } = action
    return {
        ...state,
        canvasImageList
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
    var exportingList = []

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
            if (arrangedArray.length > 1) {
                if (JSON.stringify(arrangedArray[i]) === JSON.stringify(arrangedArray[i+1])) {
                    count += 1
                } else {
                    arrangedArray[i].count = count
                    exportingList.push(arrangedArray[i])
                    count = 1
                }
            } else {
                arrangedArray[0].count = 1
                exportingList.push(arrangedArray[0])
            }
        }
        return {
            ...state,
            exportingList
        }
    } else {
        return {
            ...state,
            exportingList
        }   
    }
}

// exports
const actionCreators = {
    fetchFirebaseFlowers,
    selectFlower,
    deselectFlower,
    syncList,
    refineList,
    searchFlower
}

export { actionCreators }
export default reducer