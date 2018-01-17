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
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { flowers } = state
    return {
        fetchedFlowerList: flowers.fetchedFlowerList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);

