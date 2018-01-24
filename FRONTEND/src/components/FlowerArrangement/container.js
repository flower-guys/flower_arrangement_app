import React, { Component } from 'react'
import FlowerArrangement from './presenter'

class Container extends Component {
    componentDidMount() {
        // Open Search component
        if (window.innerWidth > 768) {
            this.props.openSearch()
        }
    }

    componentWillUnmount() {
        this.props.closeSearch()
    }
    render() {
        return <FlowerArrangement {...this.props} buildPackage={this.buildPackage} />
    }
}

export default Container
