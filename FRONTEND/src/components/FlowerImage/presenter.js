import React from 'react'
import { Path, Layer } from 'react-konva'

const FlowerImage = props => {
    const { name, outline } = props.selectedFlower
    const image = new window.Image()
    image.src = require(`images/${name}.png`)
    return (
        <Layer>
            <Path
                name={name}
                data={outline}
                draggable={true}
                fillPatternImage={image}
                fillPatternOffset={{ x: 110, y: 70 }}
                stroke="transparent"
                strokeWidth={1}
                onDblClick={props.handleDblClick}
            />
        </Layer>
    )
}

export default FlowerImage
