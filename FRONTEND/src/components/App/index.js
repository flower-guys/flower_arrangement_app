import { connect } from 'react-redux'
import Container from './container'

const mapStateToProps = (state, ownProps) => {
  const { routing: { location } } = state
  return {
    pathname: location.pathname
  }
}

export default connect(mapStateToProps)(Container)

