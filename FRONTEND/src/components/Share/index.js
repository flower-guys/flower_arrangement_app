import { connect } from 'react-redux'
import Container from './container'

const mapStateToProps = (state, ownProps) => {
    const { flowers, routing: { location } } = state
    return {
        pathname: location.pathname,
        downloadURL: flowers.downloadURL
    }
}

export default connect(mapStateToProps)(Container);
