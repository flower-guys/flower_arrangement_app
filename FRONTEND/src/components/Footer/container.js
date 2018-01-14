import React, { Component } from 'react'
import Footer from './presenter'

class Container extends Component {
    componentDidMount() {
        this.props.refineList(this.props.currentSelectedImages)
    }

    componentWillUpdate(nextProps) {
        if (this.props.currentSelectedImages !== nextProps.currentSelectedImages) {
            this.props.refineList(nextProps.currentSelectedImages)
        }
    }
    render() {
        return <Footer refinedList={this.props.refinedList} />
    }
}

export default Container
