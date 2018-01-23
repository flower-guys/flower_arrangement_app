import React, { Component } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import { connect } from "react-redux";
import { actionCreators as flowersActions } from 'redux/modules/flowers'
import Loading from 'components/Loading'
import RenderImage from './RenderImage'
import Message from './Message'
import Share from './Share'
import styles from './styles.scss'

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.props.syncList(this.props.currentSelectedFlowers)
    this.state = {
      loading: true,
    }
    this.disactiveMenu = this.disactiveMenu.bind(this)
    this.refresh = this.refresh.bind(this)
    this.canvasSize = this.canvasSize.bind(this)
    this.downloadDataURL = this.downloadDataURL.bind(this)
  }
  componentDidMount() {
    const { canvasImageList } = this.props
    if (!canvasImageList) {
      this.setState({
        loading: true
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.canvasImageList) {
      this.setState({
        loading: false
      })
    }
  }

  downloadDataURL = name => {
    this.disactiveMenu()
    setTimeout(() => {
      const uri = this.stageRef.getStage().toDataURL()
      const link = document.createElement("a")
      link.download = name
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link);
    }, 100);
  }

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

  refresh = () => {
    this.stageRef.getStage().batchDraw()
  }

  canvasSize = () => {
    const width = window.innerWidth
    if (width > 300 && width <= 320) return 300
    else if (width > 320 && width <= 375) return 320
    else if (width > 375 && width <= 450) return 375
    else if (width > 450 && width <= 600) return 450
    else if (width > 600 && width <= 768) return 600
    else return 700 
  }

  
  render() {
    return (
      <div className={styles.container}>
      <div className={styles.canvas} ref={ node => this.canvasRef = node }>
      {this.state.loading
      ? <Loading />
      : <Stage
          width={this.canvasSize()}
          height={this.canvasSize()}
          ref={ node => this.stageRef = node }
        >
          <Layer>
            <Rect 
              width={this.canvasSize()}
              height={this.canvasSize()}
              fill={'white'}
              onClick={ () => { this.disactiveMenu() }}
              onTap={ () => this.disactiveMenu() }
            />
          </Layer>
          <Layer ref={node => this.layerRef = node}>
            {this.props.canvasImageList.map( (image, key) => {
              return (
                <RenderImage
                  key={key}
                  renderImage={image}
                  deselectFlower={this.props.deselectFlower}
                  refresh={this.refresh}
                  disactiveMenu={this.disactiveMenu}
                  canvasSize={this.canvasSize}
                />
              )
            })}
          </Layer>
            <Layer>
              <Message {...this.props} canvasSize={this.canvasSize} />
            </Layer>
        </Stage>}
      </div>
        <Share downloadDataURL={this.downloadDataURL}/>
        </div>
    )
  } 
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deselectFlower: deselectedFlower => {
      dispatch(flowersActions.deselectFlower(deselectedFlower))
    },
    syncList: currentSelectedFlowers => {
      dispatch(flowersActions.syncList(currentSelectedFlowers))
    },
    exportCanvas: canvasDataURL => {
      dispatch(flowersActions.exportCanvas(canvasDataURL))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { message, flowers, routing: { location } } = state
  return {
    pathname: location.pathname,
    canvasImageList: flowers.canvasImageList,
    selectedFlower: flowers.selectedFlower,
    deselectedFlower: flowers.deselectedFlower,
    currentSelectedFlowers: flowers.currentSelectedFlowers,
    canvasDataURL: flowers.canvasDataURL,
    messageInput: message.messageInput,
    fontSize: message.fontSize,
    fontStyle: message.fontStyle
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
