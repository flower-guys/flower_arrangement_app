import React, { Component } from 'react'
import FlowerArrangement from './presenter'

class Container extends Component {
    componentDidMount() {
        if (window.innerWidth > 768) {
            this.props.openSearch()
        }
    }
    componentWillUnmount() {
        this.props.closeSearch()
    }
    render() {
        return <FlowerArrangement />
    }
}

export default Container
