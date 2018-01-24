import React, { Component } from 'react'
import { Group, Image } from 'react-konva'
import PopupMenu from './PopupMenu'

class RenderImage extends Component {
    state = {
        needMenu: false,
    }
    imageX
    imageY
    imageWidth
    imageHeight
    scale = this.props.canvasSize() > 414 ? this.props.canvasSize() / 740 : this.props.canvasSize() / 740 * 1.7
    render() {
        const image = new window.Image()
        image.src = require(`images/flowers/${this.props.renderImage.name}.png`)
        const hash = Math.random()
        const imageNodeName = `imageNode-${hash}`
        image.onload = () => {
            this.imageWidth = this.refs[imageNodeName].width()
            this.imageHeight = this.refs[imageNodeName].height()
            this.imageX = this.refs[imageNodeName].x()
            this.imageY = this.refs[imageNodeName].y()
            this.refs[imageNodeName].offsetX(this.refs[imageNodeName].width() / 2)
            this.refs[imageNodeName].offsetY(this.refs[imageNodeName].height() / 2)
            this.refs[imageNodeName].cache()
            this.refs[imageNodeName].drawHitFromCache()
            this.props.refresh()
        }
        return (
            <Group 
                ref={node => this.wholeGroup = node}
                draggable={true}
                scale={{ x: this.scale, y: this.scale }}
            >
                <Image 
                    image={image}
                    imageId={this.props.renderImage.id}
                    ref={imageNodeName}
                    x={100} y={300} scale={{ x: 0.5, y: 0.5 }}
                    onClick={ event => {
                        this.props.disactiveMenu()
                        this.setState({ needMenu: true })
                        if (this.state.needMenu === true && event.target.parent.children.length > 0) {
                            event.target.getParent().getChildren()[1].show()
                            event.target.getParent().getChildren()[1].moveToTop()
                            event.target.getLayer().batchDraw()
                        }
                        this.props.refresh()
                    }}
                    onMouseOver={ event => {
                        document.body.style.cursor = 'move'
                    }}
                    onMouseOut={ event => {
                        document.body.style.cursor = 'default'
                    }}
                    onTap={ event => {
                        this.props.disactiveMenu()
                        this.setState({ needMenu: true })
                        if (this.state.needMenu === true && event.target.parent.children.length > 0) {
                            event.target.getParent().getChildren()[1].show()
                            event.target.getLayer().batchDraw()
                        }
                        event.target.getLayer().batchDraw()
                    }}
                />
                {this.state.needMenu &&
                    <PopupMenu {...this.props}
                        mainImageX={this.imageX}
                        mainImageY={this.imageY}
                        mainImageWidth={this.imageWidth}
                        mainImageHeight={this.imageHeight}
                    />
                }
            </Group>
        )
    }
}

export default RenderImage
