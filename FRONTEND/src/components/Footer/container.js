import React, { Component } from 'react'
import Footer from './presenter'

class Container extends Component {
    componentDidMount() {
        this.props.refineList(this.props.currentSelectedFlowers)
    }

    componentWillUpdate(nextProps) {
        if (this.props.currentSelectedFlowers !== nextProps.currentSelectedFlowers) {
            this.props.refineList(nextProps.currentSelectedFlowers)
        }
    }
    render() {
        return (
            <div>
            {this.props.refinedList.length > 0 ? <Footer {...this.props} />
            : <div /> 
        }</div>
        )
    }
}

export default Container
