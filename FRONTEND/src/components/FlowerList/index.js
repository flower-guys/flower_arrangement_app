import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFirebaseFlowers: () => {
            dispatch(flowersActions.fetchFirebaseFlowers())
        },
        selectFlower: (selectedFlower) => {
            dispatch(flowersActions.selectFlower(selectedFlower))
        },
        deselectFlower: deselectedFlower => {
            dispatch(flowersActions.deselectFlower(deselectedFlower))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { flowers, routing: { location } } = state
    return {
        pathname: location.pathname,
        currentSelectedFlowers: flowers.currentSelectedFlowers,
        searchedList: flowers.searchedList,
        fetchedFlowerList: flowers.fetchedFlowerList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);

