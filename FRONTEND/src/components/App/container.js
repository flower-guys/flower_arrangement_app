import React, { Component } from 'react'
import App from './presenter'

class Container extends Component {

    render() {
        return <App {...this.props} />
    }
} 

export default Container
