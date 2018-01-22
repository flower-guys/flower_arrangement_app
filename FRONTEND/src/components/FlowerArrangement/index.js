import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as layoutActions } from 'redux/modules/layout'

const mapStateToProps = (state, ownProps) => {
    const { layout, routing: { location } } = state
    return {
        pathname: location.pathname,
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