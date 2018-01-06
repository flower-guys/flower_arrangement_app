import React, { Component } from 'react'
import FlowerImage from './presenter'
import DB from './DB'

export default class Container extends Component {
    state = {
        selectedFlower : DB[0]
    }
    render() {
        return (
                <FlowerImage selectedFlower={this.state.selectedFlower} />
        )
    }
}