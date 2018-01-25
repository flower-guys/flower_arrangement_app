import { connect } from 'react-redux'
import { actionCreators as layoutActions } from 'redux/modules/layout'
import Container from './container'

const mapStateToProps = (state, ownProps) => {
  const { layout, routing: { location } } = state
  return {
    pathname: location.pathname,
    needSearch: layout.needSearch
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeSearch: () => {
      dispatch(layoutActions.closeSearch())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)

