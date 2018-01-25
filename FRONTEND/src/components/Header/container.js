import React, { Component } from 'react'
import Header from './presenter'

class Container extends Component {

    handleOpen = () => {
        this.props.openSearch()
    }
    handleClose= () => {
        this.props.closeSearch()
    }
    render() {
        return (
        <Header {...this.props} 
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
        />
        )
    }
}

export default Container
