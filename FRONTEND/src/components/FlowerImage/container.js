import React, { Component } from 'react'
import FlowerImage from './presenter'

export default class Container extends Component {

    renderFlowers () {
        return this.props.selectedFlowers.map(( flower, key ) => {
            return <FlowerImage selectedFlower={flower} key={key} />
        })
    }

    render() {
        console.log(this.props.selectedFlowers)
        return this.renderFlowers()
    }
}