import React, { Component } from 'react'
import Navigation from './presenter'

class Container extends Component {
  _searchFlower = term => {
    const { searchFlower } = this.props
    const trimmedTerm = term.replace(/(\s*)/g,"")
    searchFlower(trimmedTerm)
  }

  render() {
    return (
      <Navigation {...this.props} _searchFlower={this._searchFlower} />
    )
  }
}

export default Container





