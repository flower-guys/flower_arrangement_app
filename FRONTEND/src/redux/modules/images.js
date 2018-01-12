import { database } from 'redux/firebase'

// imports

const FETCH_IMAGES = 'FETCH_IMAGES'
const SELECT_IMAGE = 'SELECT_IMAGE'
const DESELECT_IMAGE = 'DESELECT_IMAGE'
const REFINE_LIST = 'REFINE_LIST'
// actions

// action creators
function fetchImages (snapshot) {
    return {
        type: FETCH_IMAGES,
        images: snapshot
    }
}

function selectImage (selectedImage) {
    return {
        type: SELECT_IMAGE,
        selectedImage
    }
}

function deselectImage (deselectedId) {
    return {
        type: DESELECT_IMAGE,
        deselectedId
    }
}

function refineList (currentSelectedImages) {
    return {
        type: REFINE_LIST,
        currentSelectedImages
    }
}
// API actions
function fetchFirebaseImages () {
    return dispatch => {
        database.ref('flowers/').on('value', snapshot => {
            dispatch(fetchImages(snapshot.val()))
        })
    }
}



// initial state
const initialState = {
    wholeSelectedImages: [],
    currentSelectedImages: [],
    refinedList: [],
}
// reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_IMAGES:
            return applyFetchImages(state, action)
        case SELECT_IMAGE:
            return applySelectImage(state, action)
        case DESELECT_IMAGE:
            return applyDeselectImage(state, action)
        case REFINE_LIST:
            return applyRefineList(state, action)
        default:
            return state
    }
}
// reducer functions
function applyFetchImages(state, action) {
    const { images } = action
    return {
        ...state,
        fetchedImageList: images
    }
}

function applySelectImage(state, action) {
    const { selectedImage } = action
    
    return {
        ...state,
        wholeSelectedImages: [...state.wholeSelectedImages, selectedImage],
        currentSelectedImages: [...state.currentSelectedImages, selectedImage],
    }
}

function applyDeselectImage(state, action) {
    const { deselectedId } = action
    const actionIndex = state.currentSelectedImages.findIndex( x => x.id === deselectedId)
    return {
        ...state,
        currentSelectedImages: [
            ...state.currentSelectedImages.slice(0, actionIndex),
            ...state.currentSelectedImages.slice(actionIndex + 1)
        ],
    }
}

function applyRefineList(state, action) {
    const { currentSelectedImages } = action
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
    const arrangedArray = currentSelectedImages.slice().sort(comparison)
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
    fetchFirebaseImages,
    selectImage,
    deselectImage,
    refineList
}

export { actionCreators }
export default reducer