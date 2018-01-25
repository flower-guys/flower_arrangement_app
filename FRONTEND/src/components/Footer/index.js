import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'

const mapStateToProps = (state, ownProps) => {
    const { layout, flowers, routing: { location } } = state
    return {
        pathname: location.pathname,
        exportingList: flowers.exportingList,
        currentSelectedFlowers: flowers.currentSelectedFlowers,
        downloadURL: flowers.downloadURL,
        needSearch: layout.needSearch
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        refineList: (currentSelectedFlowers) => {
            dispatch(flowersActions.refineList(currentSelectedFlowers))
        },
        deselectFlower: deselectedFlower => {
            dispatch(flowersActions.deselectFlower(deselectedFlower))
        },
        deselectImage: deselectedCanvasImage => {
            dispatch(flowersActions.deselectImage(deselectedCanvasImage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
