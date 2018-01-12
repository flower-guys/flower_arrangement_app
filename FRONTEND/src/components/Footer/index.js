import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as imagesActions } from 'redux/modules/images'


const mapStateToProps = (state, ownProps) => {
    const { images } = state
    return {
        refinedList: images.refinedList,
        currentSelectedImages: images.currentSelectedImages
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        refineList: (currentSelectedImages) => {
            dispatch(imagesActions.refineList(currentSelectedImages))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
