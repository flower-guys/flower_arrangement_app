import React, { Component } from 'react'
import { Stage, Layer, Image } from 'react-konva'

const FlowerImage = (props) => {
  const image = new window.Image()
  image.src = require(`../../images/${props.name}.png`)
  return (
    <Image 
      image={image} 
      x={props.x}
      y={props.y}
      width={300}
      height={300}
      draggable={true}
    />
  )
}

class Asdf extends Component {
  handleExport = () => {
    const uri = this.stageRef.getStage().toDataURL()
    const name = 'temp.png'
    let link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  render() {
    return (
      <div>
        <button 
        onClick={this.handleExport}>
        Save as image</button>

      <Stage 
        width={window.innerWidth}
        height={window.innerHeight}
        ref={node => {this.stageRef = node}}
        >
        <Layer>
          <FlowerImage name={"flower-a"} />
        
          <FlowerImage name={"flower-b"} x={500} y={500} />
        </Layer>
      </Stage>
      </div>
    )
  }
}
export default Asdf