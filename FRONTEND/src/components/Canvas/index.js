import React, { Component } from 'react'
import { Stage, Layer, Group, Image, Circle, Rect, Text } from 'react-konva'
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
              onClick={ () => this.disactiveMenu()} onTap={ () => this.disactiveMenu()}
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
    neenMenu: false
  }
  update = activeAnchor => {
    const group = activeAnchor.getParent()
    const deleteButton = group.get('.deleteButton')[0]
    const topLeft = group.get('.topLeft')[0]
    const topRight = group.get('.topRight')[0]
    const bottomLeft = group.get('.bottomLeft')[0]
    const bottomRight = group.get('.bottomRight')[0]
    const image = group.get('Image')[0]

    let anchorX = activeAnchor.getX()
    let anchorY = activeAnchor.getY()

    switch (activeAnchor.getName()) {
      case 'topLeft':
        topRight.setY(anchorY)
        bottomLeft.setX(anchorX)
        break
      case 'topRight':
        topLeft.setY(anchorY)
        bottomRight.setX(anchorX)
        break
      case 'bottomLeft':
        topLeft.setX(anchorX)
        bottomRight.setY(anchorY)
        topLeft.setX(anchorX)
        break
      case 'bottomRight':
        bottomLeft.setY(anchorY)
        topRight.setX(anchorX)
        break
      default:
        break
    }
    image.position(topLeft.position())
    let buttonX = topLeft.getX() + (topRight.getX() - topLeft.getX()) * 0.5
    let buttonY = topLeft.getY() - 50
    deleteButton.setX(buttonX)
    deleteButton.setY(buttonY)

    let width = topRight.getX() - topLeft.getX()
    let height = bottomLeft.getY() - topLeft.getY()
    if (width && height) {
      image.width(width)
      image.height(height)
    }
  }
  render() {
      const image = new window.Image()
      image.src = require(`images/${this.props.renderImage.name}.png`)
      const hash = Math.random()
      const nodeName = `imageNode-${hash}`
      image.onload = () => {
        this.props.refresh()
        this.refs[nodeName].cache()
        this.refs[nodeName].drawHitFromCache()
      }
      const groupName = `groupNod-${hash}`

      return (
        <Group ref={groupName} draggable={true}>
          <Image
            id={this.props.renderImage.id}
            image={image}
            ref={nodeName}
            scale={{ x: 0.5, y: 0.5 }}
            onClick={ event => {
              this.props.disactiveMenu()
              this.refs[groupName].moveToTop()
              !this.state.needMenu &&
              event.target.getParent().getChildren()[0].show()
              event.target.getParent().getChildren()[1].show()
              event.target.getParent().getChildren()[2].show()
              event.target.getParent().getChildren()[3].show()
              event.target.getParent().getChildren()[4].show()
              event.target.getParent().getChildren()[5].show()
              this.setState({ needMenu: true })
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
              this.refs[groupName].moveToTop()
              !this.state.needMenu &&
              event.target.getParent().getChildren()[0].show()
              event.target.getParent().getChildren()[1].show()
              event.target.getParent().getChildren()[2].show()
              event.target.getParent().getChildren()[3].show()
              event.target.getParent().getChildren()[4].show()
              event.target.getParent().getChildren()[5].show()
              this.setState({ needMenu: true })
              event.target.getLayer().batchDraw()
            }}
          />
          <Text name={'deleteButton'}
            x={240} y={40}
            text={'X'} fontSize={20} fill={'tomato'} 
            onClick={ event => {
              this.props.deselectImage(this.refs[groupName].children[0].attrs.id)
              this.refs[groupName].destroy()
              this.props.refresh()
            }}
            onMouseOver={ event => {
              document.body.style.cursor = 'pointer'
            }} 
            onMouseOut={event => {
              document.body.style.cursor = 'default'
            }}   
            onTap={ eventt => {
              this.props.deselectImage(this.refs[groupName].children[0].attrs.id)
              this.refs[groupName].destroy()
              this.props.refresh()
            }}
          />
          <Circle name={'topLeft'} 
            x={0} y={0}
            fill={'tomato'} strokeWidth={2} radius={8}
            draggable={true} dragOnTop={false}
            onDragMove={ event => {
              this.update(event.target)
              event.target.getLayer().batchDraw()
            }}
            onMouseDown={ event => {
              this.refs[groupName].setDraggable(false)
              this.refs[groupName].moveToTop()
            }}
            onDragEnd={ event => {
              this.refs[groupName].setDraggable(true)
              event.target.getLayer().batchDraw()
            }}
          />
          <Circle name={'topRight'}
            x={50} y={0}
            fill={'tomato'} strokeWidth={2} radius={8}
            draggable={true} dragOnTop={false}
            onDragMove={ event => {
              this.update(event.target)
              event.target.getLayer().batchDraw()
            }}
          />
          <Circle name={'bottomLeft'}
            x={0} y={300}
            fill={'tomato'} strokeWidth={2} radius={8}
            draggable={true} dragOnTop={false}
            onDragMove={ event => {
              this.update(event.target)
              event.target.getLayer().batchDraw()
            }}
          />
          <Circle name={'bottomRight'}
            x={100} y={300}
            fill={'tomato'} strokeWidth={2} radius={8}
            draggable={true} dragOnTop={false}
            onDragMove={ event => {
              this.update(event.target)
              event.target.getLayer().batchDraw()
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
