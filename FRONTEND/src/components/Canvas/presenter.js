import React from 'react'
import { Stage, Layer } from 'react-konva'
import FlowerImage from 'components/FlowerImage'

const Canvas = props => {
  const handleExport = () => {
    const uri = this.stageRef.getStage().toDataURL()
    const name = "temp.png"
    let link = document.createElement("a")
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <button onClick={handleExport}>Save as image</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={node => {this.stageRef = node}}
      >
        <Layer>
          <FlowerImage flower={'test'}/>
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas
