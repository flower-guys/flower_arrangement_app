import { connect } from 'react-redux'
import Container from './container'

const mapStateToProps = (state, ownProps) => {
    const { flowers } = state
    return {
        selectedFlowers: flowers.selectedFlowers
    }
}

export default connect(mapStateToProps, null)(Container);
