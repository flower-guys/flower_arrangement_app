import React from 'react'
import _ from 'lodash'
import styles from './styles.scss'

const Navigation = props => {
    return (
        <header className={styles.header}>
            <button onClick={props.handleListButton}>꽃 목록</button>
            <ul>{props.fetchedImageList && <RenderList {...props} />}</ul>
        </header>
    )
}

const RenderList = props => _.map(props.fetchedImageList, (image, key) => {
    return (
        <li key={key} >{image.name}<button onClick={() => props.handleSelectButton(image)}>선택</button></li>
    )
})

export default Navigation