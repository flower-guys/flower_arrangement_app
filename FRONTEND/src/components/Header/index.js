import { connect } from 'react-redux'
import { actionCreators as layoutActions } from 'redux/modules/layout'
import Container from './container'

const mapStateToProps = (state, ownProps) => {
    const { layout } = state
    return {
        needSearch: layout.needSearch
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openSearch: () => {
            dispatch(layoutActions.openSearch())
        },
        closeSearch: () => {
            dispatch(layoutActions.closeSearch())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
