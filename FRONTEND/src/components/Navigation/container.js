import React, { Component } from 'react'
import Navigation from './presenter'

class Container extends Component {
    state = {
        selectedImages: this.props.selectedImages,

    }
    render() {
        return (
                <Navigation
                    selectedImages={this.props.selectedImages}
                    imageList={this.props.imageList}
                    handleListButton={this._handleListButton}
                    handleSelectButton={this._handleSelectButton}    
                />
        ) 
    }
    _selectedImagesFilter = () => {
        
    }

    _handleListButton = () => {
        const { fetchFirebaseImages } = this.props
        fetchFirebaseImages()
    }

    _handleSelectButton = image => {
        const { selectImage } = this.props
        selectImage(image)
    }
}

export default Container





