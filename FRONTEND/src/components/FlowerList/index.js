import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFirebaseFlowers: (term) => {
            dispatch(flowersActions.fetchFirebaseFlowers(term))
        },
        selectFlower: (selectedFlower) => {
            dispatch(flowersActions.selectFlower(selectedFlower))
        },
        deselectFlower: deselectedFlower => {
            dispatch(flowersActions.deselectFlower(deselectedFlower))
        },
        deselectImage: deselectedCanvasImage => {
            dispatch(flowersActions.deselectImage(deselectedCanvasImage))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { flowers, routing: { location } } = state
    return {
        pathname: location.pathname,
        fetchedFlowerList: flowers.fetchedFlowerList,
        currentSelectedFlowers: flowers.currentSelectedFlowers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
