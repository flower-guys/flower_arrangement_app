import React, { Component } from 'react'
import FlowerImage from './presenter'

export default class Container extends Component {
    state = {
        basket : this.props.basket
    }
    renderFlowers () {
        return this.state.basket.map( flower => {
            return <FlowerImage selectedFlower={flower} key={flower.id} />
        })
    }

    render() {
        return (
                this.renderFlowers()
        )
    }
}