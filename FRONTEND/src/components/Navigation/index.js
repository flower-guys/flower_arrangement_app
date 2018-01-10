import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as imagesActions } from 'redux/modules/images'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFirebaseImages: () => {
            dispatch(imagesActions.fetchFirebaseImages())
        },
        selectImage: (selectedImages) => {
            dispatch(imagesActions.selectImage(selectedImages))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { images } = state
    return { 
        imageList: images.imageList,
        selectedImages: images.selectedImages
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
