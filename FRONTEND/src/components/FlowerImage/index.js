import { connect } from 'react-redux'
import Container from './container'

const mapStateToProps = (state, ownProps) => {
    const { flowers } = state
    return { basket: flowers.basket }
}

export default connect(mapStateToProps)(Container)
