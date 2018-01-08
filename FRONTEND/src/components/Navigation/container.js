import React, { Component } from 'react'
import Navigation from './presenter'

class Container extends Component {
    state= {
        selectedFlowers: []
    }
    render() {
        return (
                <Navigation
                    selectedFlowers={this.props.selectedFlowers}
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
        const { selectFlower } = this.props
        this.setState( prevState => {
            const { selectedFlowers } = prevState
            selectedFlowers.push(flower)
            return {
                selectedFlowers: selectedFlowers
            }
        })
        selectFlower(this.state.selectedFlowers)
    }
}

export default Container





