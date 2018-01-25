import React from 'react'
import { Text } from 'react-konva'

const Message = props => {
    return (
        <Text 
            text={props.messageInput} 
            width={500}
            fontSize={props.fontSize}
            fontStyle={props.fontStyle}
            draggable={true}
            onMouseOver={ event => document.body.style.cursor = 'move'}
            onMouseOut={event => document.body.style.cursor = 'default'}
        />
    )
}

export default Message