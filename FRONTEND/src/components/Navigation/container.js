import React, { Component } from 'react'
import Navigation from './presenter'

class Container extends Component {
  searchFlower = term => {
    const { fetchFirebaseFlowers } = this.props
    fetchFirebaseFlowers(term)
  }
  selectFlower = flower => {
    const { selectFlower } = this.props
    selectFlower(flower)
  }

  render() {
    return (
      <Navigation
        fetchedFlowerList={this.props.fetchedFlowerList}
        searchFlower={this.searchFlower}
        selectFlower={this.selectFlower}
      />
    )
  }
}

export default Container





