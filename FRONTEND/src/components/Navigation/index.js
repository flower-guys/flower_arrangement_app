import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFirebaseFlowers: (term) => {
            dispatch(flowersActions.fetchFirebaseFlowers(term))
        },
        selectImage: (selectedFlower) => {
            dispatch(flowersActions.selectImage(selectedFlower))
        },
        refineList: (currentSelectedFlowers) => {
            dispatch(flowersActions.refineList(currentSelectedFlowers))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { flowers } = state
    return { 
        fetchedFlowerList: flowers.fetchedFlowerList,
        currentSelectedFlowers: flowers.currentSelectedFlowers,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
