import React, { Component } from 'react'
import _ from 'lodash'
import Navigation from './presenter'

class Container extends Component {

  imageSearch = term => {
    console.log(term)
    const { fetchFirebaseImages } = this.props
    fetchFirebaseImages(term)
  }

  selectItem = image => {
    const { selectImage } = this.props;
    selectImage(image);
  }

  render() {
    return (
      <Navigation
        fetchedImageList={this.props.fetchedImageList}
        imageSearch={this.imageSearch}
        selectItem={this.selectItem}
      />
    );
  }

}

export default Container





