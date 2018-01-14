import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as imagesActions } from 'redux/modules/images'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFirebaseImages: () => {
            dispatch(imagesActions.fetchFirebaseImages())
        },
        selectImage: (selectedImage) => {
            dispatch(imagesActions.selectImage(selectedImage))
        },
        refineList: (currentSelectedImages) => {
            dispatch(imagesActions.refineList(currentSelectedImages))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { images } = state
    return { 
        fetchedImageList: images.fetchedImageList,
        currentSelectedImages: images.currentSelectedImages,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
