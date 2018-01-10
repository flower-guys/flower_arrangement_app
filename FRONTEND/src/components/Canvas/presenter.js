import React from 'react'
import { Stage, Layer, Image } from 'react-konva'

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
        height={window.innerHeight * 0.9}
        ref={node => {this.stageRef = node}}
      >
        <Layer>
          <Image />
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas
