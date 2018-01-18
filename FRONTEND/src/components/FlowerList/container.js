import React, { Component } from 'react'
import FlowerList from './presenter'

class Container extends Component {
    state = {
        loading: true
    }
    componentDidMount() {
        const { fetchFirebaseFlowers } = this.props
        if (!this.props.fetchedFlowerList) {
            fetchFirebaseFlowers(' ')
        } else {
            this.setState({
                loading: false
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.fetchedFlowerList) {
            this.setState({
                loading: false
            })
        }
    }
    render() {
        return (
            <div>
                <FlowerList 
                    {...this.props}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default Container
