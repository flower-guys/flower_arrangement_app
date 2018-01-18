import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'


const mapStateToProps = (state, ownProps) => {
    const { flowers } = state
    return {
        refinedList: flowers.refinedList,
        currentSelectedFlowers: flowers.currentSelectedFlowers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        refineList: (currentSelectedFlowers) => {
            dispatch(flowersActions.refineList(currentSelectedFlowers))
        },
        deselectFlower: deselectedFlower => {
            dispatch(flowersActions.deselectFlower(deselectedFlower))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
