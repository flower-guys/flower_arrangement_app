import React from 'react'
import _ from 'lodash'

const Navigation = props => {
    return (
        <header>
            here is a Navigation
            <button onClick={props.handleListButton}>꽃 목록</button>
            {props.fetchedImageList && <RenderList {...props} />}
            {props.refinedList && <span>꽃바구니: {props.refinedList.map(image => `${image.name} x ${image.count} `)}</span>}
        </header>
    )
}

const RenderList = props => _.map(props.fetchedImageList, (image, key) => {
    return (
    <div key={key}>
        <li>{image.name}</li>
        <button onClick={() => props.handleSelectButton(image)}>선택</button>
    </div>
    )
})

export default Navigation