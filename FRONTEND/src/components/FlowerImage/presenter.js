import React from "react"
import { Path } from "react-konva"

const FlowerImage = props => {
  const { name, outline } = props.selectedFlower
  const image = new window.Image()
  image.src = require(`images/${name}.png`)
  return (
    <Path
        name={name}
        data={outline}
        draggable={true}
        fillPatternImage={image}
        fillPatternOffset={{ x: 110, y: 70 }}
        stroke="transparent"
        strokeWidth={1}
    />
  )
}

export default FlowerImage
