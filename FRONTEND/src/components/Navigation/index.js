import { connect } from 'react-redux'
import Container from './container'
import { actionCreators as flowersActions } from 'redux/modules/flowers'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFirebaseFlowers: () => {
            dispatch(flowersActions.fetchFirebaseFlowers())
        },
        selectFlower: (basketArray) => {
            dispatch(flowersActions.selectFlower(basketArray))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { flowers } = state
    return { 
        flowerList: flowers.flowerList,
        basket: flowers.basket
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
