import React, { Component } from 'react'
import { Stage, Layer, Group, Image, Circle, Text } from 'react-konva'
import { connect } from "react-redux";
import { actionCreators as imagesActions } from 'redux/modules/images'

class Canvas extends Component {
  state = {
    currentSelectedImages: this.props.currentSelectedImages
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
          height={window.innerHeight * 0.7}
          ref={node => this.stageRef = node}
        >
          <Layer 
            ref={node => this.layerRef = node}
          >
            <RenderImages 
              wholeSelectedImages={this.props.wholeSelectedImages}
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
    return this.props.wholeSelectedImages.map( (renderImage, key) => {
      const image = new window.Image()
      image.src = require(`images/${renderImage.name}.png`)
      const hash = Math.random()
      const nodeName = `imageNode-${hash}`
      image.onload = () => {
        this.props.refresh()
        this.refs[nodeName].cache()
        this.refs[nodeName].drawHitFromCache()
      }

      const groupName = `groupNod-${hash}`

      return (
        <Group ref={groupName} key={key}>
          <Text x={240} y={40} text={'X'} fill={'tomato'} 
            onClick={ evnet => {
              this.props.deselectImage(this.refs[groupName].children[5].attrs.id)
              this.refs[groupName].destroy()
              this.props.refresh()
            }}
            onMouseOver={ event => {
                  document.body.style.cursor = 'pointer'
            }} 
            onMouseOut={event => {
              document.body.style.cursor = 'default'
            }}   
          />
          <Circle x={0} y={0} fill={'tomato'} strokeWidth={2} radius={8} draggable={true} dragOnTop={false} />
          <Circle x={100} y={0} fill={'tomato'} strokeWidth={2} radius={8} draggable={true} dragOnTop={false} />
          <Circle x={0} y={300} fill={'tomato'} strokeWidth={2} radius={8} draggable={true} dragOnTop={false} />
          <Circle x={100} y={300} fill={'tomato'} strokeWidth={2} radius={8} draggable={true} dragOnTop={false} />
          <Image
            id={renderImage.id}
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
            onMouseOver={ event => {
              document.body.style.cursor='move'
            }}
            onMouseOut={ event => {
              document.body.style.cursor='default'}
            }
          />
        </Group>
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
    wholeSelectedImages: images.wholeSelectedImages,
    selectedImage: images.selectedImage,
    deselectedImage: images.deselectedImage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);

