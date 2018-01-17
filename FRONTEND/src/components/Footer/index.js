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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
