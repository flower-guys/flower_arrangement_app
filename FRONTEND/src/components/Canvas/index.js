import React, { Component } from 'react'
import { Stage, Layer, Group, Image, Rect } from 'react-konva'
import { connect } from "react-redux";
import { actionCreators as imagesActions } from 'redux/modules/images'

class Canvas extends Component {
  disactiveMenu = () => {
    if (this.layerRef.getChildren().length > 0) {
      if (this.layerRef.getChildren()[0].children.length > 0) {
        for (let i = 0; i < this.layerRef.getChildren().length; i++) {
          for (let j = 1; j < this.layerRef.getChildren()[i].children.length; j++) {
            this.layerRef.getChildren()[i].children[j].hide()
          }
        }
      }
    }
    this.layerRef.batchDraw()
  }

  handleExport = () => {
    const uri = this.stageRef.getStage().toDataURL()
    const name = "temp.jpg"
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
        <button onClick={ () => { // 비동기 공부해서 코드 수정할 것!!!!  
            this.disactiveMenu()
            setTimeout(() => {this.handleExport()}, 100);
        }}>
          이미지로 저장
        </button>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight * 0.7}
          ref={node => this.stageRef = node}
        >
          <Layer>
            <Rect width={window.innerWidth} height={window.innerHeight} 
              onClick={ () => {
                this.disactiveMenu()
              }}
              onTap={ () => this.disactiveMenu()}
              fill={'white'}
            />
          </Layer>
          <Layer ref={node => this.layerRef = node}>
            {this.props.wholeSelectedImages.map( (image, key) => {
              return (
                <RenderImage
                  key={key}
                  renderImage={image}
                  deselectImage={this.props.deselectImage}
                  refresh={this.refresh}
                  disactiveMenu={this.disactiveMenu}
                />
              )
            })}
          </Layer>
        </Stage>
      </div>
    )
  } 
}

class RenderImage extends Component {
  state = {
    needMenu: false,
  }
  imageX
  imageY
  imageWidth
  imageHeight
  
  render() {
    const image = new window.Image()
    image.src = require(`images/${this.props.renderImage.name}.png`)
    const hash = Math.random()
    const imageNodeName = `imageNode-${hash}`
    image.onload = () => {
      this.imageWidth = this.refs[imageNodeName].width()
      this.imageHeight = this.refs[imageNodeName].height()
      this.imageX = this.refs[imageNodeName].x()
      this.imageY = this.refs[imageNodeName].y()
      this.refs[imageNodeName].offsetX(this.refs[imageNodeName].width() / 2)
      this.refs[imageNodeName].offsetY(this.refs[imageNodeName].height() / 2)
      this.refs[imageNodeName].cache()
      this.refs[imageNodeName].drawHitFromCache()
      this.props.refresh()
      }
    return (
      <Group ref={ node => this.wholeGroup = node } draggable={true} >
        <Image
          id={this.props.renderImage.id}
          x={100} y={300}
          image={image}
          ref={imageNodeName}
          scale={{ x: 0.5, y: 0.5 }}
          onClick={ event => {
            this.props.disactiveMenu()
            this.setState({ needMenu: true })
            if (this.state.needMenu === true && event.target.parent.children.length > 0) {
              event.target.getParent().getChildren()[1].show()
              event.target.getLayer().batchDraw()
            }
            event.target.getLayer().batchDraw()
          }}
          onMouseOver={ event => {
            document.body.style.cursor = 'move'
            
          }}
          onMouseOut={ event => {
            document.body.style.cursor = 'default'
          }}
          onTap={event => {
            this.props.disactiveMenu()
            this.wholeGroup.moveToTop()
            this.setState({ needMenu: true })
            if (this.state.needMenu === true && event.target.parent.children.length > 0) {
              event.target.getParent().getChildren()[1].show()
              event.target.getLayer().batchDraw()
            }
            event.target.getLayer().batchDraw()
          }}
        />
        {this.state.needMenu && 
        <PopupMenu {...this.props} mainImageX={this.imageX} mainImageY={this.imageY} mainImageWidth={this.imageWidth} mainImageHeight={this.imageHeight} />}
      </Group>
    )
  }
}

