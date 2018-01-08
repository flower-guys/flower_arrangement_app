import React, { Component } from 'react'
import Navigation from './presenter'

class Container extends Component {
    state= {
        basket: []
    }
    render() {
        return (
                <Navigation
                    basket={this.state.basket}
                    flowerList={this.props.flowerList}
                    handleListButton={this._handleListButton}
                    handleSelectButton={this._handleSelectButton}    
                />
        ) 
    }
    _handleListButton = () => {
        const { fetchFirebaseFlowers } = this.props
        fetchFirebaseFlowers()
    }

    _handleSelectButton = flower => {
        const basketArray = this.state.basket
        basketArray.push(flower)
        this.setState({
            basket: basketArray
        })
        console.log(this.state)
    }
}

export default Container





