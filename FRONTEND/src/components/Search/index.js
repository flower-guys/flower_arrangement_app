import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'
import { actionCreators as layoutActions } from 'redux/modules/layout'

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
        },
        openSearch: () => {
            dispatch(layoutActions.openSearch())
        },
        closeSearch: () => {
            dispatch(layoutActions.closeSearch())
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { flowers, layout, routing: { location } } = state
    return {
        pathname: location.pathname,
        fetchedFlowerList: flowers.fetchedFlowerList,
        currentSelectedFlowers: flowers.currentSelectedFlowers,
        searchedList: flowers.searchedList,
        needSearch: layout.needSearch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
