import React, { Component } from 'react'
import { Group, Image, Line } from 'react-konva'

class PopupMenu extends Component {
    render() {
        const leftRotationArrow = new window.Image()
        leftRotationArrow.src = require('images/leftRotationArrow.png')
        leftRotationArrow.onload = () => {
            this.props.refresh()
        }

        const rightRotationArrow = new window.Image()
        rightRotationArrow.src = require('images/rightRotationArrow.png')
        rightRotationArrow.onload = () => {
            this.props.refresh()
        }
        const deleteButton = new window.Image()
        deleteButton.src = require('images/remove.png')
        deleteButton.onload = () => {
            this.props.refresh()
        }
        const moveToTop = new window.Image()
        moveToTop.src = require('images/moveToTop.png')
        moveToTop.onload = () => {
            this.props.refresh()
        }
        const moveToBottom = new window.Image()
        moveToBottom.src = require('images/moveToBottom.png')
        moveToBottom.onload = () => {
            this.props.refresh()
        }
        const moveUp = new window.Image()
        moveUp.src = require('images/moveUp.png')
        moveUp.onload = () => {
            this.props.refresh()
        }
        const moveDown = new window.Image()
        moveDown.src = require('images/moveDown.png')
        moveDown.onload = () => {
            this.props.refresh()
        }

        const { mainImageX, mainImageY, mainImageWidth, mainImageHeight } = this.props
        const positions = {
            moveToTop: {
                x: mainImageX - 100,
                y: mainImageY + mainImageHeight * 0.3
            },
            moveUp: {
                x: mainImageX - 50,
                y: mainImageY + mainImageHeight * 0.3
            },
            deleteButton: {
                x: mainImageX,
                y: mainImageY + mainImageHeight * 0.3
            },
            moveDown: {
                x: mainImageX + 50,
                y: mainImageY + mainImageHeight * 0.3
            },
            moveToBottom: {
                x: mainImageX + 100,
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
            <Group ref={node => this.popupMenuGroup = node}>
                <Image name={'moveToTop'}
                    x={positions.moveToTop.x - 12} y={positions.moveToTop.y - 12} width={27} height={27}
                    image={moveToTop}
                    onClick={event => {
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
                    x={positions.moveUp.x - 12} y={positions.moveUp.y - 12} width={27} height={27}
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
                    x={positions.deleteButton.x - 12} y={positions.deleteButton.y - 12} width={27} height={27}
                    image={deleteButton}
                    onClick={event => {
                        this.props.deselectFlower(event.target.getParent().getParent().getChildren()[0].attrs.imageId)
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
                        this.props.deselectFlower(event.target.getParent().getParent().getChildren()[0].attrs.imageId)
                        event.target.getParent().getParent().destroy()
                        this.props.refresh()
                    }}
                />
                <Image name={'moveDown'}
                    x={positions.moveDown.x - 12} y={positions.moveDown.y - 12} width={27} height={27}
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
                    x={positions.moveToBottom.x - 12} y={positions.moveToBottom.y - 12} width={27} height={27}
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
                    x={positions.leftRotationArrow.x - 12} y={positions.leftRotationArrow.y} width={27} height={27}
                    image={leftRotationArrow}
                    onClick={event => {
                        event.target.getParent().getParent().getChildren()[0].rotate(-5)
                        event.target.getLayer().batchDraw()
                    }}
                    onTap={event => {
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
                    x={positions.rightRotationArrow.x - 12} y={positions.rightRotationArrow.y} width={27} height={27}
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
                    ref={node => this.borderBox = node}
                    points={positions.borderBox.points}
                    dash={[10, 5, 0.001, 5]}
                    stroke={'#BBB8B6'} strokeWidth={1}
                />
            </Group>
        )
    }
}

export default PopupMenu
