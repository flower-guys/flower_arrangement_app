import React, { Component } from 'react'
import Search from './presenter'

class Container extends Component {
  state = {
    term : '',
    animation: {
      transition: 'all .5s ease-out',
    }
  }
  _searchFlower = term => {
    const { searchFlower } = this.props
    const trimmedTerm = term.replace(/(\s*)/g,"")
    searchFlower(trimmedTerm)
  }
  handleInput = term => {
    this.setState({ term })
  }
  render() {
    return (
      <Search {...this.props}
        animation={this.state.animation}
        _searchFlower={this._searchFlower}
        term={this.state.term}
        handleInput={this.handleInput}/>
    )
  }
}

export default Container





