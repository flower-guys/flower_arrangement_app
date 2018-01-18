import React from 'react'
import Canvas from 'components/Canvas'
import styles from './styles.scss'

const FlowerArrangement = props => {
    return (
        <div className={styles.flowerArrangement}>
            <div className={styles.body}>
            <Canvas />
            </div>
        </div>
    )
}

export default FlowerArrangement