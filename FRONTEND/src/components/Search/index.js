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
        refineList: (currentSelectedFlowers) => {
            dispatch(flowersActions.refineList(currentSelectedFlowers))
        },
        searchFlower: (term) => {
            dispatch(flowersActions.searchFlower(term))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { flowers, routing: { location } } = state
    return {
        pathname: location.pathname,
        fetchedFlowerList: flowers.fetchedFlowerList,
        currentSelectedFlowers: flowers.currentSelectedFlowers,
        searchedList: flowers.searchedList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
