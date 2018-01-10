import React from 'react'
import _ from 'lodash'

const SearchBar = props => {
    return (
        <header>
            here is a searchbar
            <button onClick={props.handleListButton}>꽃 목록</button>
            {props.imageList && <RenderList {...props} />}
            {props.selectedImages && <span>꽃바구니: {props.selectedImages.map(image => `${image.name} `)}</span>}
        </header>
    )
}

const RenderList = props => _.map(props.imageList, (image, key) => {
    return (
    <div key={key}>
        <li>{image.name}</li>
        <button onClick={() => props.handleSelectButton(image)}>선택</button>
    </div>
    )
})

export default SearchBar