class PopupMenu extends Component {
  render() {
    const leftRotationArrow = new window.Image()
    leftRotationArrow.src = require('images/leftRotationArrow.svg')
    leftRotationArrow.onload = () => {
      this.props.refresh()
    }

    const rightRotationArrow = new window.Image()
    rightRotationArrow.src = require('images/rightRotationArrow.svg')
    rightRotationArrow.onload = () => {
      this.props.refresh()
    }
    const deleteButton = new window.Image()
    deleteButton.src = require('images/deleteButton.svg')
    deleteButton.onload = () => {
      this.props.refresh()
    }
    const moveToTop = new window.Image()
    moveToTop.src = require('images/moveToTop.jpg')
    moveToTop.onload = () => {
      this.props.refresh()
    }
    const moveToBottom = new window.Image()
    moveToBottom.src = require('images/moveToBottom.jpg')
    moveToBottom.onload = () => {
      this.props.refresh()
    }
    const moveUp = new window.Image()
    moveUp.src = require('images/moveUp.jpg')
    moveUp.onload = () => {
      this.props.refresh()
    }
    const moveDown = new window.Image()
    moveDown.src = require('images/moveDown.jpg')
    moveDown.onload = () => {
      this.props.refresh()
    }
    const positions = {
      moveToTop: { x: this.props.mainImageX - 70, y: this.props.mainImageY - (this.props.mainImageHeight * 0.3) },
      moveUp: { x: this.props.mainImageX - 35, y: this.props.mainImageY - (this.props.mainImageHeight * 0.3) },
      deleteButton: { x: this.props.mainImageX, y: this.props.mainImageY - (this.props.mainImageHeight * 0.3) },
      moveDown: { x: this.props.mainImageX + 35, y: this.props.mainImageY - (this.props.mainImageHeight * 0.3) },
      moveToBottom: { x: this.props.mainImageX + 70, y: this.props.mainImageY - (this.props.mainImageHeight * 0.3) },
      leftRotationArrow: { x: this.props.mainImageX - (this.props.mainImageWidth * 0.4), y: this.props.mainImageY - (this.props.mainImageHeight * 0.25)},
      rightRotationArrow: { x: this.props.mainImageX + (this.props.mainImageWidth * 0.4), y: this.props.mainImageY - (this.props.mainImageHeight * 0.25)}
    }
    return (
      <Group>
        <Image name={'moveToTop'}
          ref={node => this.moveToTop = node}
          x={positions.moveToTop.x - 12} y={positions.moveToTop.y - 12} width={24} height={24}
          image={moveToTop}
          onClick={ event => {
            event.target.getParent().getParent().moveToTop()
            this.props.refresh()
          }}
          onTap={event => {
            event.target.getParent().getParent().moveToTop()
            this.props.refresh()
          }}
          onMouseOver={event => {
            document.body.style.cursor = 'pointer'
          }}
          onMouseOut={event => {
            document.body.style.cursor = 'default'
          }}
        />
        <Image name={'moveUp'}
          ref={node => this.moveUp = node}
          x={positions.moveUp.x - 12} y={positions.moveUp.y - 12} width={24} height={24}
          image={moveUp}
          onClick={event => {
            event.target.getParent().getParent().moveUp()
            this.props.refresh()
          }}
          onTap={event => {
            event.target.getParent().getParent().moveUp()
            this.props.refresh()
          }}
          onMouseOver={event => {
            document.body.style.cursor = 'pointer'
          }}
          onMouseOut={event => {
            document.body.style.cursor = 'default'
          }}
        />
        <Image name={'deleteButton'}
          ref={ node => this.deleteButton = node }
          x={positions.deleteButton.x - 12} y={positions.deleteButton.y - 12} width={24} height={24}
          image={deleteButton}
          onClick={event => {
            this.props.deselectImage(event.target.getParent().getParent().getChildren()[0].attrs.id)
            event.target.getParent().getParent().destroy()
            this.props.refresh()
          }}
          onMouseOver={event => {
            document.body.style.cursor = 'pointer'
          }}
          onMouseOut={event => {
            document.body.style.cursor = 'default'
          }}
          onTap={event => {
            this.props.deselectImage(event.target.getParent().getParent().getChildren()[0].attrs.id)
            event.target.getParent().getParent().destroy()
            this.props.refresh()
          }}
        />
        <Image name={'moveDown'}
          ref={node => this.moveDown = node}
          x={positions.moveDown.x - 12} y={positions.moveDown.y - 12} width={24} height={24}
          image={moveDown}
          onClick={event => {
            event.target.getParent().getParent().moveDown()
            this.props.refresh()
          }}
          onTap={event => {
            event.target.getParent().getParent().moveDown()
            this.props.refresh()
          }}
          onMouseOver={event => {
            document.body.style.cursor = 'pointer'
          }}
          onMouseOut={event => {
            document.body.style.cursor = 'default'
          }}
        />
        <Image name={'moveToBottom'}
          ref={node => this.moveToBottom = node}
          x={positions.moveToBottom.x - 12} y={positions.moveToBottom.y - 12} width={24} height={24}
          image={moveToBottom}
          onClick={event => {
            event.target.getParent().getParent().moveToBottom()
            this.props.refresh()
          }}
          onTap={event => {
            event.target.getParent().getParent().moveToBottom()
            this.props.refresh()
          }}
          onMouseOver={event => {
            document.body.style.cursor = 'pointer'
          }}
          onMouseOut={event => {
            document.body.style.cursor = 'default'
          }}
        />
        <Image name={'topLeft'}
          ref={node => this.leftRotationArrow = node }
          x={positions.leftRotationArrow.x - 15} y={positions.leftRotationArrow.y} width={30} height={30}
          image={leftRotationArrow}
          onClick={event => {
            event.target.getParent().getParent().getChildren()[0].rotate(-10)
            event.target.getLayer().batchDraw()
          }}
          onTap={ event => {
            event.target.getParent().getParent().getChildren()[0].rotate(-10)
            event.target.getLayer().batchDraw()
          }}
          onMouseOver={event => {
            document.body.style.cursor = 'pointer'
          }}
          onMouseOut={event => {
            document.body.style.cursor = 'default'
          }}
        />
        <Image name={'topright'}
          ref={node => this.rightRotationArrow = node}
          x={positions.rightRotationArrow.x - 15} y={positions.rightRotationArrow.y} width={30} height={30}
          image={rightRotationArrow}
          onClick={event => {
            event.target.getParent().getParent().getChildren()[0].rotate(10)
            event.target.getLayer().batchDraw()
          }}
          onTap={event => {
            event.target.getParent().getParent().getChildren()[0].rotate(10)
            event.target.getLayer().batchDraw()
          }}
          onMouseOver={event => {
            document.body.style.cursor = 'pointer'
          }}
          onMouseOut={event => {
            document.body.style.cursor = 'default'
          }}
        />
      </Group>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deselectImage: deselectImage => {
      dispatch(imagesActions.deselectImage(deselectImage))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { images } = state
  return {
    wholeSelectedImages: images.wholeSelectedImages,
    selectedImage: images.selectedImage,
    deselectedImage: images.deselectedImage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
