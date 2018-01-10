import React, { Component } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import { connect } from "react-redux";
import { actionCreators as imagesActions } from 'redux/modules/images'


class Canvas extends Component {
  state = {
    selectedImages: this.props.selectedImages
  }

  handleExport = () => {
    const uri = this.stageRef.getStage().toDataURL()
    const name = "temp.png"
    let link = document.createElement("a")
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleExport}>Save as image</button>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight * 0.9}
          ref={node => this.stageRef = node}
        >
          <Layer 
            ref={node => this.layerRef = node}
          >
            <RenderImages 
              selectedImages={this.props.selectedImages}
              deselectImage={this.props.deselectImage}
            />
          </Layer>
        </Stage>
      </div>
    )
  } 
}

class RenderImages extends Component {
  render() {
    return this.props.selectedImages.map( (selectedImage, key) => {
      const image = new window.Image()
      image.src = require(`images/${selectedImage.name}.png`)
      const nodeName = `imageNode${key}`
      image.onload = () => {
        this.refs[nodeName].getLayer().batchDraw()
      }
      return (
          <Image
            key={key}
            image={image}
            ref={nodeName}
            draggable={true}
            scale={{x:0.5, y:0.5}}
            onClick={() => {
              this.refs[nodeName].moveToTop()
              this.refs[nodeName].getLayer().getChildren().strokeEnabled(false)
              this.refs[nodeName].strokeEnabled(true)
              this.refs[nodeName].stroke('black')
              this.refs[nodeName].strokeWidth(1)
              this.refs[nodeName].dash([10, 20, 0.001, 20])
              this.refs[nodeName].getLayer().batchDraw()
            }}
            onDragEnd={() => {
              this.refs[nodeName].getLayer().getChildren().strokeEnabled(false)
              this.refs[nodeName].getLayer().batchDraw()
            }}
            onTap={() => {
              this.refs[nodeName].moveToTop()
              this.refs[nodeName].getLayer().getChildren().strokeEnabled(false)
              this.refs[nodeName].strokeEnabled(true)
              this.refs[nodeName].stroke('black')
              this.refs[nodeName].strokeWidth(1)
              this.refs[nodeName].dash([10, 20, 0.001, 20])
              this.refs[nodeName].getLayer().batchDraw()
            }}
            onDblClick={() => {
              this.props.deselectImage(key)
            }}
            onDblTap={() => {
              this.props.deselectImage(key)
            }}
            onMouseOver={() => document.body.style.cursor='pointer'}
            onMouseOut={() => document.body.style.cursor='default'}
          />
      )
    })
  }
}
    

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deselectImage: deselectImage => {
      dispatch(imagesActions.deselectImage(deselectImage));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  const { images } = state;
  return {
    imageList: images.imageList,
    selectedImages: images.selectedImages,
    selectedImage: images.selectedImage,
    deselectedImage: images.deselectedImage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
