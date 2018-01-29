import React, { Component } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import { connect } from "react-redux";
import { actionCreators as flowersActions } from 'redux/modules/flowers'
import { Link } from 'react-router-dom'
import Ionicon from 'react-ionicons'
import Loading from 'components/Loading'
import RenderImage from './RenderImage'
import Message from './Message'
import Card from 'components/Card'
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
  exportDataURL = () => {
    this.disactiveMenu()
    setTimeout(() => {
      const uri = this.stageRef.getStage().toDataURL()
      this.props.exportCanvas(uri)
      this.props.uploadFirebase(uri)
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
    if (width > 300 && width <= 330) return 275
    else if (width > 330 && width <= 375) return 300
    else if (width > 375 && width <= 450) return 300
    else if (width > 450 && width <= 600) return 350
    else return 400 
  }
  
  render() {
    return (
      <div className={styles.container}>
        <div 
          className={styles.canvas}
          ref={node => this.canvasRef = node} 
        >
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
        <MessageAndUpload {...this.props} exportDataURL={this.exportDataURL} />
    </div>
    )
  } 
}

const MessageAndUpload = props => (
  <div className={styles.messageAndUpload}>
    <Card />
    {!props.downloadURL
      ?
      <div
        className={styles.package}
        onClick={() => props.exportDataURL()}
      >
        <Ionicon className={styles.fowardIcon} icon='ios-archive-outline' color='#635f5c' fontSize='25px' />
        포장하기
        </div>
      :
      <Link
        className={styles.package}
        to={'/share'}
      >
        <Ionicon className={styles.fowardIcon} icon='md-heart-outline' color='salmon' fontSize='20px' beat={true} />
        마음 전하기
        </Link>
    }
  </div>
)


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
    },
    uploadFirebase: canvasDataURL => {
      dispatch(flowersActions.uploadFirebase(canvasDataURL))
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
    downloadURL: flowers.downloadURL,
    messageInput: message.messageInput,
    fontSize: message.fontSize,
    fontStyle: message.fontStyle
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
