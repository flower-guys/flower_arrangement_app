import React, { Component } from 'react'
import Search from './presenter'

class Container extends Component {
  _searchFlower = term => {
    const { searchFlower } = this.props
    const trimmedTerm = term.replace(/(\s*)/g,"")
    searchFlower(trimmedTerm)
  }

  render() {
    return (
      <Search {...this.props} _searchFlower={this._searchFlower} />
    )
  }
}

export default Container





