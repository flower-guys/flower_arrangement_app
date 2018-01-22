import React, { Component } from 'react'
import Footer from './presenter'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMinified: false
        }
        this.handleMinify = this.handleMinify.bind(this)
        this.handleMaximize = this.handleMaximize.bind(this)
    }

    componentDidMount() {
            this.props.refineList(this.props.currentSelectedFlowers)
    }

    componentWillUpdate(nextProps) {
        if (this.props.currentSelectedFlowers !== nextProps.currentSelectedFlowers) {
            this.props.refineList(nextProps.currentSelectedFlowers)
        }
    }
    handleMinify () {
        this.setState({
            isMinified: true
        })
    }
    handleMaximize () {
        this.setState({
            isMinified: false
        })
    }
    render() {
        return (
            <Footer {...this.props} 
                isMinified={this.state.isMinified}
                handleMinify={this.handleMinify}
                handleMaximize={this.handleMaximize}
            />
        )
    }
}

export default Container
