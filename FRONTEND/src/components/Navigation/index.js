import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFirebaseFlowers: () => {
            dispatch(flowersActions.fetchFirebaseFlowers())
        },
        selectFlower: (selectedFlowers) => {
            dispatch(flowersActions.selectFlower(selectedFlowers))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { flowers } = state
    return { 
        flowerList: flowers.flowerList,
        selectedFlowers: flowers.selectedFlowers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
