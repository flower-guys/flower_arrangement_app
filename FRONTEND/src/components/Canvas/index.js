import React, { Component } from 'react'
import { Stage, Layer, Group, Image, Rect, Line } from 'react-konva'
import { connect } from "react-redux";
import { actionCreators as flowersActions } from 'redux/modules/flowers'
import styles from './styles.scss'

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
      <div className={styles.canvas}>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight * 0.8}
          ref={node => this.stageRef = node}
        >
          <Layer>
            <Rect width={window.innerWidth} height={window.innerHeight} fill={'white'}
              onClick={ () => {
                this.disactiveMenu()
              }}
              onTap={ () => this.disactiveMenu()}
            />
          </Layer>
          <Layer ref={node => this.layerRef = node}>
            {this.props.wholeSelectedFlowers.map( (image, key) => {
              return (
                <RenderImage
                  key={key}
                  renderImage={image}
                  deselectFlower={this.props.deselectFlower}
                  refresh={this.refresh}
                  disactiveMenu={this.disactiveMenu}
                />
              )
            })}
          </Layer>
        </Stage>
        <div className={styles.tools}>
          <button className={styles.saveButton}
            onClick={() => { // 비동기 공부해서 코드 수정할 것!!!!  
              this.disactiveMenu()
              setTimeout(() => { this.handleExport() }, 100);
            }}
          >
            이미지로 저장
            </button>
        </div>
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
    image.src = require(`images/flowers/${this.props.renderImage.name}.png`)
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
        <Image image={image}
          imageId={this.props.renderImage.id} ref={imageNodeName}
          x={100} y={300} scale={{ x: 0.5, y: 0.5 }}

          onClick={ event => {
            this.props.disactiveMenu()
            this.setState({ needMenu: true })
            if (this.state.needMenu === true && event.target.parent.children.length > 0) {
                event.target.getParent().getChildren()[1].show()
                event.target.getParent().getChildren()[1].moveToTop()
                event.target.getLayer().batchDraw()
              }
            this.props.refresh()
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
          <PopupMenu {...this.props} 
            mainImageX={this.imageX} mainImageY={this.imageY} 
            mainImageWidth={this.imageWidth} mainImageHeight={this.imageHeight} 
          />
        }
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

    const { mainImageX, mainImageY, mainImageWidth, mainImageHeight } = this.props
    const positions = {
      moveToTop: { 
        x: mainImageX - 80,
        y: mainImageY + mainImageHeight * 0.3
      },
      moveUp: { 
        x: mainImageX - 40, 
        y: mainImageY + mainImageHeight * 0.3
      },
      deleteButton: { 
        x: mainImageX, 
        y: mainImageY + mainImageHeight * 0.3 
      },
      moveDown: { 
        x: mainImageX + 40, 
        y: mainImageY + mainImageHeight * 0.3 
      },
      moveToBottom: {
        x: mainImageX + 80, 
        y: mainImageY + mainImageHeight * 0.3
      },
      leftRotationArrow: { 
        x: mainImageX - (mainImageWidth * 0.4), 
        y: mainImageY + (mainImageHeight * 0.2)
      },
      rightRotationArrow: { 
        x: mainImageX + (mainImageWidth * 0.4), 
        y: mainImageY + (mainImageHeight * 0.2)
      },
      borderBox: { 
        points: [
          (mainImageX - mainImageWidth * 0.3), (mainImageY - mainImageHeight * 0.25),
          (mainImageX + mainImageWidth * 0.3), (mainImageY - mainImageHeight * 0.25),
          (mainImageX + mainImageWidth * 0.3), (mainImageY + mainImageHeight * 0.25),
          (mainImageX - mainImageWidth * 0.3), (mainImageY + mainImageHeight * 0.25),
          (mainImageX - mainImageWidth * 0.3), (mainImageY - mainImageHeight * 0.25)
        ]
      }
    }
    return (
      <Group ref={ node => this.popupMenuGroup = node }>
        <Image name={'moveToTop'}
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
          x={positions.deleteButton.x - 12} y={positions.deleteButton.y - 12} width={24} height={24}
          image={deleteButton}
          onClick={event => {
            this.props.deselectFlower(event.target.getParent().getParent().getChildren()[0].attrs.id)
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
            this.props.deselectFlower(event.target.getParent().getParent().getChildren()[0].attrs.id)
            event.target.getParent().getParent().destroy()
            this.props.refresh()
          }}
        />
        <Image name={'moveDown'}
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
          x={positions.leftRotationArrow.x - 12} y={positions.leftRotationArrow.y} width={24} height={24}
          image={leftRotationArrow}
          onClick={event => {
            event.target.getParent().getParent().getChildren()[0].rotate(-5)
            event.target.getLayer().batchDraw()
          }}
          onTap={ event => {
            event.target.getParent().getParent().getChildren()[0].rotate(-5)
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
          x={positions.rightRotationArrow.x - 12} y={positions.rightRotationArrow.y} width={24} height={24}
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
        <Line 
          ref={ node => this.borderBox = node}
          points={positions.borderBox.points}
          dash={[10, 5, 0.001, 5]}
          stroke={'black'} strokeWidth={1}
        />
      </Group>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deselectFlower: deselectedFlower => {
      dispatch(flowersActions.deselectFlower(deselectedFlower))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { flowers } = state
  return {
    wholeSelectedFlowers: flowers.wholeSelectedFlowers,
    selectedFlower: flowers.selectedFlower,
    deselectedFlower: flowers.deselectedFlower
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
