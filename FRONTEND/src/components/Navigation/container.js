import React, { Component } from 'react'
import Navigation from './presenter'

class Container extends Component {
  componentDidMount() {
    this.props.refineList(this.props.currentSelectedImages)
  }
  
  componentWillUpdate(nextProps) {
    if (this.props.currentSelectedImages !== nextProps.currentSelectedImages) {
      this.props.refineList(nextProps.currentSelectedImages)
    }
  }

  render() {
    return (
      <Navigation
        refinedList={this.props.refinedList}
        fetchedImageList={this.props.fetchedImageList}
        handleListButton={this._handleListButton}
        handleSelectButton={this._handleSelectButton}
      />
    );
  }

  _handleListButton = () => {
    const { fetchFirebaseImages } = this.props;
    fetchFirebaseImages();
  };

  _handleSelectButton = image => {
    const { selectImage } = this.props;
    selectImage(image);
  };
}

export default Container





