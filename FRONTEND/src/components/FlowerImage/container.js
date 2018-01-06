import React, { Component } from 'react'
import FlowerImage from './presenter'
import DB from './DB'

export default class Container extends Component {
    state = {
        selectedFlowers : [DB[0], DB[0], DB[1]]
    }
    renderFlowers () {
        return this.state.selectedFlowers.map( flower => {
            return <FlowerImage selectedFlower={flower} key={flower.id} />
        })
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                selectedFlowers: [DB[0], DB[1], DB[2]]
            })
        }, 5000);
        setTimeout(() => {
            this.setState({
                selectedFlowers: [DB[1]]
            })
        }, 8000);
    }
    render() {
        return (
                this.renderFlowers()
        )
    }
}