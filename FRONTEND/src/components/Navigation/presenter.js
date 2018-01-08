import React from 'react'
import _ from 'lodash'

const SearchBar = props => {
    return (
        <header>
            here is a searchbar
            <button onClick={props.handleListButton}>꽃 목록</button>
            {props.flowerList && <RenderList {...props} />}
            {props.basket && <span>꽃바구니: {props.basket.map(flower => `${flower.name} `)}</span>}
        </header>
    )
}

const RenderList = props => _.map(props.flowerList, (flower, key) => {
    return (
    <div key={key}>
        <li>{flower.name}</li>
        <button onClick={() => props.handleSelectButton(flower)}>선택</button>
    </div>
    )
})

export default SearchBar