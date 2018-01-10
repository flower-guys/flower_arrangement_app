import { database } from 'redux/firebase'
// imports

const FETCH_IMAGES = 'FETCH_IMAGES'
const SELECT_IMAGE = 'SELECT_IMAGE'
const DESELECT_IMAGE = 'DESELECT_IMAGE'
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

function deselectImage (deselectedIndex) {
    return {
        type: DESELECT_IMAGE,
        deselectedIndex
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
    selectedImages: [],
    selectedImage: {},
    deselectedImage: ''
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
        default:
            return state
    }
}
// reducer functions
function applyFetchImages(state, action) {
    const { images } = action
    return {
        ...state,
        imageList: images
    }
}

function applySelectImage(state, action) {
    const { selectedImage } = action
    return {
        ...state,
        selectedImages: [...state.selectedImages, selectedImage],
        selectedImage: selectedImage
    }
}

function applyDeselectImage(state, action) {
    const { deselectedIndex } = action
    return {
        ...state,
        selectedImages: [
            ...state.selectedImages.slice(0, deselectedIndex),
            ...state.selectedImages.slice(deselectedIndex + 1)
        ],
        deselectedImage: deselectedIndex
    }
}
// exports
const actionCreators = {
    fetchFirebaseImages,
    selectImage,
    deselectImage
}

export { actionCreators }
export default reducer