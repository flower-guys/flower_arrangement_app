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
    needMenu: false
  }

  render() {
      const image = new window.Image()
      image.src = require(`images/${this.props.renderImage.name}.png`)

      const hash = Math.random()
      const nodeName = `imageNode-${hash}`
      image.onload = () => {
        this.refs[nodeName].offsetX(this.refs[nodeName].width() / 2)
        this.refs[nodeName].offsetY(this.refs[nodeName].height() / 2)
        this.refs[nodeName].cache()
        this.refs[nodeName].drawHitFromCache()
        this.props.refresh()
      }
      const groupName = `groupNod-${hash}`

      return (
        <Group ref={groupName} draggable={true} >
          <Image
            id={this.props.renderImage.id}
            x={100} y={100}
            image={image}
            ref={nodeName}
            scale={{ x: 0.5, y: 0.5 }}
            onClick={ event => {
              this.props.disactiveMenu()
              this.refs[groupName].moveToTop()
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
              this.refs[groupName].moveToTop()
              !this.state.needMenu &&
              event.target.getParent().getChildren()[0].show()
              event.target.getParent().getChildren()[1].show()
              event.target.getParent().getChildren()[2].show()
              event.target.getParent().getChildren()[3].show()
              this.setState({ needMenu: true })
              event.target.getLayer().batchDraw()
            }}
          />
          {this.state.needMenu && 
          <PopupMenu {...this.props} />}
        </Group>
      )
    }
  }

const PopupMenu = props => {
  
  return (
    <Group>
      <Text name={'deleteButton'}
        x={75} y={-50}
        text={'X'} fontSize={20} fill={'tomato'}
        onClick={event => {
          props.deselectImage(event.target.getParent().getParent().getChildren()[0].attrs.id)
          event.target.getParent().getParent().destroy()
          props.refresh()
        }}
        onMouseOver={ event => {
          document.body.style.cursor = 'pointer'
        }}
        onMouseOut={ event => {
          document.body.style.cursor = 'default'
        }}
        onTap={ event => {
          props.deselectImage(event.target.getParent().getParent().getChildren()[0].attrs.id)
          event.target.getParent().getParent().destroy()
          props.refresh()
        }}
      />
      <Circle name={'topLeft'}
        x={0} y={0}
        fill={'tomato'} strokeWidth={2} radius={8}
        onClick={ event => {
          event.target.getParent().getParent().getChildren()[0].rotate(-10)
          event.target.getLayer().batchDraw()
        }}
      />
      <Circle name={'topRight'}
        x={150} y={0}
        fill={'tomato'} strokeWidth={2} radius={8}
        onClick={event => {
          event.target.getParent().getParent().getChildren()[0].rotate(10)
          event.target.getLayer().batchDraw()
        }}
      />
    </Group>
  )
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
