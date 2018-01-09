import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'

const mapStateToProps = (state, ownProps) => {
    const { flowers } = state
    return {
        selectedFlowers: flowers.selectedFlowers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deselectFlower: (deselectedIndex) => {
            dispatch(flowersActions.deselectFlower(deselectedIndex))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Container);
