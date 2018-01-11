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
  refresh = () => {
    this.stageRef.getStage().batchDraw()
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
              entry={this.props.entry}
              deselectImage={this.props.deselectImage}
              refresh={this.refresh}
            />
          </Layer>
        </Stage>
      </div>
    )
  } 
}

class RenderImages extends Component {

  render() {
    return this.props.entry.map( (renderImage, key) => {
      console.log(renderImage)
      const image = new window.Image()
      image.src = require(`images/${renderImage.name}.png`)
      const hash = Math.random()
      const nodeName = `imageNode-${hash}`
      image.onload = () => {
        this.props.refresh()
        this.refs[nodeName].cache()
        this.refs[nodeName].drawHitFromCache()
      }
      return (
          <Image
            id={renderImage.id}
            key={key}
            image={image}
            ref={nodeName}
            draggable={true}
            scale={{x:0.5, y:0.5}}
            onClick={ event => {
              event.target.moveToTop()
              event.target.getLayer().batchDraw()
            }}
            onDragStart={ event => {
              event.target.getLayer().batchDraw()
            }}
            onDragEnd={ event => {
              event.target.getLayer().batchDraw()
            }}
            onTap={ event => {
              event.target.moveToTop()
              event.target.getLayer().batchDraw()
            }}
            onDblClick={ event => {
              event.target.destroy()
              this.props.refresh()
              this.props.deselectImage(event.target.attrs.id)
            }}
            onDblTap={() => {
              this.props.deselectImage(key)
              this.props.refresh()
            }}
            onMouseOver={ event => {
              document.body.style.cursor='move'
            }}
            onMouseOut={ event => {
              document.body.style.cursor='default'}
            }
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
    entry: images.entry,
    selectedImage: images.selectedImage,
    deselectedImage: images.deselectedImage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);

