import React from 'react'
import Canvas from 'components/Canvas'
import styles from './styles.scss'

const FlowerArrangement = props => {

    return (
        <div className={styles.container}>
            <Canvas className={styles.canvas} />
        </div>
    )
}

export default FlowerArrangement